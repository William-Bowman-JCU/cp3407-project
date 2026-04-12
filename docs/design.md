---
title: Design
nav_order: 3
---

# Design
{: .no_toc }



This page documents the architectural, database, and user interface design decisions for FeedMe.

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## System Architecture

FeedMe follows a **decoupled client–server architecture**. The frontend and backend are separate applications that communicate via a REST API. This separation allows each layer to be developed, tested, and deployed independently.

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser["User Browser"]
        Next["Next.js 14 (TypeScript)\nReact Components\nApp Router"]
    end

    subgraph Server["Server Layer"]
        Django["Django 5 (Python)\nREST API\nAuthentication\nBusiness Logic"]
    end

    subgraph Data["Data Layer"]
        DB[("SQLite\n(Development)\nPostgreSQL\n(Production)")]
    end

    Browser --> Next
    Next -- "HTTP/JSON REST API" --> Django
    Django --> DB
```

### Architectural Decisions

| Decision | Choice | Justification |
|----------|--------|---------------|
| Frontend framework | Next.js 14 (TypeScript) | Server-side rendering improves performance and SEO; App Router provides file-based routing |
| Backend framework | Django 5 (Python) | Mature ORM, built-in admin, rapid API development with Django REST Framework |
| API style | REST (JSON) | Simple, stateless, widely supported; suitable for a CRUD-heavy food delivery domain |
| Database (dev) | SQLite | Zero-configuration, file-based, ships with Python — ideal for development and testing |
| Database (prod) | PostgreSQL | Production-grade, ACID-compliant, fully supported by Django ORM |
| Authentication | JWT (JSON Web Tokens) | Stateless auth that works well with decoupled frontend/backend architecture |
| Styling | Tailwind CSS | Utility-first CSS, rapid UI development, consistent design system |

---

## Database Design

The database models reflect the core domain of a food delivery application: users place orders from restaurants, each order containing menu items.

```mermaid
erDiagram
    USER {
        int id PK
        string email
        string password_hash
        string full_name
        string phone
        datetime created_at
        datetime updated_at
    }
    ADDRESS {
        int id PK
        int user_id FK
        string street
        string suburb
        string city
        string postcode
        bool is_default
    }
    RESTAURANT {
        int id PK
        string name
        string cuisine_type
        string address
        float rating
        string image_url
        time opening_time
        time closing_time
        bool is_active
    }
    MENU_ITEM {
        int id PK
        int restaurant_id FK
        string name
        string description
        decimal price
        string category
        string image_url
        bool is_available
    }
    ORDER {
        int id PK
        int user_id FK
        int restaurant_id FK
        int delivery_address_id FK
        string status
        decimal subtotal
        decimal delivery_fee
        decimal total
        datetime placed_at
        datetime estimated_delivery
    }
    ORDER_ITEM {
        int id PK
        int order_id FK
        int menu_item_id FK
        int quantity
        decimal unit_price
    }

    USER ||--o{ ADDRESS : "has saved"
    USER ||--o{ ORDER : "places"
    RESTAURANT ||--o{ MENU_ITEM : "offers"
    RESTAURANT ||--o{ ORDER : "receives"
    ORDER ||--o{ ORDER_ITEM : "contains"
    MENU_ITEM ||--o{ ORDER_ITEM : "appears in"
    ADDRESS ||--o{ ORDER : "delivers to"
```

### Key Design Decisions

- **`ORDER_ITEM.unit_price`** stores the price at the time of ordering, so historical orders remain accurate even if menu prices change later.
- **`ADDRESS`** is a separate table linked to users, supporting multiple saved addresses per account (US-08, US-09).
- **`RESTAURANT.is_active`** allows restaurants to be disabled without deleting their data or order history.
- **`ORDER.status`** uses a string enum (`pending`, `confirmed`, `preparing`, `on_the_way`, `delivered`, `cancelled`) to track delivery lifecycle (US-07).

---

## User Interface Design

The UI was designed before coding began, using wireframe mockups to align the team on expected behaviour and layout before implementation.

### Design Principles

1. **Mobile-first**: Most food delivery usage is on mobile — all layouts start from a narrow viewport and scale up.
2. **Minimal friction**: The primary user journey (browse → add → checkout) requires no more than 3 clicks.
3. **Visual consistency**: Red/black colour scheme applied throughout using a shared Tailwind config.
4. **Clear feedback**: Every user action (add to cart, confirm order) produces immediate visual feedback.

### Key Screens

#### Home / Browse Screen

The home screen is the entry point after login. It presents food categories as clickable cards, allowing users to jump directly into a cuisine type.

- Header: FeedMe logo, delivery address selector, cart icon with item count
- Body: Category grid — each card has a full-bleed food image and category label
- Bottom nav: Home, Search, Orders, Profile

#### Restaurant Menu Screen

After selecting a category and restaurant, the user sees the full menu grouped by section.

- Sticky header shows restaurant name, rating, and delivery time
- Menu items displayed as cards: image left, name + description + price right
- Floating "Add to Cart" button anchored to bottom of screen, showing running total

#### Cart Screen

Before checkout, the user reviews their selection.

- List of items with quantity stepper (+/−) and line prices
- Subtotal + delivery fee + total shown at bottom
- "Confirm Order" CTA navigates to checkout

#### Checkout / Confirmation Screen

Final step before placing the order.

- Delivery address selector (default or new)
- Payment method selector (mock in current implementation)
- Order summary with itemised list and total
- "Place Order" button → transitions to confirmation page
- Confirmation page shows order reference, estimated delivery time, and status link

#### Order Tracking Screen

Post-order status view (US-07).

- Visual status stepper: Confirmed → Preparing → On the Way → Delivered
- Map placeholder (future: live map integration)
- Estimated delivery countdown

### UI Mockups

Wireframe mockups were created during iteration planning to guide implementation. Images are stored in the [`/images`](https://github.com/William-Bowman-JCU/cp3407-project/tree/main/images) directory of the repository.

- `images/restaurant_selection.png` — Restaurant selection screen
- `images/User_story_10_15/` — Mockups for user stories 10–15

---

## Component Structure (Frontend)

The Next.js app is organised using the App Router with a component-based structure:

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, global styles)
│   ├── page.tsx            # Home page (food category browse)
│   ├── cart/
│   │   └── page.tsx        # Shopping cart view
│   ├── checkout/
│   │   └── page.tsx        # Checkout and payment
│   ├── confirmation/
│   │   └── page.tsx        # Order confirmation
│   └── components/
│       └── Navbar.tsx      # Shared navigation bar
├── public/                 # Static assets
└── globals.css             # Global Tailwind base styles
```

### Separation of Concerns

- **`layout.tsx`** provides the shared Navbar and global dark background theme — any page added to the app automatically inherits these without duplication.
- **`components/`** contains reusable UI elements shared across multiple pages.
- Each route folder (`cart/`, `checkout/`, `confirmation/`) encapsulates its own page logic.
