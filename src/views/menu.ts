import inquirer from "inquirer";

/**
 * Renders the main menu for the GitHub CLI application.
 */
export async function showMainMenu(): Promise<
  "list" | "get" | "insights" | "create" | "update" | "delete" | "exit"
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
        { name: "📄 Create repository", value: "create" },
        { name: "✏️ Update repository", value: "update" },
        { name: "❌ Exit", value: "exit" },
      ],
    },
  ]);

  return option;
}

/**
 * Prompts the user for repository name.
 */
export async function promptRepoName(update = false): Promise<string> {
  const { repository } = await inquirer.prompt([
    {
      type: "input",
      name: "repository",
      message: !update
        ? "🔤 Enter the repository name:"
        : "🔤 Enter the new repository name:",
    },
  ]);

  return repository;
}

/**
 * Prompts the user for repository description.
 */
export async function promptRepoDescription(update = false): Promise<string> {
  const { description } = await inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: !update
        ? "📝 Enter the repository description (optional):"
        : "📝 Enter the new repository description (optional):",
      default: "",
    },
  ]);

  return description;
}
