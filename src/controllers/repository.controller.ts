import {
  listRepos,
  getRepoDetails,
  getRepoInsights,
  createRepo,
  updateRepo,
  deleteRepo,
} from "../services/repository.service";
import {
  promptRepoName,
  promptRepoDescription,
  showRepositoryMenu,
} from "../views/menu.views";

/**
 * Handles the repository management menu.
 * @param token - The GitHub token for authentication.
 * @returns A promise that resolves to either "back" or "exit".
 */
export async function repositoryController(
  token: string
): Promise<"back" | "exit"> {
  while (true) {
    const option = await showRepositoryMenu();

    switch (option) {
      case "list":
        console.clear();
        await listRepos(token);
        break;

      case "get": {
        console.clear();
        const repository = await promptRepoName();
        await getRepoDetails(token, repository);
        break;
      }

      case "insights": {
        console.clear();
        const repository = await promptRepoName();
        await getRepoInsights(token, repository);
        break;
      }

      case "create": {
        console.clear();
        const repository = await promptRepoName();
        const description = await promptRepoDescription();
        await createRepo(token, { name: repository, description });
        break;
      }

      case "update": {
        console.clear();
        const repository = await promptRepoName();
        const newName = await promptRepoName(true);
        const newDescription = await promptRepoDescription(true);
        await updateRepo(token, repository, {
          name: newName,
          description: newDescription,
        });
        break;
      }

      case "delete": {
        console.clear();
        const repository = await promptRepoName();
        await deleteRepo(token, repository);
        break;
      }

      case "exit":
        console.clear();
        return "exit";

      case "back":
        console.clear();
        return "back";
    }

    console.log("\n🔁 Returning to repository menu...\n");
  }
}
