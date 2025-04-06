import { Command } from "commander";
import { listRepos, getRepoBySlug } from "./github";
import { loadGitHubToken } from "./pulumi";
import { showMainMenu, promptRepoName } from "./views/menu";

const program = new Command();

program
  .name("github-pulumi")
  .description("CLI Tool to interact with GitHub using Pulumi ESC")
  .version("1.0.0");

program
  .command("list")
  .description("List your GitHub repositories")
  .action(async () => {
    const token = await loadGitHubToken();
    await listRepos(token);
  });

program
  .command("get <name>")
  .description("Get details of a specific GitHub repository by name")
  .action(async (name: string) => {
    const token = await loadGitHubToken();
    await getRepoBySlug(token, name);
  });

if (!process.argv.slice(2).length) {
  (async () => {
    const token = await loadGitHubToken();

    while (true) {
      const action = await showMainMenu();

      console.clear();

      switch (action) {
        case "list":
          await listRepos(token);
          break;

        case "get": {
          const name = await promptRepoName();
          console.clear();
          await getRepoBySlug(token, name);
          break;
        }

        case "exit":
        default:
          console.log("👋 Goodbye!");
          process.exit(0);
      }

      console.log("\n🔁 Returning to main menu...\n");
    }
  })();
} else {
  program.parse(process.argv);
}
