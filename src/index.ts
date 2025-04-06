import { Command } from "commander";
import { listRepos } from "./github";
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

program.parse(process.argv);
