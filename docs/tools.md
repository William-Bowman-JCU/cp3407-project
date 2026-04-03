---
title: Tools
nav_order: 7
---

# Tools & Development Environment
{: .no_toc }

This page documents all tools used during the development of FeedMe, explaining what each tool does and why it was chosen.

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Development Frameworks & Languages

### Next.js 14 (Frontend Framework)

**What:** React-based web framework with App Router, server-side rendering, and file-based routing.

**Why:** Next.js was chosen over plain React because:
- The App Router provides zero-config routing — adding a page is as simple as creating a new folder
- Server components allow data to be fetched on the server, reducing client-side JavaScript and improving initial load time
- TypeScript support is first-class and configured out of the box
- Vercel (the creator of Next.js) offers free, automated deployment for Next.js apps

**Used for:** All frontend pages and components (`frontend/app/`)

---

### Django 5 (Backend Framework)

**What:** Python web framework following the MTV (Model–Template–View) pattern.

**Why:** Django was chosen for the backend because:
- The built-in ORM eliminates raw SQL for most operations, making database interactions safer and faster to write
- Django REST Framework (DRF) provides serialisers, viewsets, and authentication out of the box
- The admin interface (`/admin`) allows easy inspection and manual editing of database records during development
- Django's security defaults (CSRF protection, SQL injection prevention, XSS escaping) reduce the risk of common vulnerabilities

**Used for:** REST API endpoints, data models, authentication (`backend/`)

---

### TypeScript (Language)

**What:** A statically typed superset of JavaScript.

**Why:** TypeScript catches type errors at compile time rather than runtime, which is especially valuable in a codebase with multiple contributors. It also improves IDE auto-complete, making it easier to work with complex data structures like API responses.

**Used for:** All frontend source files (`.ts`, `.tsx`)

---

### Python 3.12 (Language)

**What:** General-purpose interpreted programming language.

**Why:** Django is a Python framework — Python 3.12 was used for its performance improvements over 3.10/3.11 and long-term support timeline.

**Used for:** All backend source files (`.py`)

---

## Styling & UI

### Tailwind CSS

**What:** Utility-first CSS framework.

**Why:** Tailwind enables rapid UI development by composing styles directly in JSX without context-switching to a separate CSS file. The constraint of utility classes naturally enforces a consistent spacing and colour system. Combined with the `tailwind.config.js` theme, the red/black FeedMe colour scheme is applied consistently across every component.

**Used for:** All component styling

---

## Development Tools

### Visual Studio Code

**What:** Cross-platform code editor.

**Why:** VS Code offers excellent TypeScript and Python extensions (Pylance, ESLint, Prettier), an integrated terminal, and built-in Git support. The team standardised on VS Code to ensure consistent editor behaviour.

**Extensions used:**
- ESLint — JavaScript/TypeScript linting
- Prettier — Automatic code formatting
- Pylance — Python type checking and autocomplete
- GitLens — Enhanced Git history and blame views
- Tailwind CSS IntelliSense — Autocomplete for Tailwind utility classes

---

### Git & GitHub

**What:** Distributed version control system + cloud hosting.

**Why:** Git is the industry standard for version control. GitHub adds collaboration features (pull requests, issues, project boards, Actions) that are essential for a multi-developer team. GitHub Pages is also used to host this documentation site.

**Used for:** Version control, issue tracking, Kanban board, documentation hosting

---

### npm (Node Package Manager)

**What:** Package manager for JavaScript/TypeScript.

**Why:** npm is the default package manager for Next.js projects. `package.json` tracks all frontend dependencies, and `package-lock.json` pins exact versions for reproducible installs.

**Key packages:**
- `next` — Core Next.js framework
- `react`, `react-dom` — React library
- `typescript` — TypeScript compiler
- `tailwindcss` — Utility CSS
- `eslint` — Code linting

---

### pip + venv (Python Package Management)

**What:** Python package installer and virtual environment manager.

**Why:** `venv` isolates project dependencies from the system Python installation, preventing version conflicts between projects. `pip` installs packages from PyPI.

**Key packages:**
- `django` — Web framework
- `djangorestframework` — REST API toolkit
- `python-dotenv` — Environment variable loading
- `pytest-django` — Test runner integration

---

## Planning & Design Tools

### GitHub Projects (Kanban Board)

**What:** Built-in GitHub project management with Kanban view.

**Why:** Using GitHub's built-in project board keeps planning in the same tool as the code. Issues on the board are directly linked to commits, making it easy to trace a feature from planning to implementation.

**Used for:** Sprint planning, task tracking across iterations

**Link:** [CP3407 Project Board](https://github.com/users/leonardrein/projects/1)

---

### draw.io / diagrams.net (Architecture Diagrams)

**What:** Free online diagramming tool.

**Why:** draw.io is browser-based (no install required), exports to SVG/PNG, and integrates with VS Code via extension. It was used to sketch the initial system architecture before coding began.

**Used for:** Architecture diagram drafts, component relationship sketches

---

### dbdiagram.io (Database Design)

**What:** Online ERD (Entity-Relationship Diagram) tool using DBML syntax.

**Why:** dbdiagram.io lets you define tables in a simple text format (DBML) and renders a professional ER diagram instantly. This was used to design and communicate the database schema before writing Django models.

**Used for:** Entity-relationship diagram (see [Design](./design))

---

### Figma (UI Wireframes)

**What:** Browser-based UI design and wireframing tool.

**Why:** Figma allows multiple team members to collaborate on wireframes in real time. Mockup screens were created in Figma before implementation to agree on layout and user flow, reducing rework during coding.

**Used for:** UI wireframes for all 15 user stories (image exports stored in `/images`)

---

## AI Assistance

### Claude (Anthropic) / ChatGPT

**What:** Large language model AI assistants.

**Why:** AI tools were used to accelerate development of boilerplate code, generate initial test skeletons, and assist with documentation writing. All AI-generated content was reviewed, adapted, and integrated by team members.

**Declaration:** Use of AI tools is acknowledged in accordance with the CP3407 assessment requirements. All submitted work reflects the team's understanding and has been reviewed for correctness.

**Used for:** Code scaffolding, documentation drafts, debugging assistance

---

## Summary Table

| Category | Tool | Version | Purpose |
|----------|------|---------|---------|
| Frontend framework | Next.js | 14.x | Pages, routing, SSR |
| Frontend language | TypeScript | 5.x | Type-safe JS |
| Styling | Tailwind CSS | 3.x | UI components |
| Backend framework | Django | 5.x | REST API |
| Backend language | Python | 3.12 | Business logic |
| Database | SQLite / PostgreSQL | 3.x / 16.x | Data persistence |
| Editor | VS Code | Latest | Development environment |
| Version control | Git + GitHub | - | Source control, collaboration |
| Package manager (JS) | npm | 10.x | JS dependencies |
| Package manager (Python) | pip + venv | - | Python dependencies |
| Diagrams | draw.io | Online | Architecture diagrams |
| DB design | dbdiagram.io | Online | ER diagrams |
| UI mockups | Figma | Online | Wireframes |
| Project management | GitHub Projects | - | Kanban board |
| AI assistance | Claude / ChatGPT | - | Scaffolding, docs |
