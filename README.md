# CP3407 Software Engineering Project

This repository contains the planning and development artefacts for the CP3407 Software Engineering group project. The projects consists of  creating a web application named FeedMe, a food delivery application that allows the users/customers to browse restaurants, place orders, view cart, checkout and track orders. 
The following documentation includes the project backlog, user stories, iteration planning, and links to implementation progress.

## Team

It is recommended to complete this assignment in a group of 2–4 students.

1. Leonard Rein – on-campus student (CP3407)
2. William Bowman – on-campus student (CP3407)
3. Joyal Joy – on-campus student (CP3407)
4. Joe David Mathew – on-campus student (CP3407)
5. Alan Wilson – on-campus student (CP3407) 

## Tech Stack

* Frontend: Next.js 14 (TypeScript), Tailwind CSS
* Backend: Django 5, Django REST Framework
* Database: SQLite (development), PostgreSQL (production)
* Deployment: AWS Amplify
* Tools: GitHub, NinjaMock, Miro

## Deployed Application

* **Live app (AWS Amplify):** https://main.d29mzie0h3ms32.amplifyapp.com

## Documentation

* [Database Design](./docs/database.md)
* [System & UI Design](./docs/design.md)
* [Testing](./docs/testing.md)
* [Dev Tools & AI Usage](./docs/tools.md)
* [Agile Process](./docs/agile.md)
* [Requirements](./docs/requirements.md)


## Project Board (Kanban)

