# NutrImprove

## Stack

- [Next.js](https://nextjs.org/)
- [Zeit Now](https://zeit.co/)
- [MongoDB](https://www.mongodb.com)

## Usage

- Ensure you have the `.env` file locally on your machine

- `git clone https://github.com/eat-well/eatwell-web`
- `yarn install`
- `yarn test` to run unit tests. Tests are also checked on each commit via `lint-staged`
- Use `now dev` to develop. You will need to have the Now CLI/app installed
- This app automatically deploys on merge to the master branch via [Now](https://now.sh)

### Formating/Linting

- `yarn lint` - Run eslint and auto-fix any errors
- `yarn format` - Run prettier and auto-fix any stylistic changes
- `yarn validate` - Check your files are okay to commit
- You will probably want to ensure your editor is working correctly with eslint and prettier (e.g. to auto-fix on save)
- This repo will not let you commit new files without ensuring they pass testing and linting/style checks. This is done automatically via `lint-staged` and `husky`.

## Processes

### Project Management

- This repo is managed using GitHub's project management system on a simple Kanban-style board ([LINK](https://github.com/eat-well/eatwell-web/projects/1))
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
- There is no dev branch or similar - PRs go straight to master
- Master branch is live and automatically deployed
