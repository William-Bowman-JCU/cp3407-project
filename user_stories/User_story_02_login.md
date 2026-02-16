# User story title: User login

Keep any other version here as well, e.g. Secure login, Authenticate user.

## Priority: Must-have (Iteration 1)
Users must be able to log in to access their account and place orders.

## Estimation: 1 day
Planning poker estimates:
- Alice: 1 day
- Bob: 1 day
- Charlie: 1.5 days

Final estimate agreed: 1 day

## Assumptions (if any)
- The user already has a registered account.
- Login is done using email and password.
- Passwords are stored securely (hashing handled by the system).
- No multi-factor authentication in this iteration.

## Description
As a **user**, I want to **log in securely** so that **my account is protected and only accessible to me**.

### Description – version 1
The system provides a login form where users can enter their email address and password.

### Description – version 2
The system validates the login credentials and grants access only if the credentials are correct.

## Tasks (see chapter 4)
1. Design login form UI – 0.25 days  
2. Implement credential validation – 0.25 days  
3. Handle login errors (wrong password, unknown user) – 0.25 days  
4. Test login functionality – 0.25 days  

## UI Design
- Login form with fields:
  - Email
  - Password
- Error message shown for invalid credentials

(Mockup to be added later)

## Completed
- Not started