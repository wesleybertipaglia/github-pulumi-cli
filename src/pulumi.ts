import * as esc from "@pulumi/esc-sdk";

export async function loadGitHubToken(): Promise<string> {
  try {
    const client = esc.DefaultClient();

    const env = await client.openAndReadEnvironment(
      "wesleybertipaglia",
      "github-cli",
      "dev"
    );

    const token = env?.values?.github_token;
    if (!token) {
      throw new Error("Token do GitHub não encontrado.");
    }

    return token;
  } catch (err) {
    console.error("Erro ao carregar token do GitHub:", err);
    throw err;
  }
}
