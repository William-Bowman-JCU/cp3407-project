# User story title: Select restaurant

## Priority: 9 (planned for iteration-2)

Selecting a restaurant is essential so users can choose where they want to order food from after selecting a food category.

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
- The user has already selected a food category (e.g. Pizza).
- Multiple restaurants can exist within one category.
- Restaurant data (name, rating, delivery time) is stored in the database.

## Description
As a **user**, I want to **select a restaurant** so that **I can view its menu and order food from it**.

### Description – version 1
The system displays a list of restaurants for the selected food category.

### Description – version 2
Each restaurant is displayed as a card including name, rating, and delivery time.  
Users can click on a restaurant to open its menu.

## Tasks (see chapter 4)
1. Design restaurant list UI layout – 0.5 days  
2. Create database structure for restaurants – 0.5 days  
3. Retrieve and display restaurants dynamically – 0.5 days  
4. Implement navigation to restaurant menu – 0.5 days  

## UI Design
- Page title showing selected category (e.g. "Pizza")
- List of restaurant cards including:
  - Restaurant name
  - Rating
  - Delivery time
- Clickable restaurant card leading to the menu page

### Mockup
![US10 - Select restaurant mockup](../images/us10_select_restaurant.jpg)

## Completed
- Feature implemented in iteration 2
- Frontend: `/browse` page displays restaurant cards with category scroll bar (Pizza, Chinese, Mexican, Greek, Italian, Japanese, Thai)
- Restaurant cards are clickable and navigate to the individual restaurant menu page
- Acceptance criteria met:
  - [x] User can browse a list of restaurants
  - [x] Restaurants are displayed with name, rating, and delivery time
  - [x] Clicking a restaurant navigates to its menu
- Deployed at: https://main.d29mzie0h3ms32.amplifyapp.com/browse