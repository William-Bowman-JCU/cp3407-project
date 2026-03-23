# User story title: Select delivery location

## Priority: 10 (planned for iteration-2)

Selecting a delivery location is essential so users can see restaurants that deliver to their area.

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
- The user can manually enter a delivery address (street, city, postcode).
- The system stores the selected delivery location in the current session.
- A basic map preview is displayed (no interactive map functionality required).
- "Use my current location" is available as an alternative but may not be fully implemented (UI only).

## Description
As a **user**, I want to **enter my delivery location** so that **the system can show restaurants available near me**.

### Description – version 1
The system displays a page where the user can enter their delivery address.

### Description – version 2
The user enters their street address, city, and postcode and confirms the location.  
The system saves the delivery location and uses it to filter available restaurants.  
A map preview is displayed to provide visual context of the selected location.  
Users may optionally choose "Use my current location" as a shortcut.

## Tasks (see chapter 4)
1. Design delivery location input UI (address fields + layout) – 0.5 days  
2. Implement input fields (street, city, postcode) – 0.5 days  
3. Implement "Confirm Location" button functionality – 0.25 days  
4. Store delivery location in session – 0.25 days  
5. Display map preview – 0.25 days  
6. Add "Use my current location" option (UI) – 0.25 days  

## UI Design
- Page title: "Select Delivery Location"
- Description text: "Enter your delivery address to find restaurants near you"
- Input fields:
  - Street Address
  - City
  - Postcode
- Primary button: "Confirm Location"
- Secondary option: "Use my current location"
- Map preview displayed below the input section
- Clean and simple layout with clear grouping of inputs and actions

### Mockup
![US09 - Select delivery location mockup](../images/us09_delivery_location_mockup.jpg)

## Completed
- Not started