# Contributing

## Branch Naming

```
feat/description       # New feature
fix/description        # Bug fix
chore/description      # Tooling, deps, config
docs/description       # Documentation
refactor/description   # Code restructuring
```

Examples: `feat/add-dark-mode-toggle`, `fix/contact-form-validation`, `chore/update-deps`.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`.

Examples:

```
feat(api): add rate limiting to chat endpoint
fix(contact): handle empty honeypot field
chore(deps): upgrade next to 16.2.7
docs(readme): update env setup instructions
```

The pre-commit hook enforces this format automatically.

## PR Process

1. Create a branch from `main` following the naming convention above.
2. Make your changes. Keep commits atomic and well-described.
3. Run the full quality gate before opening a PR:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

4. Open a pull request against `main`. Fill out the template with:
   - Description of what changed and why
   - Screenshots for visual changes
   - Checklist confirming tests, lint, types, and build all pass
5. Request review if the change is non-trivial.

## Code Style

- **No semicolons** — the project uses Prettier without semicolons.
- **Double quotes** in JSX/TSX, single quotes in plain JS/TS files are auto-formatted.
- **TypeScript strict mode** is enabled. Avoid `any` — define interfaces for all data shapes.
- **ESLint** runs on every commit via lint-staged. Fix warnings before pushing.
- **Components** use `"use client"` only when necessary (event handlers, hooks, browser APIs). Default to server components.
- **Imports** prefer `type` keyword for type-only imports (`import type { X }`).

## Testing

- Unit tests live in `tests/` mirroring the source structure.
- Run `npm test` before pushing. Add tests for new utilities and components.
- For UI components, test behavior (renders, user interactions) not implementation details.
- E2E tests in `tests/e2e/` use Playwright. Run `npm run test:e2e` for the full suite.

## Questions

Open an issue for questions about architecture, design decisions, or setup problems.
