import { Command } from "commander";
import { listRepos, getRepoBySlug } from "./github";
import { loadGitHubToken } from "./pulumi";

const program = new Command();

program
  .name("github-pulumi")
  .description("CLI Tool to interact with GitHub using Pulumi ESC")
  .version("1.0.0");

program
  .command("list")
  .description("List your GitHub repositories")
  .action(async () => {
    try {
      const token = await loadGitHubToken();
      await listRepos(token);
    } catch (err) {
      console.error("Error listing repositories:", err);
    }
  });

program
  .command("get <name>")
  .description("Get details of a specific GitHub repository by name (slug)")
  .action(async (name: string) => {
    try {
      const token = await loadGitHubToken();
      await getRepoBySlug(token, name);
    } catch (err) {
      console.error("Error fetching repository:", err);
    }
  });

program.parse(process.argv);
