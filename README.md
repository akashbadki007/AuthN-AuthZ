# Authentication and Authorization Module

This project provides a robust authentication and authorization module built with Node.js and Express.js. It implements user signup, login, and role-based access control using JSON Web Tokens (JWT) and bcrypt for password hashing. The module ensures secure handling of user credentials and enforces role-based restrictions for protected routes.

Features

Authentication

Signup:

Registers a new user by hashing their password before saving it to the database.

Ensures required fields are provided and validates the uniqueness of the email.

Login:

Verifies user credentials (email and password) and generates a JWT token for authenticated sessions.

Supports secure cookies to store the JWT token.

Authorization

JWT Verification:

Protects routes by verifying the authenticity of the token passed in the Authorization header.

Role-Based Access:

Restricts route access based on user roles (e.g., Admin, Student).

Technologies Used

Node.js: Runtime environment.

Express.js: Web framework.

bcrypt: Password hashing.

jsonwebtoken: Token generation and verification.

dotenv: Environment variable management.

API Endpoints

User Authentication

1. Signup

POST /signup

Request Body:

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "Student"
}

Responses:

201 Created: User registered successfully.

400 Bad Request: Missing required fields.

409 Conflict: Email already exists.

500 Internal Server Error: Error during signup.

2. Login

POST /login

Request Body:

{
  "email": "johndoe@example.com",
  "password": "password123"
}

Responses:

200 OK: User logged in successfully (JWT token included).

400 Bad Request: Missing required fields.

404 Not Found: User not found.

401 Unauthorized: Invalid credentials.

500 Internal Server Error: Error during login.

Authorization Middleware

1. Authenticate JWT

Middleware Function auth

Verifies the JWT token from the Authorization header.

Decodes user information and attaches it to req.user.

Responses:

401 Unauthorized: No token provided.

403 Forbidden: Invalid token.

2. Role-Based Access Control

isStudent: Grants access only to users with the Student role.

403 Forbidden: Access denied for non-student roles.

isAdmin: Grants access only to users with the Admin role.

403 Forbidden: Access denied for non-admin roles.

Environment Variables

Create a .env file in the project root and define the following variables:

SECRET_KEY=your_jwt_secret
NODE_ENV=development

Installation and Usage

Clone the repository:

git clone https://github.com/yourusername/authn-authz-module.git
cd authn-authz-module

Install dependencies:

npm install

Configure environment variables in .env.

Run the server:

npm start

Test the endpoints using a tool like Postman or Curl.

Folder Structure

project/
├── Models/
│   └── UserModels.js       # User schema definition
├── Controllers/
│   └── AuthController.js   # Signup, login, and authorization logic
├── Middleware/
│   └── AuthMiddleware.js   # JWT and role-based middleware
├── Routes/
│   └── AuthRoutes.js       # Authentication and authorization routes
├── .env                    # Environment variables
├── server.js               # Express server setup
├── package.json            # Dependencies and scripts

Example Usage

Protected Route Example

GET /dashboard (Protected route for students)

Middleware: auth, isStudent

Responses:

200 OK: Access granted.

403 Forbidden: Access denied for non-student roles.

const express = require('express');
const { auth, isStudent } = require('./Middleware/AuthMiddleware');
const app = express();

app.get('/dashboard', auth, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Welcome to the student dashboard!"
  });
});

Contributions

Feel free to open issues or submit pull requests for enhancements.


