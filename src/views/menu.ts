import inquirer from "inquirer";

export async function showMainMenu(): Promise<
  "list" | "get" | "insights" | "exit"
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
        { name: "❌ Exit", value: "exit" },
      ],
    },
  ]);

  return option;
}

export async function promptRepoName(): Promise<string> {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "🔤 Enter the repository name:",
    },
  ]);

  return name;
}
