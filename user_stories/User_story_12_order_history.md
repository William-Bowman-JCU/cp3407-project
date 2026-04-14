# User story title: Order history

## Priority: 8 (planned for iteration-2)

Viewing order history is useful so users can review their previous orders.

## Estimation: 2 days
Planning poker estimates:
- Leonard: 2 days
- Joyal: 1.5 days
- Alan: 2 days
- Will: 2 days
- Joe: 1.5 days

Final estimate agreed: 2 days

## Assumptions (if any)

## Precondition

- The user is logged in.
- The user has previously placed at least one order.
- Order data (date, items, total price) is stored in the database.
- Only basic order history functionality is implemented in iteration-2.

## Description
As a **user**, I want to **view my previous orders** so that **I can review what I ordered before**.

### Description – version 1
The system displays a list of previous orders made by the user.

### Description – version 2
Each order shows the order date, restaurant name, ordered items, and total price.

## Tasks (see chapter 4)
1. Design order history UI layout – 0.5 days  
2. Retrieve user orders from database – 0.5 days  
3. Display order list dynamically – 0.5 days  
4. Implement navigation to order details – 0.5 days  

## UI Design
- Page title: "Order History"
- List of previous orders shown in cards
- Order cards including:
  - Order date
  - Restaurant name
  - Total price
- Loading status
- Empty status with appropriate text placement if the search resulted with no results


### Mockup
![US12 - Order history mockup](../images/us12_order_history.jpg)

## Completed
- Feature implemented in iteration 2
- Frontend: `/orders` page fetches and displays all previous orders via `GET /api/orders/`
- Order cards show restaurant name, ordered items with quantities, status badge (colour-coded), delivery fee, total, and formatted date
- Loading and empty states handled; unauthenticated users redirected to login
- Acceptance criteria met:
  - [x] User can view a list of all previous orders
  - [x] Each order shows date, items, and total price
  - [x] Order status is clearly displayed with colour coding
  - [x] Empty state shown when no orders exist
- Deployed at: https://main.d29mzie0h3ms32.amplifyapp.com/orders