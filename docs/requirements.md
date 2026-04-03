---
title: Requirements
nav_order: 2
---

# Requirements
{: .no_toc }

All requirements are captured as user stories following XP (Extreme Programming) conventions. Stories were estimated using Planning Poker, prioritised by business value, and planned across two iterations.

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Full Product Backlog

The backlog contains **15 user stories** — more than fit into two iterations, enabling the team to practise prioritisation by selecting the highest-value stories first.

| # | User Story | Priority | Estimate | Iteration |
|---|-----------|----------|----------|-----------|
| 01 | [Create Account](#us-01-create-account) | 10 | 2 days | 1 |
| 02 | [Login](#us-02-login) | 9 | 1 day | 1 |
| 03 | [Browse Food](#us-03-browse-food) | 8 | 2 days | 1 |
| 04 | [View Menu](#us-04-view-menu) | 8 | 2 days | 1 |
| 05 | [Shopping Cart](#us-05-shopping-cart) | 7 | 2 days | 1 |
| 06 | [Checkout](#us-06-checkout) | 6 | 2 days | 1 |
| 07 | [Track Order](#us-07-track-order) | 5 | 2 days | 1 |
| 08 | [Account Settings](#us-08-account-settings) | 7 | 2 days | 2 |
| 09 | [Select Delivery Location](#us-09-select-delivery-location) | 10 | 2 days | 2 |
| 10 | [Select Restaurant](#us-10-select-restaurant) | 9 | 2 days | 2 |
| 11 | [Search Restaurants](#us-11-search-restaurants) | 6 | 1 day | 2 |
| 12 | [Order History](#us-12-order-history) | 8 | 2 days | 2 |
| 13 | [Reorder Previous Order](#us-13-reorder-previous-order) | 5 | 2 days | 2 |
| 14 | [Restaurant Details](#us-14-restaurant-details) | 6 | 2 days | 2 |
| 15 | [Filter Restaurants](#us-15-filter-restaurants) | 4 | 2 days | 2 |

**Total backlog:** 28 story days across 15 stories
**Iteration 1 budget:** 13 story days (7 stories)
**Iteration 2 budget:** 15 story days (8 stories)
**Deferred (not yet scheduled):** 0 stories (all 15 fit across the two iterations)

### Prioritisation Rationale

Priorities were assigned on a scale of 1–10 reflecting **business value and dependency order**:

- **Priority 10 stories** (Create Account, Select Delivery Location) form the foundation — nothing else works without them.
- **Priority 8–9 stories** (Login, Browse Food, View Menu, Select Restaurant, Order History) are the core user journey and provide the primary value proposition.
- **Priority 5–7 stories** add usability and convenience features that improve the product but are not blockers to the core experience.
- **Priority 4 stories** (Filter Restaurants) are desirable enhancements that were deferred to the end of the backlog.

Stories were ordered within iterations to respect dependencies: e.g., *Create Account* must precede *Login*, and *Select Restaurant* must precede *View Menu*.

---

## Iteration 1 Stories (Completed)

### US-01: Create Account

> **As a** new user,
> **I want to** create an account with my email and password,
> **so that** I can save my details and order food.

| Field | Value |
|-------|-------|
| Priority | 10 |
| Estimate | 2 days |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- User can register with email, password, and full name
- Password is stored securely (hashed)
- Duplicate email addresses are rejected with a clear error message
- User is redirected to the home page after successful registration

**Tasks:**
- Design registration form UI
- Implement form validation (frontend)
- Create user model and database migration (backend)
- Implement registration API endpoint
- Write acceptance test

---

### US-02: Login

> **As a** registered user,
> **I want to** log in with my email and password,
> **so that** I can access my account and order history.

| Field | Value |
|-------|-------|
| Priority | 9 |
| Estimate | 1 day |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- User can log in with valid credentials
- Invalid credentials show a clear error message (no information leakage)
- "Remember Me" option extends session duration
- User is redirected to the home page after successful login

---

### US-03: Browse Food

> **As a** logged-in user,
> **I want to** browse food categories,
> **so that** I can discover what types of food are available.

| Field | Value |
|-------|-------|
| Priority | 8 |
| Estimate | 2 days |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- Home page displays a grid of food category cards (e.g., Fast Food, Dinner, Sushi)
- Each category shows a representative image and label
- Clicking a category navigates to filtered restaurant/menu results
- Page loads within 2 seconds on a standard connection

---

### US-04: View Menu

> **As a** user who has selected a restaurant,
> **I want to** view its full menu with prices,
> **so that** I can decide what to order.

| Field | Value |
|-------|-------|
| Priority | 8 |
| Estimate | 2 days |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- Menu items are displayed with name, description, price, and image
- Items are grouped by category (e.g., Starters, Mains, Drinks)
- An "Add to Cart" button is available for each item
- Out-of-stock items are visually marked and cannot be added

---

### US-05: Shopping Cart

> **As a** user browsing menus,
> **I want to** add items to a cart and review them before ordering,
> **so that** I can confirm my selection and total price.

| Field | Value |
|-------|-------|
| Priority | 7 |
| Estimate | 2 days |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- Cart shows all added items with quantities and individual prices
- User can increase, decrease, or remove items
- Subtotal and total (including estimated delivery fee) are displayed
- Cart state persists if user navigates away and returns

---

### US-06: Checkout

> **As a** user with items in my cart,
> **I want to** complete a checkout,
> **so that** I can place my order and receive a confirmation.

| Field | Value |
|-------|-------|
| Priority | 6 |
| Estimate | 2 days |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- User can review order summary before confirming
- User enters or selects a delivery address
- User selects a payment method
- After confirmation, an order reference number is shown
- A confirmation page summarises the order details

---

### US-07: Track Order

> **As a** user who has placed an order,
> **I want to** track the status of my delivery,
> **so that** I know when my food will arrive.

| Field | Value |
|-------|-------|
| Priority | 5 |
| Estimate | 2 days |
| Iteration | 1 |
| Status | **Completed** |

**Acceptance criteria:**
- Order status page shows current delivery state (e.g., Preparing, On the Way, Delivered)
- Page shows estimated delivery time
- Delivery address and order summary are visible
- Status updates automatically without a full page reload

---

## Iteration 2 Stories (In Progress)

### US-08: Account Settings

> **As a** registered user,
> **I want to** manage my profile, addresses, and payment methods,
> **so that** my account details stay up to date.

| Field | Value |
|-------|-------|
| Priority | 7 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

**Acceptance criteria:**
- User can update name, email, phone number, and password
- User can add, edit, and delete saved addresses
- User can manage saved payment methods
- Changes are saved with a confirmation message

---

### US-09: Select Delivery Location

> **As a** user starting an order,
> **I want to** specify my delivery address before browsing restaurants,
> **so that** I only see restaurants that deliver to my location.

| Field | Value |
|-------|-------|
| Priority | 10 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

**Acceptance criteria:**
- Address input is shown on the home page before browsing
- User can type a suburb/postcode or select a saved address
- Invalid or unserviced areas show a clear message
- Selected address is shown persistently during the session

---

### US-10: Select Restaurant

> **As a** user who has entered a delivery address,
> **I want to** browse a list of available restaurants,
> **so that** I can choose where to order from.

| Field | Value |
|-------|-------|
| Priority | 9 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

---

### US-11: Search Restaurants

> **As a** user,
> **I want to** search restaurants by name or cuisine,
> **so that** I can quickly find what I am looking for.

| Field | Value |
|-------|-------|
| Priority | 6 |
| Estimate | 1 day |
| Iteration | 2 |
| Status | **In Progress** |

---

### US-12: Order History

> **As a** returning user,
> **I want to** view my past orders,
> **so that** I can keep track of what I have ordered.

| Field | Value |
|-------|-------|
| Priority | 8 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

---

### US-13: Reorder Previous Order

> **As a** returning user,
> **I want to** reorder a previous order with one click,
> **so that** I can quickly order my favourite meals again.

| Field | Value |
|-------|-------|
| Priority | 5 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

---

### US-14: Restaurant Details

> **As a** user browsing restaurants,
> **I want to** view details about a restaurant (rating, hours, delivery time),
> **so that** I can make an informed choice.

| Field | Value |
|-------|-------|
| Priority | 6 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

---

### US-15: Filter Restaurants

> **As a** user browsing restaurants,
> **I want to** filter results by cuisine type, rating, or delivery time,
> **so that** I can narrow down my options quickly.

| Field | Value |
|-------|-------|
| Priority | 4 |
| Estimate | 2 days |
| Iteration | 2 |
| Status | **In Progress** |

---

## Estimation Method

User story sizing was done using **Planning Poker** — the team independently estimated each story in story days, discussed disagreements, and agreed on a final estimate. This process:

- Avoids anchoring bias (no one sees others' estimates first)
- Surfaces hidden complexity through discussion
- Builds shared understanding of each feature

Story day estimates reflect the effort required for one developer to implement, test, and integrate a feature.
