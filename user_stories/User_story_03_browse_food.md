# User story title: Browse food categories

## Priority: 8 (planned for iteration-1)

Browsing food categories is essential so users can explore available meals after logging in.

## Estimation: 2 days
Planning poker estimates:
- Leonard: 2 days
- Joyal: 1.5 days
- Alan: 2 days
- Will: 2 days
- Joe: 1.5 days

Final estimate agreed: 2 days

## Assumptions (if any)

## Refinement

- The user is logged in.
- Food categories (e.g. Fast Food, Dinner) are stored in the database.
- Each category contains multiple food items.
- Images are stored locally or in cloud storage (e.g. AWS S3).
- Only basic category browsing is implemented in iteration-1 (no advanced filters).

## Description
As a **user**, I want to **browse food categories and meals** so that **I can explore available food options and decide what to order**.

### Description – version 1
The system displays a home page with food categories such as Fast Food and Dinner.

### Description – version 2
Each category contains multiple food items displayed as cards with image and name.  
Users can navigate between categories and view available meals.

## Tasks (see chapter 4)
1. Design home page UI layout – 0.5 days  
2. Create food category database structure – 0.5 days  
3. Retrieve and display categories dynamically – 0.5 days  
4. Implement navigation between categories – 0.5 days  

## UI Design
- Navigation bar (Menu, Features, About, News, Contact, Buy now)
- Hero section with headline and call-to-action button (e.g. "Explore now", or "Click")
- Food category sections (e.g. Fast Food, Dinner)
- Food item cards including:
  - Image
  - Food name
- Left/right navigation arrows (carousel style)

### Mockup
**Mockup v1 – Landing/Home section**
![US03 - Browse restaurants mockup v1](../images/us03_browse_restaurants_mockup_01.jpg)

**Mockup v2 – Menu/Categories section**
![US03 - Browse restaurants mockup v2](../images/us03_browse_restaurants_mockup_02.jpg)
## Completed
- Not started