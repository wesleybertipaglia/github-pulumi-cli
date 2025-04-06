import fetch from "node-fetch";
import { insightsView, listAll } from "./views/repository";
import { detailsView } from "./views/repository";

let cachedUsername: string | null = null;

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

async function getRepoBySlug(token: string, name: string) {
  const owner = await getUsername(token);

  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "github-cli",
    },
  });

  if (!repoRes.ok) {
    console.error(`🚫 Repository '${name}' not found for user '${owner}'.`);
    return null;
  }

  return await repoRes.json();
}

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

export async function getRepoDetails(token: string, name: string) {
  const repo = await getRepoBySlug(token, name);
  if (repo) detailsView(repo);
}

export async function getRepoInsights(token: string, name: string) {
  const repo = await getRepoBySlug(token, name);
  if (repo) insightsView(repo);
}
