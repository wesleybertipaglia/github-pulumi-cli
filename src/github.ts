import fetch from "node-fetch";
import { insightsView, listAll } from "./views/repository";
import { detailsView } from "./views/repository";

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
async function getRepoBySlug(token: string, repository: string) {
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

  return await repoRes.json();
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

  const repos = (await res.json()) as any[];
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
export async function createRepo(
  token: string,
  repository: string,
  description?: string
) {
  const res = await fetch("https://api.github.com/user/repos", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "github-cli",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: repository,
      description: description || "",
    }),
  });

  if (!res.ok) {
    console.error("❌ Failed to create repository:", res.statusText);
    return;
  }

  const repo = (await res.json()) as any;
  console.log(`✅ Repository created`);
  detailsView(repo);
}
