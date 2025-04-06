import inquirer from "inquirer";

/**
 * Renders the main menu for the GitHub CLI application.
 */
export async function showMainMenu(): Promise<
  "list" | "get" | "insights" | "create" | "exit"
> {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "📚 GitHub CLI Menu - Choose an action",
      choices: [
        { name: "📦 List repositories", value: "list" },
        { name: "🔍 Get repository details", value: "get" },
        { name: "📊 View repository insights", value: "insights" },
        { name: "➕ Create repository", value: "create" },
        { name: "❌ Exit", value: "exit" },
      ],
    },
  ]);

  return option;
}

/**
 * Prompts the user for repository name.
 */
export async function promptRepoName(): Promise<string> {
  const { repository } = await inquirer.prompt([
    {
      type: "input",
      name: "repository",
      message: "🔤 Enter the repository name:",
    },
  ]);

  return repository;
}

/**
 * Prompts the user for repository description.
 */
export async function promptRepoDescription(): Promise<string> {
  const { description } = await inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: "📝 Enter the repository description (optional):",
      default: "",
    },
  ]);

  return description;
}
