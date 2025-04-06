import chalk from "chalk";

/**
 * Render a list of repositories with their basic info.
 */
export function listAll(repos: any[]) {
  if (!repos || repos.length === 0) {
    console.log(chalk.yellow("⚠️  No repositories found."));
    return;
  }

  console.log(chalk.bold.cyanBright("\n📦 REPOSITORY LIST:\n"));

  repos.forEach((repo: any, index: number) => {
    listView(repo, index + 1);
  });
}

/**
 * Render basic info for a single repo (used in listAll).
 */
export function listView(repo: any, index?: number) {
  const prefix = index ? `🔹 Repo #${index}` : `🔹 Repository`;

  console.log(
    `${chalk.cyanBright(prefix)}\n` +
      `   📌 ${chalk.bold("Name:")} ${repo.name}\n` +
      `   📝 ${chalk.bold("Description:")} ${
        repo.description || chalk.gray("No description")
      }\n` +
      `   👤 ${chalk.bold("Owner:")} ${repo.owner?.login}\n` +
      `   ⭐ ${chalk.bold("Stars:")} ${repo.stargazers_count}   🍴 ${chalk.bold(
        "Forks:"
      )} ${repo.forks_count}\n` +
      `   🔒 ${chalk.bold("Private:")} ${
        repo.private ? chalk.red("Yes 🔐") : chalk.green("No 🌍")
      }\n` +
      `   🔗 ${chalk.bold("URL:")} ${chalk.underline(repo.html_url)}\n`
  );
}

/**
 * Render full details of a single repo (for detailed view).
 */
export function detailsView(repo: any) {
  if (!repo) {
    console.log(chalk.yellow("⚠️  Repository not found."));
    return;
  }

  console.log(chalk.bold.green("\n📁 REPOSITORY DETAILS:\n"));
  console.log(`   📌 ${chalk.bold("Name:")} ${repo.name}`);
  console.log(
    `   📝 ${chalk.bold("Description:")} ${
      repo.description || chalk.gray("No description")
    }`
  );
  console.log(`   👤 ${chalk.bold("Owner:")} ${repo.owner?.login}`);
  console.log(`   ⭐ ${chalk.bold("Stars:")} ${repo.stargazers_count}`);
  console.log(`   🍴 ${chalk.bold("Forks:")} ${repo.forks_count}`);
  console.log(`   🛠️ ${chalk.bold("Language:")} ${repo.language || "N/A"}`);
  console.log(
    `   📅 ${chalk.bold("Created At:")} ${new Date(
      repo.created_at
    ).toLocaleDateString()}`
  );
  console.log(
    `   🔒 ${chalk.bold("Private:")} ${
      repo.private ? chalk.red("Yes 🔐") : chalk.green("No 🌍")
    }`
  );
  console.log(
    `   🔗 ${chalk.bold("URL:")} ${chalk.underline(repo.html_url)}\n`
  );
}
