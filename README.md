# 🐙 GitHub CLI with Pulumi ESC — A Secure and Interactive CLI Tool

**GitHub Pulumi CLI** is a simple, interactive command-line tool for managing GitHub resources — built using the [Pulumi ESC (Environment-Specific Configuration)](https://www.pulumi.com/docs/esc/) system to keep your secrets secure and centralized.

This CLI allows you to create, update, and inspect GitHub repositories using the GitHub API, while securely retrieving credentials and configurations from Pulumi ESC. It's a great way to explore the potential of Pulumi's secrets management platform in a real, usable context.

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Why Pulumi ESC?](#-why-pulumi-esc)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 📦 Project Overview

- 🔐 Uses **Pulumi ESC** to manage GitHub tokens securely
- 🧠 Written in **TypeScript** with an interactive Inquirer-based CLI
- 🔧 Interfaces directly with the **GitHub REST API**
- 🧪 A great starting point for building DevOps automation with Pulumi

## 🔐 Why Pulumi ESC?

This project uses Pulumi ESC to securely manage secrets like GitHub tokens. ESC lets you:

- ✅ Store secrets securely and centrally
- ✅ Share secrets across teams and projects
- ✅ Rotate and update secrets without code changes
- ✅ Avoid hardcoding or exposing tokens locally

> Pulumi ESC is a great solution for modern cloud apps that need reliable and flexible secrets management — and this project shows one way it can be used in real dev workflows.

## ✅ Features

- [x] Interactive CLI for GitHub repository management
- [x] View GitHub repository details and insights
- [ ] Manage GitHub teams and their members _(coming soon!)_
- [ ] Create and manage GitHub issues _(coming soon!)_
- [ ] Manage pull requests _(coming soon!)_
- [ ] Manage workflows and GitHub Actions _(coming soon!)_

## 🚀 Getting Started

1. **Install Pulumi ESC**

```bash
curl -fsSL https://get.esc.dev | bash
```

2. **Initialize your environment**

```bash
esc env init github-pulumi/dev
```

3. **Set your GitHub token (securely stored in ESC)**

```bash
esc env set github_token --env github-pulumi/dev <token> --secret
```

4. **Configure your local environment**

```bash
# Copy the example env file to .env
cp .env.example .env

# Set the environment variables in .env file
ORG=<your_org>
```

> All setup! You can now use the Github Pulumi CLI to manage your GitHub resources.

## 💻 Usage

### Running Interactive Menu

```bash
# Start the CLI
npm run dev

# You’ll be presented with an interactive menu:
📚 GitHub CLI Menu - Choose an action
❯ 📦 Repositories Menu
  ❌ Exit
```

From there, you can explore available features such as:

- Listing repositories
- Viewing insights and details
- Creating, updating, or deleting repositories

### 📂 Repository Listing Example

```bash
📦 REPOSITORY LIST:

🔹 Repo #1
   📌 Name: .github
   📝 Description: BoilerLabs is your go-to source for reusable, high-quality boilerplates and code templates.
   👤 Owner: boilerlabs
   ⭐ Stars: 0   🍴 Forks: 0
   🔒 Private: No
   🔗 URL: https://github.com/boilerlabs/.github
```

### 🔍 Repository Details Example

```bash
📦 REPOSITORY DETAILS:

   📌 Name: backend-challenges
   📝 Description: A collection of coding challenges for back-end developers.
   👤 Owner: boilerlabs
   ⭐ Stars: 32   🍴 Forks: 5
   🔒 Private: No
   🔗 URL: https://github.com/boilerlabs/backend-challenges
```

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🙌 Acknowledgments

This project was built as a submission to the [Pulumi Deploy and Document Challenge](https://dev.to/challenges/pulumi), under the "Shhh, It's a Secret!" category — highlighting secure configuration and secret management using Pulumi ESC.

Thanks to the Pulumi team and the DEV community for putting together such a fun and educational challenge!
