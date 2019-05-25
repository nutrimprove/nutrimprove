# eatwell

- `yarn lint` - Run eslint and auto-fix any errors
- `yarn format` - Run prettier and auto-fix any stylistic changes
- `yarn validate` - Check your files are okay to commit
- You will probably want to ensure your editor is working correctly with eslint and prettier (e.g. to auto-fix on save)
- This repo will not let you commit new files without ensuring they pass linting and style checks. This is done automatically via `lint-staged` and `husky`.
