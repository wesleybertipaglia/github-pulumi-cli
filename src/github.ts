import fetch from "node-fetch";
import { insightsView, listAll } from "./views/repository";
import { detailsView } from "./views/repository";
import { CreateDto, Repository, UpdateDto } from "./types/repository";

let cachedUsername: string | null = null;

/**
 * Fetches the GitHub username associated with the provided token.
 * Caches the username for subsequent calls.
 *
 * @param {string} token - The GitHub access token.
 * @returns {Promise<string>} - The GitHub username.
 */
async function getUsername(token: string): Promise<string> {
  if (cachedUsername) {
    return cachedUsername;
  }

  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "github-cli",
    },
  });

  if (!res.ok) {
    throw new Error(`❌ Failed to fetch user info: ${res.statusText}`);
  }

  const user = (await res.json()) as { login: string };
  cachedUsername = user.login;
  return cachedUsername;
}

/**
 * Fetches repository details by slug (owner/repo).
 *
 * @param {string} token - The GitHub access token.
 * @param {string} repository - The repository name.
 * @returns {Promise<any>} - The repository details.
 */
async function getRepoBySlug(
  token: string,
  repository: string
): Promise<Repository | null> {
  const owner = await getUsername(token);

  const repoRes = await fetch(
    `https://api.github.com/repos/${owner}/${repository}`,
    {
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "github-cli",
      },
    }
  );

  if (!repoRes.ok) {
    console.error(
      `🚫 Repository '${repository}' not found for user '${owner}'.`
    );
    return null;
  }

  const repo = (await repoRes.json()) as Repository;
  return repo;
}

/**
 * Fetches and lists all repositories for the authenticated user.
 *
 * @param {string} token - The GitHub access token.
 */
export async function listRepos(token: string) {
  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "github-cli",
    },
  });

  if (!res.ok) {
    console.error("❌ Failed to connect to GitHub API:", res.statusText);
    return;
  }

  const repos = (await res.json()) as Repository[];
  listAll(repos);
}

/**
 * Fetches and displays details of a specific repository.
 *
 * @param {string} token - The GitHub access token.
 * @param {string} repository - The repository name (slug).
 */
export async function getRepoDetails(token: string, repository: string) {
  const repo = await getRepoBySlug(token, repository);
  if (repo) detailsView(repo);
}

/**
 * Fetches and displays insights for a specific repository.
 *
 * @param {string} token - The GitHub access token.
 * @param {string} repository - The repository name (slug).
 */
export async function getRepoInsights(token: string, repository: string) {
  const repo = await getRepoBySlug(token, repository);
  if (repo) insightsView(repo);
}

/**
 * Creates a new repository on GitHub.
 *
 * @param {string} token - The GitHub access token.
 * @param {string} repository - The name of the new repository.
 * @param {string} [description] - An optional description for the repository.
 */
export async function createRepo(token: string, data: CreateDto) {
  const res = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "github-cli",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("❌ Failed to create repository:", res.statusText);
    return;
  }

  const repo = (await res.json()) as Repository;
  console.log(`\n🎉 Repository ${repo.name} created successfully!`);
  detailsView(repo);
}

/**
 * Updates an existing repository on GitHub.
 *
 * @param {string} token - The GitHub access token.
 * @param {string} repository - The name of the repository to update.
 * @param {string} [newName] - The new name for the repository.
 * @param {string} [newDescription] - The new description for the repository.
 */
export async function updateRepo(
  token: string,
  repository: string,
  data: UpdateDto
) {
  const owner = await getUsername(token);

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repository}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "github-cli",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    console.error("❌ Failed to update repository:", res.statusText);
    return;
  }

  const repo = (await res.json()) as Repository;
  console.log(`\n🎉 Repository ${repo.name} updated successfully!`);
  detailsView(repo);
}

/**
 * Deletes a repository on GitHub.
 *
 * @param {string} token - The GitHub access token.
 * @param {string} repository - The name of the repository to delete.
 */
export async function deleteRepo(token: string, repository: string) {
  const owner = await getUsername(token);

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repository}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "github-cli",
      },
    }
  );

  if (!res.ok) {
    console.error("❌ Failed to delete repository:", res.statusText);
    return;
  }

  console.log(`✅ Repository '${repository}' deleted successfully.`);
}
