# Git Branching Strategy

This project follows the **Git Flow** branching model.

## Branches
- **`main`**: The production-ready state of the app. Code here should always be stable and deployable.
- **`develop`**: The main development branch. All feature branches merge into this branch. This is the "integration" branch.
- **`feature/*`**: Used for developing new features. (e.g., `feature/qr-scanner-update`). Branch off from `develop` and merge back into `develop`.
- **`hotfix/*`**: Used for critical bug fixes in production. Branch off from `main` and merge into both `main` and `develop`.

## Workflow Example
1. **Start a new feature**:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/my-new-feature
   ```
2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add my new feature"
   ```
3. **Push and create a Pull Request (PR)**:
   ```bash
   git push -u origin feature/my-new-feature
   ```
4. **Merge**: Once reviewed, merge the PR into `develop`.

