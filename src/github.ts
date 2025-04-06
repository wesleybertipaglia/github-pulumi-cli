import fetch from "node-fetch";

export async function listRepos(token: string) {
  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "github-cli",
    },
  });

  if (!res.ok) {
    console.error("Error connecting to GitHub API:", res.statusText);
    return;
  }

  const repos: any = await res.json();
  console.log(`You have ${repos.length} repositories:`);

  repos.forEach((repo: any) => {
    console.log(`${repo.name} - ${repo.html_url}`);
  });
}
