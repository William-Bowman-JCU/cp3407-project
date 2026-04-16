# Actual iteration-1 board (see chapters 3 and 4)

Start date: 17 Feb 2026  
End date: 14 Mar 2026

Checklist: 
1. github entry timestamps
2. User stories are correct: see p39

* Assumed Velocity: N/A (first iteration)
* Number of developers: 4
* Total estimated amount of work: 13 days

User stories or tasks (see chapter 4):

* [Create account](./user_stories/User_story_01_create_account.md), priority 10, 2 days
* [Login](./user_stories/User_story_02_login.md), priority 9, 1 day
* [Browse Food](./user_stories/User_story_03_browse_food.md), priority 8, 2 days
* [View Menu](./user_stories/User_story_04_view_menu.md), priority 8, 2 days
* [Shopping Cart](./user_stories/User_story_05_shopping_cart.md), priority 7, 2 days
* [Checkout](./user_stories/User_story_06_checkout.md), priority 6, 2 days
* [Track Order](./user_stories/User_story_07_track_order.md), priority 5, 2 days

In progress:
* None

Completed:
* Create account – completed
* Login – completed
* Browse Food – completed
* View Menu – completed
* Shopping Cart – completed
* Checkout – completed
* Track Order – completed

### Burn Down for iteration-1 (see chapter 4):

* 4 weeks left, 13 days of estimated amount of work  
* 2 weeks left, 7 days  
* 1 week left, 3 days  
* 0 weeks left, 0 days  

* Actual Velocity: 13 story days

### Client Demo — 14 Mar 2026

**Attendees:** Full team (4 developers) + course instructor (Dr. Konovalov) + 2 external student testers

**Format:** Live walkthrough of the deployed application at https://main.d29mzie0h3ms32.amplifyapp.com

**Demonstrated features:**
- User registration and login (US-01, US-02)
- Browse food categories (US-03)
- View restaurant menu and add items (US-04)
- Shopping cart with quantity adjustment (US-05)
- Multi-step checkout with payment (US-06)
- Order tracking status stepper (US-07)

**Feedback received:**

| # | Feedback | Priority | Action |
|---|----------|----------|--------|
| 1 | "Users need to select a delivery address *before* browsing — the checkout currently asks for an address too late in the flow." | High | Added as US-09 (Select Delivery Location, priority 10) in Iteration 2 |
| 2 | "The order tracking stepper is clear and well-designed — this is a strong feature." | Positive | No change needed |
| 3 | "Registration form should provide inline validation feedback rather than a generic error." | Medium | Noted; addressed in Iteration 2 styling fixes |
| 4 | "Would like to see the ability to browse and compare multiple restaurants." | Medium | Captured as US-10/US-14 in Iteration 2 |
| 5 | "Cart item count should be visible in the navbar at all times." | Low | Addressed in Iteration 2 via CartContext badge |

**Overall assessment from instructor:** Core ordering workflow is functional and deployed. Key gap identified: delivery location must be part of the pre-checkout flow. Team demonstrated good prioritisation discipline.

**Changes applied to Iteration 2 planning:**
- US-09 (Select Delivery Location) elevated to priority 10 — highest in Iteration 2 backlog
- US-10 (Select Restaurant) added at priority 9 to address restaurant discovery gap
- Inline form validation improvements noted for implementation
    