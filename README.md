# Github Pulumi CLI

Github Pulumi CLI is a command line interface for managing GitHub resources using Pulumi. It allows you to create, update, and delete GitHub resources such as repositories, teams, and issues using Pulumi's ESC (Environment-Specific Configuration) and GitHub API.

## Table of Contents

- [Features](#features)
- [Get Started](#get-started)
- [Usage Example](#usage-example)
- [Contributing](#contributing)
- [License](#license)

## Features

- [x] Create and manage GitHub repositories
- [ ] View GitHub repository insights
- [ ] Manage GitHub teams and their members
- [ ] Create and manage GitHub issues
- [ ] Manage GitHub pull requests
- [ ] Manage GitHub actions and workflows

## Getting Started

1. Install Pulumi ESC

```bash
curl -fsSL https://get.esc.dev | bash
```

2. Init your environment

```bash
esc env init github-pulumi/dev
```

3. Set up your github token

```bash
esc env set github_token --env github-pulumi/dev <token> --secret
```

4. Create a copy of .env.example file and configure it

```bash
# Copy the example env file to .env
cp .env.example .env

# Set the environment variables in .env file
ORG=<your_org>
```

> All setup! You can now use the Github Pulumi CLI to manage your GitHub resources.

## Usage

### Listing Repositories

```bash
npm run list
```

### Getting Repository Details

```bash
npm run get -- <repo_name>
```

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
