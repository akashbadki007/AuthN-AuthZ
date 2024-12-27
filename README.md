# Authentication and Authorization Module

This project provides a robust authentication and authorization module built with Node.js and Express.js. It implements user signup, login, and role-based access control using JSON Web Tokens (JWT) and bcrypt for password hashing. The module ensures secure handling of user credentials and enforces role-based restrictions for protected routes.

Features:
Signup: Registers users, hashes passwords, and checks email uniqueness.
Login: Verifies credentials and generates a JWT for authenticated sessions.
JWT Verification: Protects routes by verifying tokens.
Role-Based Access: Restricts access to routes based on roles (e.g., Admin, Student).
Technologies:

Node.js, Express.js
bcrypt (password hashing)
jsonwebtoken (token generation/verification)
dotenv (environment variables)
API Endpoints:

Signup (POST /signup): Registers a new user.
Login (POST /login): Authenticates and returns a JWT.
Authorization Middleware:

auth: Verifies JWT and attaches user info.
isStudent: Restricts access to Student users.
isAdmin: Restricts access to Admin users.
