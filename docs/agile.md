---
title: Agile Process
nav_order: 9
---

# Agile Process
{: .no_toc }

FeedMe was developed using an **agile, iterative approach** based on XP (Extreme Programming) principles. This page documents the planning, execution, and retrospective for each iteration.

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Agile Approach

The team followed the iterative development model from the course textbook, applying the following XP practices:

| Practice | How Applied |
|----------|------------|
| **User stories** | All requirements captured as user stories with acceptance criteria |
| **Planning Poker** | Team estimated each story independently, then discussed disagreements |
| **Velocity tracking** | Measured story days completed per iteration; used to plan next iteration |
| **Burn-down charts** | Updated weekly to track remaining work vs time |
| **Iterative delivery** | Working software delivered at the end of each iteration |
| **Retrospectives** | Lessons learned documented after each iteration |
| **Prioritised backlog** | Stories ordered by business value; highest-value items implemented first |

---

## Pre-Iteration Planning

Before any coding began, the team created the full product backlog by:

1. **Identifying features** — brainstorming all possible user-facing features for a food delivery app
2. **Writing user stories** — each feature captured as "As a user, I want X, so that Y"
3. **Estimating with Planning Poker** — each story estimated in story days by all team members
4. **Prioritising by value** — stories ordered 1–10 based on business value and dependency

The backlog contained **15 user stories** — deliberately more than could fit into two iterations. This forced the team to make real prioritisation decisions rather than implementing everything.

**Key prioritisation decisions:**
- Stories forming the core ordering flow (account, browse, cart, checkout) received priority 7–10 and were scheduled in Iteration 1
- Discovery and enhancement features (restaurant search, filtering, order history) were deferred to Iteration 2
- Low-value features (US-15: Filter Restaurants, priority 4) were placed last in the backlog

---

## Iteration 1

### Plan

**Duration:** 17 Feb 2026 – 14 Mar 2026 (4 weeks)
**Developers:** 4
**Assumed velocity:** N/A (first iteration)
**Budgeted work:** 13 story days

**Goal:** Deliver the complete core ordering workflow — from account creation through to order tracking.

| Story | Priority | Estimate | Justification for inclusion |
|-------|----------|----------|----------------------------|
| Create Account | 10 | 2 days | Foundation — nothing else works without it |
| Login | 9 | 1 day | Must follow account creation immediately |
| Browse Food | 8 | 2 days | Entry point to the ordering flow |
| View Menu | 8 | 2 days | Required to select items |
| Shopping Cart | 7 | 2 days | Required to accumulate items before checkout |
| Checkout | 6 | 2 days | Core revenue action |
| Track Order | 5 | 2 days | Post-order experience, closes the loop |

**Total: 13 story days** — matched to a conservative first-iteration budget.

*Account Settings (priority 4 at the time) was excluded because it provides no value without the core flow being in place first.*

### Burn-Down Chart

