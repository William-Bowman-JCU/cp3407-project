---
title: Implementation
nav_order: 4
---

# Implementation
{: .no_toc }

This page documents the features delivered in each iteration, the technology stack, and the deployment setup.

---

## Live Application

[**Open FeedMe App**](https://main.d29mzie0h3ms32.amplifyapp.com){: .btn .btn-primary .fs-5 .mb-4 }

The frontend is deployed on Vercel and publicly accessible. The app demonstrates the complete Iteration 1 user journey: browse food categories, manage the shopping cart, proceed through checkout, and view the order confirmation.

| Environment | URL | Status |
|-------------|-----|--------|
| Production (frontend) | [feedme-dusky.vercel.app](https://main.d29mzie0h3ms32.amplifyapp.com) | Live |
| Backend API | Django / local dev | Available via `python manage.py runserver` |

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | Next.js | 14.x | React framework with App Router, SSR |
| Frontend language | TypeScript | 5.x | Type-safe JavaScript |
| Styling | Tailwind CSS | 3.x | Utility-first CSS framework |
| Backend | Django | 5.x | Python web framework |
| Backend language | Python | 3.12 | Backend logic and ORM |
| Database (dev) | SQLite | 3.x | Development database (file-based) |
| Package manager (JS) | npm | 10.x | JavaScript dependency management |
| Package manager (Python) | pip + venv | - | Python dependency isolation |

### Why This Stack?

**Next.js** was chosen over a plain React app because the App Router provides file-based routing, reducing boilerplate. Server components allow data-heavy pages to be rendered on the server, improving initial load time — important for a product page that must display many food items quickly.

**Django** provides a production-grade ORM, a built-in admin panel for managing restaurant/menu data, and excellent documentation. For a time-boxed project, Django's "batteries included" philosophy accelerates development.

**TypeScript** was used throughout the frontend to catch type errors at compile time, improving maintainability as the codebase grew across two iterations.

---

## Iteration 1 Deliverables (17 Feb – 14 Mar 2026)

All seven planned stories were delivered. Velocity: **13 story days**.

### Create Account & Login (US-01, US-02)

Users can register a new account and log in. The registration form collects email, password, and full name. Input is validated on the frontend before submission. The login screen includes a "Remember Me" checkbox and displays an error message for invalid credentials.

**Delivered:**
- Registration form with validation
- Login form with error handling
- Social login buttons (UI only in this iteration)
- Redirect to home after successful auth

### Browse Food Categories (US-03)

The home page displays a grid of food category cards. Each card has a full-bleed image representing the cuisine type (Fast Food, Dinner, Sushi, etc.) with a label overlay. Clicking a category will navigate to filtered results in a future iteration.

**Delivered:**
- Responsive category card grid
- FeedMe branding with red/black colour scheme
- Shared Navbar component with cart icon

### View Restaurant Menu (US-04)

After selecting a restaurant, users see the full menu. Items are displayed as cards with name, description, price, and an image. Items are grouped by category (Starters, Mains, Drinks).

**Delivered:**
- Menu item card layout
- Category groupings
- Add to Cart button per item

### Shopping Cart (US-05)

Users can review their selected items before checkout. The cart shows each item, its quantity, and price. Users can adjust quantities or remove items. A running total is shown at the bottom.

**Delivered:**
- Cart item list with quantity steppers
- Line-item pricing and total calculation
- Persistent cart state during session

### Checkout (US-06)

The checkout flow walks the user through confirming their order. They review the item summary, select a delivery address, choose a payment method, and place the order.

**Delivered:**
- Multi-step checkout flow
- Order summary view
- Address input
- Payment method selector (mock)
- "Place Order" confirmation button

### Order Tracking (US-07)

After placing an order, users see a tracking page showing the current order status, estimated delivery time, and a summary of their order.

**Delivered:**
- Status display (Confirmed, Preparing, On the Way, Delivered)
- Order summary with items and total
- Delivery address confirmation
- Estimated delivery time display

---

## Iteration 2 Deliverables (17 Mar – 10 Apr 2026)

Iteration 2 is complete. All planned features were delivered except Filter Restaurants (US-15), which was deferred as the lowest-priority story when the team reached velocity capacity.

| Feature | Story | Status |
|---------|-------|--------|
| Select Delivery Location | US-09 | ✅ Completed |
| Select Restaurant | US-10 | ✅ Completed |
| Order History | US-12 | ✅ Completed |
| Account Settings | US-08 | ✅ Completed |
| Search Restaurants | US-11 | ✅ Completed |
| Restaurant Details | US-14 | ✅ Completed |
| Reorder Previous Order | US-13 | ✅ Completed |
| Filter Restaurants | US-15 | ⏭ Deferred (lowest priority, insufficient capacity) |

---

## Client Feedback — Post Iteration 1

After completing Iteration 1, the team demonstrated the working application and collected feedback.

**Positive feedback:**
- The core ordering flow (account → browse → cart → checkout → tracking) worked end-to-end without bugs.
- The red/black colour scheme was well-received as modern and consistent with food delivery app conventions.
- The multi-step checkout was clear and easy to follow.

**Feedback for Iteration 2:**
- Users expected to select a delivery address *before* browsing restaurants (mirroring the UberEats/FoodPanda pattern). This led to the addition of **US-09 (Select Delivery Location)** at the top of the Iteration 2 backlog with priority 10.
- Restaurant browsing needed to show more detail — leading to **US-14 (Restaurant Details)** and **US-10 (Select Restaurant)**.
- Users wanted to find specific cuisines quickly — motivating **US-11 (Search)** and **US-15 (Filter)**.

> This feedback directly shaped the Iteration 2 backlog and priority ordering.

---

## Code Quality

### Conventions

- TypeScript strict mode enabled across the frontend — all components are fully typed.
- Django follows the MTV (Model–Template–View) pattern; view logic is kept thin and delegated to service functions.
- Component names use PascalCase (e.g., `Navbar`, `MenuItemCard`); files use kebab-case (e.g., `menu-item-card.tsx`).
- CSS utility classes via Tailwind — no inline styles, no CSS Modules.

### Repository Structure

```
cp3407-project/
├── frontend/           # Next.js application
│   ├── app/            # Pages and components (App Router)
│   └── public/         # Static assets
├── backend/            # Django application
│   ├── app/            # Core Django app (models, views, urls)
│   └── manage.py       # Django management script
├── user_stories/       # User story documentation (15 .md files)
├── Iteration_Journal/  # Iteration planning and burn-down charts
├── images/             # UI mockup images
└── docs/               # GitHub Pages documentation (this site)
```

---

## Deployment

### Frontend — Vercel

The Next.js frontend is deployable to **Vercel** with zero configuration. Vercel automatically detects Next.js projects and sets up build and deployment pipelines on every push to `main`.

**Deployment steps:**
1. Connect the `leonardrein/cp3407-project` GitHub repo to Vercel
2. Set root directory to `frontend/`
3. Set environment variable `NEXT_PUBLIC_API_URL` to the backend URL
4. Push to `main` — Vercel deploys automatically

### Backend — Railway / Render

The Django backend can be deployed to **Railway** or **Render** as a web service.

**Deployment steps:**
1. Create a `Procfile` in the backend root: `web: gunicorn backend.wsgi`
2. Add `gunicorn` and `psycopg2-binary` to `requirements.txt`
3. Set `DATABASE_URL` environment variable (PostgreSQL provided by Railway)
4. Set `DJANGO_SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS` in environment

### Environment Variables

| Variable | Service | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Frontend | URL of the Django API |
| `DJANGO_SECRET_KEY` | Backend | Django secret key (keep private) |
| `DATABASE_URL` | Backend | PostgreSQL connection string |
| `DEBUG` | Backend | Set to `False` in production |
| `ALLOWED_HOSTS` | Backend | Comma-separated list of allowed hostnames |
