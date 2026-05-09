# Final Capstone Project For MS CS

# CineVerse – Movie Ticket Booking System

## Project Overview

CineVerse is a full-stack movie ticket booking web application inspired by the BookMyShow platform. The application allows users to browse movies, view theatres and show timings, select seats, book tickets, make online payments, and receive booking confirmation emails.

The project is developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) and includes secure authentication, role-based access control, payment gateway integration, real-time notifications, caching, and performance optimization techniques.

---

## Features

### User Features
- User Registration & Login
- JWT Authentication
- Forgot Password & Reset Password
- Browse Movies
- Search Movies
- Featured Movies
- Trending Movies
- Recently Viewed Movies
- Seat Selection & Ticket Booking
- Stripe Payment Integration
- Booking History
- Booking Confirmation Email

### Admin Features
- Add / Update / Delete Movies
- Manage Featured Movies
- Approve / Reject Theatres
- View All Bookings
- Real-Time Booking Notifications using Socket.IO

### Partner Features
- Add Theatres
- View Theatre Approval Status
- Add & Manage Shows
- View Theatre Bookings

---

## Tech Stack

### Frontend
- React.js
- Ant Design
- Axios
- React Router DOM
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO

### Authentication & Security
- JWT Authentication
- bcrypt Password Hashing
- Helmet
- express-rate-limit
- express-mongo-sanitize

### Payment Integration
- Stripe Payment Gateway

### Email Services
- Nodemailer
- SendGrid

### Deployment
- AWS EC2
- Nginx
- PM2

---

## Folder Structure

```bash
MSCS-bookmyshow-project/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   ├── package.json
│
├── README.md
```

##  Author

**Gopinath Dhara**  
Assistant Consultant at TCS