![Iteration 1 Burndown Chart](https://quickchart.io/chart?w=600&h=300&c=%7B%22type%22%3A%20%22line%22%2C%20%22data%22%3A%20%7B%22labels%22%3A%20%5B%22Sprint%20Start%22%2C%20%22Week%202%22%2C%20%22Week%203%22%2C%20%22Sprint%20End%22%5D%2C%20%22datasets%22%3A%20%5B%7B%22label%22%3A%20%22Actual%22%2C%20%22data%22%3A%20%5B13%2C%207%2C%203%2C%200%5D%2C%20%22fill%22%3A%20false%2C%20%22borderColor%22%3A%20%22rgb%28220%2C38%2C38%29%22%2C%20%22backgroundColor%22%3A%20%22rgb%28220%2C38%2C38%29%22%2C%20%22tension%22%3A%200.1%7D%2C%20%7B%22label%22%3A%20%22Ideal%22%2C%20%22data%22%3A%20%5B13%2C%206.5%2C%203.25%2C%200%5D%2C%20%22fill%22%3A%20false%2C%20%22borderColor%22%3A%20%22rgb%28156%2C163%2C175%29%22%2C%20%22borderDash%22%3A%20%5B6%2C%204%5D%2C%20%22tension%22%3A%200%7D%5D%7D%2C%20%22options%22%3A%20%7B%22title%22%3A%20%7B%22display%22%3A%20true%2C%20%22text%22%3A%20%22Iteration%201%20%E2%80%94%20Burndown%20Chart%22%7D%2C%20%22scales%22%3A%20%7B%22yAxes%22%3A%20%5B%7B%22ticks%22%3A%20%7B%22beginAtZero%22%3A%20true%2C%20%22suggestedMax%22%3A%2015%7D%2C%20%22scaleLabel%22%3A%20%7B%22display%22%3A%20true%2C%20%22labelString%22%3A%20%22Story%20Days%20Remaining%22%7D%7D%5D%2C%20%22xAxes%22%3A%20%5B%7B%22scaleLabel%22%3A%20%7B%22display%22%3A%20true%2C%20%22labelString%22%3A%20%22Week%22%7D%7D%5D%7D%7D%7D)

| Checkpoint | Days Remaining |
|------------|---------------|
| Sprint Start (4 weeks left) | 13 days |
| Week 2 (2 weeks left) | 7 days |
| Week 3 (1 week left) | 3 days |
| Sprint End | 0 days |

### Results

**All 7 stories completed.** Actual velocity: **13 story days**.

| Story | Estimate | Actual | Status |
|-------|----------|--------|--------|
| Create Account | 2 days | 2 days | Done |
| Login | 1 day | 1 day | Done |
| Browse Food | 2 days | 2 days | Done |
| View Menu | 2 days | 2 days | Done |
| Shopping Cart | 2 days | 2 days | Done |
| Checkout | 2 days | 2 days | Done |
| Track Order | 2 days | 2 days | Done |
| **Total** | **13** | **13** | **All done** |

### Retrospective

**What went well:**
- Prioritised backlog kept the team focused on core functionality — at no point did the team work on low-priority features while high-priority ones remained incomplete
- UI mockups created during planning significantly reduced ambiguity during implementation — developers knew exactly what to build
- The core ordering flow (account → browse → cart → checkout → track) was delivered end-to-end, providing a demonstrable product

**What could be improved:**
- Domain gaps were discovered mid-iteration: the UX flow of selecting a delivery address *before* browsing restaurants was not captured in the original backlog. This was added to Iteration 2 as **US-09 (Select Delivery Location)** with priority 10.
- Breaking user stories into individual tasks earlier would have helped with daily progress tracking.

**Lessons applied to Iteration 2:**
- US-09 added with highest priority to address the discovery gap
- User stories in Iteration 2 include more detailed acceptance criteria to reduce mid-sprint surprises

### Client Demo & Feedback

**Date:** 14 March 2026 (end of Iteration 1)
**Attendees:** Full team + course instructor + 2 external student testers
**Environment:** Live deployment at https://main.d29mzie0h3ms32.amplifyapp.com

The team demonstrated the complete core ordering flow — from account registration through to order tracking — on the deployed production environment.

**Feedback summary:**

| Feedback item | Source | Outcome |
|---------------|--------|---------|
| Delivery address selection happens too late — users should choose their address *before* browsing restaurants | Instructor | Added as US-09 (priority 10) in Iteration 2 |
| Order tracking stepper is clear and well-designed | External tester | No change — confirmed working as intended |
| Cart item count should be visible in the navbar at all times | External tester | Implemented in Iteration 2 via CartContext badge |
| Would like to compare multiple restaurants before ordering | External tester | Captured as US-10 / US-14 in Iteration 2 |
| Registration form should provide inline validation, not just a generic error | External tester | Addressed during Iteration 2 styling improvements |

**Key outcome:** The instructor confirmed that the core ordering workflow was functional and deployed. The most significant gap — missing delivery location selection — was prioritised as the highest-value story (priority 10) for Iteration 2, directly reflecting the agile principle of responding to feedback.

---

## Iteration 2

### Plan

**Duration:** 17 Mar 2026 – 10 Apr 2026 (4 weeks)
**Developers:** 4
**Assumed velocity FROM Iteration 1:** 13 story days
**Budgeted work:** 15 story days

> **Note:** 15 days budgeted vs velocity of 13 represents a deliberate stretch goal. The team acknowledged this risk in planning ("Not enough time/developers" noted in README) and will use the retrospective to assess actual capacity.

**Goal:** Improve realism and usability of the ordering process with location selection, restaurant discovery, and account management.

| # | Story | Priority | Estimate | Justification |
|---|-------|----------|----------|---------------|
| 09 | Select Delivery Location | 10 | 2 days | Domain gap from Iteration 1; required before restaurant browsing |
| 10 | Select Restaurant | 9 | 2 days | Core discovery feature; completes the browse flow |
| 12 | Order History | 8 | 2 days | High value for returning users; drives reorder |
| 08 | Account Settings | 7 | 2 days | Deferred from Iteration 1; required for full account management |
| 11 | Search Restaurants | 6 | 1 day | Improves discovery; relatively quick to implement |
| 14 | Restaurant Details | 6 | 2 days | Context for restaurant selection decisions |
| 13 | Reorder Previous Order | 5 | 2 days | Convenience feature; depends on Order History (US-12) |
| 15 | Filter Restaurants | 4 | 2 days | Enhancement; lowest priority in backlog |

**Total: 15 story days**

### Burn-Down Chart

![Iteration 2 Burndown Chart](https://quickchart.io/chart?w=600&h=300&c=%7B%22type%22%3A%20%22line%22%2C%20%22data%22%3A%20%7B%22labels%22%3A%20%5B%22Sprint%20Start%22%2C%20%22Week%202%22%2C%20%22Week%203%22%2C%20%22Sprint%20End%22%5D%2C%20%22datasets%22%3A%20%5B%7B%22label%22%3A%20%22Actual%22%2C%20%22data%22%3A%20%5B15%2C%2010%2C%204%2C%200%5D%2C%20%22fill%22%3A%20false%2C%20%22borderColor%22%3A%20%22rgb%28220%2C38%2C38%29%22%2C%20%22backgroundColor%22%3A%20%22rgb%28220%2C38%2C38%29%22%2C%20%22tension%22%3A%200.1%7D%2C%20%7B%22label%22%3A%20%22Ideal%22%2C%20%22data%22%3A%20%5B15%2C%207.5%2C%203.75%2C%200%5D%2C%20%22fill%22%3A%20false%2C%20%22borderColor%22%3A%20%22rgb%28156%2C163%2C175%29%22%2C%20%22borderDash%22%3A%20%5B6%2C%204%5D%2C%20%22tension%22%3A%200%7D%5D%7D%2C%20%22options%22%3A%20%7B%22title%22%3A%20%7B%22display%22%3A%20true%2C%20%22text%22%3A%20%22Iteration%202%20%E2%80%94%20Burndown%20Chart%22%7D%2C%20%22scales%22%3A%20%7B%22yAxes%22%3A%20%5B%7B%22ticks%22%3A%20%7B%22beginAtZero%22%3A%20true%2C%20%22suggestedMax%22%3A%2016%7D%2C%20%22scaleLabel%22%3A%20%7B%22display%22%3A%20true%2C%20%22labelString%22%3A%20%22Story%20Days%20Remaining%22%7D%7D%5D%2C%20%22xAxes%22%3A%20%5B%7B%22scaleLabel%22%3A%20%7B%22display%22%3A%20true%2C%20%22labelString%22%3A%20%22Week%22%7D%7D%5D%7D%7D%7D)

| Checkpoint | Days Remaining |
|------------|---------------|
| Sprint Start (4 weeks left) | 15 days |
| Week 2 (2 weeks left) | 10 days |
| Week 3 (1 week left) | 4 days |
| Sprint End | 0 days |

### Results

**7 of 8 stories completed.** Filter Restaurants (US-15, priority 4) was deferred — the lowest-priority story in the backlog and the correct agile decision when capacity runs out. Actual velocity: **13 story days**.

| Story | Estimate | Status |
|-------|----------|--------|
| Select Delivery Location | 2 days | ✅ Done |
| Select Restaurant | 2 days | ✅ Done |
| Order History | 2 days | ✅ Done |
| Account Settings | 2 days | ✅ Done |
| Search Restaurants | 1 day | ✅ Done |
| Restaurant Details | 2 days | ✅ Done |
| Reorder Previous Order | 2 days | ✅ Done |
| Filter Restaurants | 2 days | ⏭ Deferred (lowest priority) |
| **Total** | **15** | **13 delivered** |

### Retrospective

**What went well:**
- Highest-priority stories (US-09 Delivery Location, US-10 Select Restaurant) were delivered first, ensuring the most valuable features reached users
- Backend REST API endpoints were completed early, enabling parallel frontend development
- Deployment to AWS Amplify remained stable throughout the iteration, allowing continuous testing against the live environment

**What could be improved:**
- The team slightly overcommitted (15 days planned vs 13-day velocity). Future iterations should plan to velocity rather than above it
- Earlier communication about blocked items would have reduced last-minute integration effort

**Lessons applied:**
- Deferring US-15 was the correct agile call — delivering 7 working, tested features beats delivering 8 partially-finished ones

### Client Demo & Feedback

**Date:** 11 April 2026 (end of Iteration 2)
**Attendees:** Full team + course instructor + 3 external student testers
**Environment:** Live deployment at https://main.d29mzie0h3ms32.amplifyapp.com

The team demonstrated the full application, covering all 14 implemented user stories. The demo highlighted improvements made directly in response to Iteration 1 feedback.

**Feedback summary:**

| Feedback item | Source | Outcome |
|---------------|--------|---------|
| Delivery location step now flows naturally before restaurant browsing — much improved UX | Instructor | Confirmed: Iteration 1 feedback addressed correctly |
| Restaurant search works well; filtering by cuisine or rating is still missing | External tester | US-15 already in backlog; deferred at priority 4 — correct agile decision |
| Order history is clean; colour-coded statuses are intuitive | External tester | No change needed |
| Reorder feature is a strong convenience addition | External tester | No change needed |
| Cart persists correctly across page navigation | Instructor | localStorage architecture validated for project scope |
| Registration and login forms have improved accessibility compared to Iteration 1 | External tester | Confirms styling improvements were valuable |

**Key outcome:** The instructor noted a significant improvement over Iteration 1 and confirmed that the application now covers the complete user journey. The deferral of US-15 (Filter Restaurants) was explicitly accepted as a justified agile decision given the consistent velocity of 13 story days. No new user stories were identified — the backlog is complete for the project scope.

**Traceability — Iteration 1 feedback → Iteration 2 delivery:**

| Iteration 1 Feedback | US Implemented in Iteration 2 | Status |
|----------------------|-------------------------------|--------|
| Add delivery address selection before browsing | US-09 Select Delivery Location (priority 10) | ✅ Done |
| Add restaurant selection and comparison | US-10 Select Restaurant (priority 9), US-14 Restaurant Details (priority 6) | ✅ Done |
| Show cart item count in navbar | CartContext badge (part of US-05 / US-10 refinement) | ✅ Done |
| Improve registration form validation | Inline validation added in login/register pages | ✅ Done |

---

## Velocity Summary

| Iteration | Planned (days) | Actual (days) | Velocity |
|-----------|---------------|---------------|---------|
| Iteration 1 | 13 | 13 | 13 |
| Iteration 2 | 15 | 13 | 13 |

Velocity remained stable at 13 story days across both iterations, confirming the team's consistent throughput. The slight overcommitment in Iteration 2 (15 planned vs 13 velocity) was a deliberate stretch goal acknowledged during planning.

---

## Kanban Board

The team's Kanban board is publicly accessible and shows the current state of all user stories:

[View Project Board](https://github.com/users/leonardrein/projects/1){: .btn .btn-outline }

The board uses three columns:
- **Todo** — planned but not started
- **In Progress** — currently being implemented
- **Done** — completed and verified against acceptance criteria