[CP3407 Project Board](https://github.com/users/leonardrein/projects/1)

## Project planning BEFORE iteration-1 (see chapters 1–3)

The full product backlog contains **15 user stories** — deliberately more than can fit into two iterations, to force real prioritisation decisions. All user stories are in [`/user_stories`](./user_stories/).

| # | User Story | Priority | Estimate |
|---|-----------|----------|----------|
| US-01 | [Create account](./user_stories/User_story_01_create_account.md) | 10 | 2 days |
| US-02 | [Login](./user_stories/User_story_02_login.md) | 9 | 1 day |
| US-03 | [Browse Food](./user_stories/User_story_03_browse_food.md) | 8 | 2 days |
| US-04 | [View Menu](./user_stories/User_story_04_view_menu.md) | 8 | 2 days |
| US-05 | [Shopping Cart](./user_stories/User_story_05_shopping_cart.md) | 7 | 2 days |
| US-06 | [Checkout](./user_stories/User_story_06_checkout.md) | 6 | 2 days |
| US-07 | [Track Order](./user_stories/User_story_07_track_order.md) | 5 | 2 days |
| US-08 | [Account Settings](./user_stories/User_story_08_account_settings.md) | 4 → 7 | 2 days |
| US-09 | [Select Delivery Location](./user_stories/User_story_09_delivery_location.md) | 10 | 2 days |
| US-10 | [Select Restaurant](./user_stories/User_story_10_select_restaurant.md) | 9 | 2 days |
| US-11 | [Search Restaurants](./user_stories/User_story_11_search_restaurants.md) | 6 | 1 day |
| US-12 | [Order History](./user_stories/User_story_12_order_history.md) | 8 | 2 days |
| US-13 | [Reorder Previous Order](./user_stories/User_story_13_reorder.md) | 5 | 2 days |
| US-14 | [Restaurant Details](./user_stories/User_story_14_restaurant_details.md) | 6 | 2 days |
| US-15 | [Filter Restaurants](./user_stories/User_story_15_filter_restaurants.md) | 4 | 2 days |

**Total backlog: 28 story days** across 15 stories. US-09 was added after Iteration 1 retrospective (domain gap discovered). US-15 was deferred — lowest priority, did not fit within velocity.

## Iteration 1 [duration 3–4 weeks]

This iteration focuses on delivering the core ordering workflow, allowing users to create an account, browse food options, add items to the cart, complete checkout, and track their orders.

Start date: 17 Feb 2026  
End date: 14 Mar 2026  

1. [Create account](./user_stories/User_story_01_create_account.md), priority 10, 2 days
2. [Login](./user_stories/User_story_02_login.md), priority 9, 1 day
3. [Browse Food](./user_stories/User_story_03_browse_food.md), priority 8, 2 days
4. [View Menu](./user_stories/User_story_04_view_menu.md), priority 8, 2 days
5. [Shopping Cart](./user_stories/User_story_05_shopping_cart.md), priority 7, 2 days
6. [Checkout](./user_stories/User_story_06_checkout.md), priority 6, 2 days
7. [Track Order](./user_stories/User_story_07_track_order.md), priority 5, 2 days

Total: 13 days

## Iteration 1 Review


### Completed user stories

1. [Create account](./user_stories/User_story_01_create_account.md), priority 10, 2 days
2. [Login](./user_stories/User_story_02_login.md), priority 9, 1 day
3. [Browse Food](./user_stories/User_story_03_browse_food.md), priority 8, 2 days
4. [View Menu](./user_stories/User_story_04_view_menu.md), priority 8, 2 days
5. [Shopping Cart](./user_stories/User_story_05_shopping_cart.md), priority 7, 2 days
6. [Checkout](./user_stories/User_story_06_checkout.md), priority 6, 2 days
7. [Track Order](./user_stories/User_story_07_track_order.md), priority 5, 2 days

Completed effort: **13 story days**

The **Account Settings** user story was not implemented and moved to iteration 2.

### What went well

- The prioritised backlog helped the team focus on the core ordering workflow.
- UI mockups helped clarify the expected behaviour of each feature.
- The core system flow (account → browsing → ordering → tracking) was successfully implemented.

### Lessons learned

- Some domain details (e.g., selecting a delivery location before browsing restaurants) were identified during development but were not explicitly included in the initial backlog.
- Breaking user stories into smaller tasks helped improve clarity during implementation.

### Velocity

Planned effort: **13 story days**  
Completed effort: **13 story days**

Team velocity for iteration 1: **13 story days per iteration**

This velocity was used to plan the scope of iteration 2.

### Improvements for Iteration 2

Based on the review of iteration 1, the team will:

- Implement the **Account Settings** functionality.
- Refine user stories with additional domain details where needed.
- Continue improving the ordering workflow based on feedback from iteration 1.

---

## Iteration 2 [duration 3–4 weeks]

This iteration focuses on improving the realism and usability of the ordering process by introducing location selection, restaurant browsing improvements, and account management features.

Start date: 17 Mar 2026  
End date: 10 Apr 2026  

1. [Account Settings](./user_stories/User_story_08_account_settings.md), priority 7, 2 days
2. [Select Delivery Location](./user_stories/User_story_09_delivery_location.md), priority 10, 2 days
3. [Select Restaurant](./user_stories/User_story_10_select_restaurant.md), priority 9, 2 days
4. [Search Restaurants](./user_stories/User_story_11_search_restaurants.md), priority 6, 1 day
5. [Order History](./user_stories/User_story_12_order_history.md), priority 8, 2 days
6. [Reorder Previous Order](./user_stories/User_story_13_reorder.md), priority 5, 2 days
7. [Restaurant Details](./user_stories/User_story_14_restaurant_details.md), priority 6, 2 days
8. [Filter Restaurants](./user_stories/User_story_15_filter_restaurants.md), priority 4, 2 days

Total: 15 days

## Iteration 2 Review

### Completed user stories

1. [Account Settings](./user_stories/User_story_08_account_settings.md), priority 6, 1.5 days
2. [Select Delivery Location](./user_stories/User_story_09_delivery_location.md), priority 10, 2 days
3. [Select Restaurant](./user_stories/User_story_10_select_restaurant.md), priority 9, 2 days
4. [Search Restaurants](./user_stories/User_story_11_search_restaurants.md), priority 6, 1 day
5. [Order History](./user_stories/User_story_12_order_history.md), priority 8, 2 days
6. [Reorder Previous Order](./user_stories/User_story_13_reorder.md), priority 5, 2 days
7. [Restaurant Details](./user_stories/User_story_14_restaurant_details.md), priority 6, 2 days

Completed effort: **13 story days**

### Not completed — deferred

* [Filter Restaurants](./user_stories/User_story_15_filter_restaurants.md), priority 4, 2 days — deferred due to insufficient remaining story days and lowest priority in the backlog. To be considered for a future iteration.

### What went well

- Delivery location, account settings, and order history features were delivered on time.
- Backend REST API covered all required endpoints for iteration 2 features.
- Deployment to AWS Amplify remained stable throughout the iteration, enabling continuous testing against the live environment.

### Lessons learned

- Some features required more backend coordination than initially estimated.
- Earlier alignment on API contracts between frontend and backend would have reduced integration time.

### Velocity

Planned effort: **15 story days**
Completed effort: **13 story days**

Team velocity for iteration 2: **≈13 story days per iteration**

---

## Iteration Journals

1. [Iteration 1](./iteration_1.md)
2. [Iteration 2](./iteration_2.md)
