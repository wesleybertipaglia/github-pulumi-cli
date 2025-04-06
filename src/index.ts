import { Command } from "commander";
import {
  listRepos,
  getRepoDetails,
  getRepoInsights,
  createRepo,
  updateRepo,
} from "./github";
import { loadGitHubToken } from "./pulumi";
import {
  showMainMenu,
  promptRepoName,
  promptRepoDescription,
} from "./views/menu";

const program = new Command();

program
  .name("github-pulumi")
  .description("CLI Tool to interact with GitHub using Pulumi ESC")
  .version("1.0.0");

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
          const repository = await promptRepoName();
          console.clear();
          await getRepoDetails(token, repository);
          break;
        }

        case "insights": {
          const repository = await promptRepoName();
          console.clear();
          await getRepoInsights(token, repository);
          break;
        }

        case "create": {
          const repository = await promptRepoName();
          console.clear();
          const description = await promptRepoDescription();
          await createRepo(token, repository, description);
          break;
        }

        case "update": {
          const repository = await promptRepoName();
          const newName = await promptRepoName(true);
          const newDescription = await promptRepoDescription(true);
          console.clear();
          await updateRepo(token, repository, newName, newDescription);
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
