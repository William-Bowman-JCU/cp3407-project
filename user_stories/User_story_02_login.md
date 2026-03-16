# User story title: User login

## Priority: 9 (planned for iteration-1)
Login is required so that registered users can access their account and place orders.

## Estimation: 1 day
Planning poker estimates:
- Leonard: 1 day
- Joyal: 1 day
- Alan: 1.5 days
- Will: 2 days
- Joe: 1 day

Final estimate agreed: 1 day

## Assumptions (if any)

## Refinement

- The user already has a registered account (see "Create user account").
- Login uses email + password.
- "Remember Me" stores session information locally.
- Social media login (Facebook, Twitter, Instagram) is planned but may not be fully implemented in iteration-1.
- No multi-factor authentication in this iteration.
- Basic error handling is required (wrong password / unknown email).


## Description
As a **user**, I want to **log in** so that **I can access my account and place orders securely**.

### Description – version 1
The system provides a login form where users can enter their email and password.

### Description – version 2
The system validates the user credentials and grants access only if the credentials are correct. 
An error message is shown if the login fails. 
Users may optionally select "Remember Me" to stay logged in. 
Social media login options are displayed to allow alternative authentication methods.
## Tasks (see chapter 4)
1. Design login form UI – 0.25 days  
2. Implement credential validation (check email + password) – 0.25 days  
3. Implement error handling (invalid login) – 0.25 days  
4. Implement "Remember Me" functionality – 0.15 days  
5. Display social media login buttons – 0.10 days  
6. Test login workflow – 0.25 days  

## UI Design
- Login form with fields:
  - Email
  - Password
- Checkbox: Remember Me
- Link: Forgot Password
- Link: Create account
- Social media login buttons (Facebook, Twitter, Instagram)
- Error message shown for invalid credentials


## Mockup
![US02 - Login mockup](../images/us02_login_mockup.jpg)

## Completed
- Not started