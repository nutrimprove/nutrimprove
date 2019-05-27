# EatWell

## Stack
- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [MariaDB](https://aws.amazon.com/rds/mariadb/)

## Usage
- Ensure you have the `.env` file locally on your machine

- `git clone https://github.com/whit3kr0w/eatwell`
- `yarn install`

### Formating/Linting
- `yarn lint` - Run eslint and auto-fix any errors
- `yarn format` - Run prettier and auto-fix any stylistic changes
- `yarn validate` - Check your files are okay to commit
- You will probably want to ensure your editor is working correctly with eslint and prettier (e.g. to auto-fix on save)
- This repo will not let you commit new files without ensuring they pass linting and style checks. This is done automatically via `lint-staged` and `husky`.

[TODO - FILL IN DEV COMMANDS]

[TODO - FILL IN DEPLOYMENT INSTRUCTIONS]

## Processes

### Project Management
- This repo is managed using GitHub's project management system on a simple Kanban-style board ([LINK](https://github.com/WhiT3Kr0w/eatwell/projects/1))
- Please assign yourself to an issue if you are working on it and unassign yourself once done
- Please add tasks as issues as this allows better linking to PRs, labelling and discussion if necessary
- Column Explanation
  - Backlog - Things we will want to do at some point but not a priority
  - Ready for Dev - Higher priority items we have decided to do and can commence
  - In Progress - Self-explanatory
  - Done - Self-explanatory

### Git Trunk
- This project uses the [Git Trunk](https://trunkbaseddevelopment.com/) model for source control
- Branches should be short and directly related to features with the branch name starting with the issue number
- There is no dev branch or similar - PRs go straight to master.
