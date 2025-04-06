import fetch from "node-fetch";
import { listAll } from "./views/repository";

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
