# User story title: Create user account

## Priority: 10 (planned for iteration-1)

## Estimation: 2 days
Planning poker estimates:
- Leonard: 2 days
- Joyal: 1.5 days
- Alan: 2 days
- Will: 1.5 days
- Joe: 2 days

Final estimate agreed: 2 days

## Assumptions (if any)

## Precondition

- The user provides a valid email address.
- Basic validation (email format, password length, password confirmation) is required.
- No external authentication (e.g. Google, Facebook) in this iteration.
- Social media login buttons are displayed but not functionally implemented in iteration-1.

## Description
As a **user**, I want to **create an account** so that **my personal information is saved and I can place orders**.

### Description – version 1
The system provides a registration form where users can enter their full name, email address, password, and confirm their password.

### Description – version 2
The registration process includes basic validation (email format, password confirmation). 
If the input is valid, the user data is stored securely in the system database. 
If the input is invalid, an error message is displayed.

## Tasks (see chapter 4)

1. Design registration form UI – 0.5 days  
2. Implement input validation (including password confirmation) – 0.5 days  
3. Store user data securely in database – 0.5 days  
4. Display validation error messages – 0.25 days  
5. Test registration workflow – 0.25 days  

## UI Design

The registration screen includes:

- Headline: "Create an account"
- Input fields:
  - Full name
  - Email address
  - Password
  - Confirm Password
- Button: "Sign up"
- Link: "login" (for existing users)
- Social media icons (Facebook, Twitter, Instagram) – UI only
- Error messages shown for invalid input

The left side of the screen contains marketing text:
- "Your food delivered fast"
- Short description of the service

### Mockup
![US01 - Create account mockup](../images/us01_create_account_mockup.jpg)

## Completed
- Not started