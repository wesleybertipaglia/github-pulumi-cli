import * as esc from "@pulumi/esc-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export async function loadGitHubToken(): Promise<string> {
  try {
    const ORG = process.env.ORG;
    const PROJECT = "github-pulumi";
    const ENV = "dev";
    const client = esc.DefaultClient();

    if (!ORG) {
      throw new Error("Organization name not provided.");
    }

    const env = await client.openAndReadEnvironment(ORG, PROJECT, ENV);

    const token = env?.values?.github_token;
    if (!token) {
      throw new Error("Github token not found in environment variables.");
    }

    return token;
  } catch (err) {
    console.error("Something went wrong: ", err);
    throw err;
  }
}
