# User story title: View restaurant menu

## Priority: 8 (planned for iteration-1)

The user must be able to see available pizzas and prices before placing an order.

## Estimation: 2 days

Planning poker estimates:
- Leonard: 2 days  
- Joyal: 1.5 days  
- Alan: 2 days  
- Will: 2 days
- Joe: 2 days

Final estimate agreed: 2 days

## Assumptions (if any)

- The restaurant data (pizza name and price) is stored in the system database.
- Prices are displayed in Australian Dollars (AU$).
- Each menu item has a name, price, and icon/image.
- The shopping cart icon is visible in the top-right corner.
- The "Add" button adds the item to a temporary cart (session-based).

## Description

As a **user**, I want to **view the restaurant menu** so that **I can choose food and add to my cart**.

### Description – version 1

The system displays the selected restaurant ("Townsville Pizza Co.") with a list of available pizzas and their prices.

Each pizza item shows:
- Pizza name  
- Price (AU$)  
- Icon/image  

### Description – version 2

The system retrieves menu data from the database and displays it in a structured layout.

Each pizza item includes:
- Name  
- Price  
- "Add" button to add the item to the cart  

A shopping cart icon is displayed in the top-right corner to indicate selected items.

## Tasks (see chapter 4)

1. Design restaurant menu UI – 0.5 days  
2. Create database structure for menu items – 0.5 days  
3. Fetch menu items from database – 0.5 days  
4. Implement "Add to cart" functionality (session-based) – 0.25 days  
5. Display shopping cart icon – 0.15 days  
6. Test menu display and cart interaction – 0.10 days  

## UI Design

The restaurant menu screen includes:

- Restaurant header: "Townsville Pizza Co."
- List of pizza items:
  - Pizza Margherita – AU$ 14.99  
  - Pizza Diavola – AU$ 19.99  
  - Pizza BBQ – AU$ 24.99  
- "Add" button for each pizza  
- Shopping cart icon in the top-right corner  
- Clean and structured layout with clear price visibility  

## Mockup

![US04 - View restaurant menu mockup](../images/us04_view_restaurant_menu_mockup.jpg)

## Completed

- Not started