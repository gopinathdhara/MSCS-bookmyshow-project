# Bookmyshow Capstone Final Project For MS CS

##  Project Overview

This project is a full-stack web application implementing secure user
authentication similar to BookMyShow. Users can register, log in, and
access protected profile data using JWT authentication.

------------------------------------------------------------------------

##  Features

-   User Registration
-   User Login
-   JWT Authentication
-   Token Expiry Handling
-   Protected Routes
-   Logout Functionality
-   Profile Page
-   Axios API Integration
-   Ant Design UI

------------------------------------------------------------------------

##  Tech Stack

### Frontend

-   React.js
-   Ant Design
-   Axios
-   React Router

### Backend

-   Node.js
-   Express.js
-   MongoDB (Mongoose)

### Authentication

-   JWT (JSON Web Token)
-   bcrypt

------------------------------------------------------------------------

##  Folder Structure

backend/ controllers/ middlewares/ models/ routes/ utils/

frontend/ src/ api/ components/ pages/

------------------------------------------------------------------------

##  Authentication Flow

1.  User registers
2.  User logs in
3.  JWT token generated
4.  Token stored in localStorage
5.  Token sent in Authorization header
6.  Middleware verifies token
7.  Protected routes accessed

------------------------------------------------------------------------

##  Token Handling

-   Tokens expire (e.g., 1 minute for testing)
-   Axios interceptor handles 401 errors
-   Redirects user to login page if expired

------------------------------------------------------------------------

##  Logout

-   Removes token from localStorage
-   Redirects to login page

------------------------------------------------------------------------

##  API Endpoints

  Method   Endpoint              Description
  -------- --------------------- ------------------
  POST     /api/users/register   Register user
  POST     /api/users/login      Login user
  GET      /api/users/me         Get current user

------------------------------------------------------------------------

##  Installation

### Backend

cd backend\
npm install\
npm start

### Frontend

cd frontend\
npm install\
npm run dev

------------------------------------------------------------------------

##  Environment Variables

Create .env file:

JWT_SECRET=your_secret\
MONGO_URI=your_mongodb_uri

------------------------------------------------------------------------

##  Future Scope

-   Movie listing
-   Booking system
-   Payment integration
-   Admin dashboard

------------------------------------------------------------------------

##  Author

Gopinath Dhara\
Assistant Consultant at TCS
