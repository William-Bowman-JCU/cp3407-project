---
title: Version Control
nav_order: 8
---

# Version Control
{: .no_toc }

This page documents how the FeedMe team used Git and GitHub for source control, issue tracking, and collaboration across both iterations.

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Repository

The project source code is hosted on GitHub and publicly accessible:

[View Repository](https://github.com/leonardrein/cp3407-project){: .btn .btn-outline }
[Contributor Graph](https://github.com/William-Bowman-JCU/cp3407-project/graphs/contributors){: .btn .btn-outline }

---

## Branching Strategy

The team used a mixed branching approach across the two iterations:

- **Feature branches** were used for larger, self-contained stories — allowing a developer to work on a feature without affecting the working `main` branch. Branch names followed the convention `feature/<story-name>` (e.g. `feature/order-history`, `feature/account-settings`).
- **Direct commits to `main`** were used for smaller, low-risk changes such as documentation updates, minor bug fixes, and configuration changes.

This approach balanced the overhead of branch management with the practical reality of a small team working under time constraints.

### Branch Naming Convention

| Branch type | Format | Example |
|-------------|--------|---------|
| Feature | `feature/<story-name>` | `feature/order-history` |
| Bug fix | `fix/<description>` | `fix/cart-total` |
| Documentation | `docs/<description>` | `docs/testing-page` |
| Main branch | `main` | — |

---

## Commit Practices

The repository has **150+ commits** across both iterations. The team followed a consistent commit message convention to keep the history readable and traceable.

### Commit Message Format

Commit messages describe *what changed and why*, not just *what file was edited*:

```
Add order history API endpoint with user isolation

Returns all orders for the authenticated user only.
Includes status badges and placed_at timestamp.
Closes #12
```

### Example Commits

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

Commit history is fully visible in the [repository commit log](https://github.com/leonardrein/cp3407-project/commits/main).

---

## Issue Tracking

GitHub Issues were used to track work items and link them directly to user stories. Each issue corresponded to a user story in the backlog.

### How Issues Were Used

- One issue was created per user story at the start of each iteration
- Issues were labelled by iteration (`iteration-1`, `iteration-2`) and type (`feature`, `bug`, `docs`)
- Commits referencing an issue (e.g. `Closes #12`) automatically closed the issue on merge, keeping the board up to date
- Issues were linked to the GitHub Projects Kanban board, so moving a card reflected the real state of the issue

### Issue Labels

| Label | Purpose |
|-------|---------|
| `feature` | New user story implementation |
| `bug` | Defect found during testing |
| `docs` | Documentation or GitHub Pages updates |
| `iteration-1` | Work scoped to Iteration 1 |
| `iteration-2` | Work scoped to Iteration 2 |

---

## Kanban Board

The GitHub Projects Kanban board tracked all user stories across both iterations:

[View Project Board](https://github.com/users/leonardrein/projects/1){: .btn .btn-outline }

The board uses three columns:

| Column | Meaning |
|--------|---------|
| **Todo** | Planned for this iteration, not yet started |
| **In Progress** | Currently being implemented |
| **Done** | Completed and verified against acceptance criteria |

Cards were only moved to **Done** once the feature met all acceptance criteria defined in its user story file — not simply when code was committed.

---

## Team Contributions

Commits were distributed across 2–3 active contributors, with all team members making meaningful commits to the repository. The full contribution breakdown is visible in the GitHub contributor graph:

[View Contributor Graph](https://github.com/William-Bowman-JCU/cp3407-project/graphs/contributors){: .btn .btn-outline }

### Contribution by Area

| Member | Primary contribution areas |
|--------|---------------------------|
| Leonard Rein | GitHub Pages documentation, Account settings, reorder, order history, Payment |
| William Bowman | Authentication, deployment, Backend API, Django models, Database, Restaurant browsing, Payment |
| Joyal Joy | GitHub Pages documentation, Login page, Sign up page,frontend integration, Backend API, colour|
| Joe David Mathew | GitHub Pages documentation, order history, reorder |
| Alan Wilson | Add to Cart, order history, reorder |

> Individual commit history per contributor is visible via the GitHub contributor graph linked above.

---

## Version Control Workflow Summary

```
1. Pick up a user story from the Kanban board (move to In Progress)
2. Create a feature branch (for larger stories) or commit directly to main (for small changes)
3. Implement the feature with meaningful, descriptive commits
4. Reference the GitHub Issue number in commits (e.g. Closes #9)
5. Merge to main (feature branches) or confirm directly (small commits)
6. Move the Kanban card to Done once acceptance criteria are verified
```

This workflow ensured that the commit history, issue tracker, and Kanban board stayed in sync throughout both iterations.
