---
title: Agile Process
nav_order: 8
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

```
Story days remaining
15 |  *
   |
13 |  .  *
   |
 7 |        *
   |
 3 |              *
   |
 0 |                    *
   +----+----+----+----+----
     4w   3w   2w   1w   0w
     left left left left left

* = actual remaining work
```

| Checkpoint | Days Remaining |
|------------|---------------|
| 4 weeks left | 13 days |
| 2 weeks left | 7 days |
| 1 week left | 3 days |
| 0 weeks left | 0 days |

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

```
Story days remaining
15 |  *  *  *  *
   |              (in progress)
 0 |
   +----+----+----+----+----
     4w   3w   2w   1w   0w
     left left left left left
```

| Checkpoint | Days Remaining |
|------------|---------------|
| 4 weeks left | 15 days |
| 2 weeks left | 15 days |
| 1 week left | TBD |
| 0 weeks left | TBD |

*Burn-down to be updated as stories are completed before the 10 April deadline.*

### Current Status (as of 3 Apr 2026)

All 8 stories are in active development. The iteration closes 10 Apr 2026.

---

## Velocity Summary

| Iteration | Planned (days) | Actual (days) | Velocity |
|-----------|---------------|---------------|---------|
| Iteration 1 | 13 | 13 | 13 |
| Iteration 2 | 15 | TBD | TBD |

Velocity from Iteration 1 (13 story days) was used to plan Iteration 2. A slight overcommitment (15 days planned vs 13 velocity) was made intentionally to challenge the team to improve throughput.

---

## Kanban Board

The team's Kanban board is publicly accessible and shows the current state of all user stories:

[View Project Board](https://github.com/users/leonardrein/projects/1){: .btn .btn-outline }

The board uses three columns:
- **Todo** — planned but not started
- **In Progress** — currently being implemented
- **Done** — completed and verified against acceptance criteria
