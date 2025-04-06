import inquirer from "inquirer";

/**
 * Renders the main menu for the GitHub CLI application.
 */
export async function showMainMenu(): Promise<"repository" | "exit"> {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "📚 Main Menu - Choose an action",
      choices: [
        { name: "📦 Repositories options", value: "repository" },
        { name: "❌ Exit", value: "exit" },
      ],
    },
  ]);

  return option;
}

/**
 * Renders the repository menu for the GitHub CLI application.
 */
export async function showRepositoryMenu(): Promise<
  "list" | "get" | "insights" | "create" | "update" | "delete" | "back" | "exit"
> {
  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "📦 Repositoru Menu - Choose an action",
      choices: [
        { name: "🗃️ List repositories", value: "list" },
        { name: "🔍 Get repository details", value: "get" },
        { name: "📊 View repository insights", value: "insights" },
        { name: "📄 Create repository", value: "create" },
        { name: "✏️ Update repository", value: "update" },
        { name: "🗑️ Delete repository", value: "delete" },
        { name: "🔙 Back to main menu", value: "back" },
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
