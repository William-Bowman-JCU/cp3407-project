# User story title: View shopping cart

## Priority: 7 (planned for iteration-1)

Viewing the shopping cart is essential so users can review their selected items before placing an order.

## Estimation: 2 days
Planning poker estimates:
- Leonard: 2 days
- Joyal: 1.5 days
- Alan: 2 days
- Will: 2 days
- Joe: 2 days

Final estimate agreed: 2 days

## Assumptions (if any)

## Refinement

- The user has already added at least one item to the cart.
- Cart data is stored temporarily in the session.
- Prices are displayed in Australian Dollars (AU$).
- Only basic cart functionality is implemented in iteration-1 (no discount codes or advanced pricing rules).

## Description
As a **user**, I want to **view and manage my shopping cart** so that **I can review and adjust my order before proceeding to checkout**.

### Description – version 1
The system displays a shopping cart page that lists all selected food items.

### Description – version 2
Each cart item is displayed with name, quantity, price, and subtotal.  
Users can increase or decrease the quantity, remove items, and see the total price of their order.

## Tasks (see chapter 4)
1. Design shopping cart UI layout – 0.5 days  
2. Implement session-based cart storage – 0.5 days  
3. Retrieve and display cart items dynamically – 0.5 days  
4. Implement quantity update and item removal – 0.3 days  
5. Calculate and display total price – 0.2 days  

## UI Design
- Page title: "Your Cart"
- List of cart items including:
  - Item name
  - Quantity selector (+ / -)
  - Price per item
  - Subtotal
- Display of total price at the bottom
- Button: "Checkout"
- Clean and structured layout with clear price visibility

### Mockup
![US06 - View shopping cart mockup](../images/us05_view_shopping_cart_mockup.jpg)

## Completed
- Not started