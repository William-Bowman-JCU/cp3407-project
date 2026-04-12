---
title: Version Control
nav_order: 6
---

# Version Control
{: .no_toc }

FeedMe uses **Git** and **GitHub** for all version control. This page documents the branching strategy, commit conventions, issue tracking, and project board usage.

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Repository

The project is hosted on GitHub at:

[https://github.com/leonardrein/cp3407-project](https://github.com/leonardrein/cp3407-project)

The repository was forked from the course template (`jc138691/cp3407-project-v2024`) and extended with full source code, documentation, and project management artefacts.

---

## Branching Strategy

The team uses a simple **trunk-based** approach appropriate for a 4-person team:

- **`main`** — the primary integration branch; all completed work is merged here
- **Feature branches** — short-lived branches named after the user story (e.g., `feature/us-06-checkout`, `fix/cart-total`)
- Direct commits to `main` are used for documentation and minor fixes

This approach minimises merge conflicts while keeping a clean commit history on `main`.

---

## Commit History

The repository has accumulated commits from all four team members across both iterations. Key commits include:

| Commit | Description | Author |
|--------|-------------|--------|
| `2e934b9` | style: set dark background as global default | leonardrein |
| `c41567c` | feat: add shared Navbar component, homepage and global layout | leonardrein |
| `35e24ea` | docs: add link to project board in README | leonardrein |
| `cabd196` | refactor: clean up code and remove unnecessary comments | leonardrein |
| `4f9f715` | style: update colour scheme to red/black and rename app to FeedMe | leonardrein |
| `059a6c7` | feat: implement Payment & Confirmation feature (User Story #7) | leonardrein |
| `0c46b53` | Update .gitignore | team |
| `b58a0f9` | Update repository structure and user stories | team |
| `1df6ab1` | Add mockup images for user stories 10–15 | team |

### Commit Message Convention

Commits follow the **Conventional Commits** format:

```
<type>: <short description>

[optional body]
```

Types used:
- `feat` — new feature implementation
- `fix` — bug fix
- `docs` — documentation changes
- `style` — formatting, colour, naming (no logic change)
- `refactor` — code restructuring without behaviour change
- `test` — adding or updating tests

---

## Issue Tracking

GitHub Issues are used to track user stories and bugs in Iteration 2. All open issues are tagged with `iteration-2` and `user-story` labels.

| Issue | Title | Labels | Status |
|-------|-------|--------|--------|
| #6 | Account Settings | `iteration-2`, `user-story` | Open |
| #9 | Restaurant menu configuration | `iteration-2`, `user-story` | Open |
| #10 | UI Designs for User Stories 09–15 | `iteration-2`, `user-story` | Open |

Issues can be viewed at:
[https://github.com/leonardrein/cp3407-project/issues](https://github.com/leonardrein/cp3407-project/issues)

---

## Project Board (Kanban)

The team uses a **GitHub Projects Kanban board** for sprint planning and task tracking.

[View the Project Board](https://github.com/users/leonardrein/projects/1){: .btn .btn-outline }

### Board Columns

| Column | Purpose |
|--------|---------|
| **Todo** | Stories planned for the current iteration, not yet started |
| **In Progress** | Stories actively being worked on |
| **Done** | Completed and verified stories |

### Iteration 1 — Board State at Completion

All 7 iteration 1 user stories were moved to **Done**:
- Create Account
- Login
- Browse Food
- View Menu
- Shopping Cart
- Checkout (Payment & Confirmation)
- Track Order

### Iteration 2 — Current Board State

Iteration 2 stories are in the **In Progress** column as the team works toward the April 10 deadline.

---

## `.gitignore` Coverage

The repository's `.gitignore` excludes:

- `node_modules/` — npm dependencies (regenerated via `npm install`)
- `__pycache__/`, `*.pyc` — Python bytecode
- `venv/`, `.env` — Python virtual environment and environment variables
- `.DS_Store` — macOS metadata files
- `*.sqlite3` — local development database (not committed)
- `.next/` — Next.js build output

This ensures only source code and documentation are tracked, keeping the repository size small and secrets out of version control.

---

## Contribution Visibility

GitHub's commit graph and contributor statistics provide full transparency of individual contributions. The instructor can verify each team member's participation via:

- **Commit history**: `https://github.com/leonardrein/cp3407-project/commits/main`
- **Contributors graph**: `https://github.com/leonardrein/cp3407-project/graphs/contributors`
- **Issue comments**: Activity on individual GitHub Issues
