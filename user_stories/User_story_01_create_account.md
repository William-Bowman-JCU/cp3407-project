# User story title: Create user account

Keep any other version here as well, e.g. User registration, Sign up user.

## Priority: high (Iteration 1)
This is a core functionality required for any user to use the system.

## Estimation: 2 days
Planning poker estimates:
- Alice: 2 days
- Bob: 1.5 days
- Charlie: 2 days

Final estimate agreed: 2 days

## Assumptions (if any)
- The user provides a valid email address.
- Basic validation (email format, password length) is required.
- No external authentication (e.g. Google, Facebook) in this iteration.

## Description
As a **user**, I want to **create an account** so that **my personal information is saved and I can place orders**.

### Description – version 1
The system provides a registration form where users can enter their name, email address, and password.

### Description – version 2
The registration process includes basic validation and stores the user data securely in the system database.

## Tasks (see chapter 4)
1. Design registration form UI – 0.5 days  
2. Implement input validation – 0.5 days  
3. Store user data in database – 0.5 days  
4. Test registration workflow – 0.5 days  

## UI Design
- Simple registration form with fields:
  - Name
  - Email
  - Password
- Error messages shown for invalid input

### Mockup
![US01 - Create account mockup](../images/us01_create_account_mockup.jpg)
## Completed
- Not started