# User story title: Search restaurants

## Priority: 6 (planned for iteration-2)

Searching restaurants is useful so users can quickly find a specific restaurant.

## Estimation: 1 day
Planning poker estimates:
- Leonard: 1 day
- Joyal: 1 day
- Alan: 1 day
- Will: 1.5 days
- Joe: 1 day

Final estimate agreed: 1 day

## Assumptions (if any)

## Precondition

- The user is logged in.
- Restaurant names are stored in the database.
- The search is text-based.
- Only basic search functionality is implemented in iteration-2.

## Description
As a **user**, I want to **search for restaurants by name** so that **I can quickly find the restaurant I want**.

### Description – version 1
The system provides a search bar where users can enter a restaurant name.

### Description – version 2
The system filters restaurant results dynamically based on the search query.

## Tasks (see chapter 4)
1. Design search bar UI – 0.25 days  
2. Implement search functionality – 0.25 days  
3. Connect search with restaurant database – 0.25 days  
4. Test search functionality – 0.25 days  

## UI Design
- Search bar at the top of the restaurant list
- Loading ui status
- Filtered results displayed dynamically
- Empty status with appropriate text placement if the search resulted with no results
- Results are shown in cards with restaurant image and detials all aligned nicely
- Restaurent Cards Include:
    - Restaurent Name
    - Address

### Mockup
![US11 - Search restaurant mockup](../images/us11_search_restaurants.jpg)

## Status: Deferred (Iteration 2)

- Search bar UI is present on the browse page (`/browse`)
- Text-based filtering was not completed in Iteration 2 — the input is a visual placeholder only
- Acceptance criteria not fully met:
  - [ ] User can search for a restaurant by name
  - [ ] Results are filtered dynamically based on input
  - [ ] Empty search results show appropriate feedback text
- Deferred to a future iteration; to be prioritised above US-15 (priority 6 vs 4)