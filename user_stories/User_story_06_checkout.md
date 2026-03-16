# User story title: Checkout and place order

## Priority: 6 (planned for iteration-1)

The user must be able to confirm and place the order after reviewing the shopping cart.

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

- The user has at least one item in the shopping cart.  
- Cart data is stored in the session.  
- Order data is stored in the system database after confirmation.  
- Payment details are entered manually (no external payment provider integration in iteration-1).  
- Prices are displayed in Australian Dollars (AU$).  

## Description

As a **user**, I want to **enter my delivery and payment details and place my order** so that **my selected food is processed and prepared**.

### Description – version 1

The system displays a checkout page with an order summary, delivery form, payment form, and a confirmation button.

The checkout page shows:
- Selected items  
- Quantity  
- Total price  

### Description – version 2

The system allows the user to enter delivery details and payment information before placing the order.

Delivery details include:
- Full name  
- Street address  
- City  
- Postcode  
- Phone number  

Payment details include:
- Email  
- Card number  
- Expiry date (MM/YY)  
- CVC  
- Name on card  
- Country or region  

After clicking the "Place Order" button:
- The order is stored in the database  
- An initial order status (e.g. "Placed") is created  
- A confirmation message is displayed  

## Tasks (see chapter 4)

1. Design checkout UI layout – 0.5 days  
2. Display order summary dynamically – 0.5 days  
3. Implement delivery details form – 0.4 days  
4. Implement payment details form – 0.4 days  
5. Store order data in database – 0.1 days  
6. Generate initial order status ("Placed") – 0.05 days  
7. Test checkout and order creation process – 0.05 days  

## UI Design

The checkout screen includes:

- Page title: "Checkout"  
- Order summary section:
  - Item name  
  - Quantity  
  - Total price  
- Shipping address form:
  - Full name  
  - Street address  
  - City  
  - Postcode  
  - Phone number  
- Payment section:
  - Email  
  - Card number  
  - Expiry date  
  - CVC  
  - Name on card  
  - Country or region  
- Button: "Place Order"  
- Clean and structured layout with clear confirmation visibility  

## Mockup

![US06 - Checkout mockup](../images/us06_checkout_mockup.jpg)

## Completed

- Not started