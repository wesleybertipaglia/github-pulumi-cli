import { Command } from "commander";
import { loadGitHubToken } from "./pulumi";
import { showMainMenu } from "./views/menu.views";
import { repositoryController } from "./controllers/repository.controller";

const program = new Command();

program
  .name("github-pulumi")
  .description("CLI Tool to interact with GitHub using Pulumi ESC")
  .version("1.0.0");

if (!process.argv.slice(2).length) {
  (async () => {
    const token = await loadGitHubToken();

    while (true) {
      console.clear();
      const action = await showMainMenu();

      switch (action) {
        case "repository": {
          const result = await repositoryController(token);
          if (result === "exit") {
            console.log("👋 Goodbye!");
            process.exit(0);
          }
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
