
<div align="center">
  <h1>Comprehensive Project Overview</h1>
</div>

---

# Car Wash Booking system
 
## Introduction

The Car Wash Booking System is an advanced and user-friendly platform designed to streamline the process of booking car wash services. With an intuitive interface and robust backend, it offers a seamless experience for users to schedule car wash services, manage their bookings, and handle payments ammarpay efficiently.
## Project Description

The Car Wash Booking System is built to simplify the process of booking car wash services for customers and managing those bookings for administrators. The system allows users to view available slots, choose their preferred service, and book a car wash with ease. Administrators can manage the slots, track bookings, and update the service availability in real-time. The goal of this project is to enhance the user experience by providing a straightforward, fast, and responsive application that meets the needs of both users and administrators.

## Features
Features
- User Authentication: Secure login and registration for users and administrators.
- Service Management: Administrators can create, edit, and delete car wash services.
- Slot Management: Admins can manage time slots, including creating, updating, and canceling slots.
- Booking System: Users can book car wash services, view available slots, and manage their bookings.
- Service Comparison: Compare services based on various parameters like price, service level, and customer reviews to make informed decisions.
- Payment Integration: Secure payment processing with Amarpay for online transactions.
- Admin Dashboard: A comprehensive dashboard for administrators to manage bookings, slots, and services.
- Error Handling: error handling mechanisms for backend operations, ensuring a smooth user experience.
- Search, Sort, and Filter System: Advanced search, sorting, and filtering functionalities to help users find and book services quickly.
- Conditional Routing: Conditional rendering of routes based on user roles and authentication status.
- Protected Routes: Routes are protected to ensure that only authenticated users can access certain parts of the application.
- Responsive Design: Mobile-first design to ensure the system works well on all devices.


## Technology Stack

- Frontend: Vite, React, TypeScript, Shadcn, Tailwind CSS
- State Management: Redux, Redux Toolkit (RTK)
- Backend: Node.js, Express
- Database: MongoDB
- Payment Integration: Amarpay
- Authentication: JWT, bcrypt
- Routing: React Router

## Installation Guideline

Instructions on how to install, configure, and get the project running locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation Steps

1. Clone the repository:

- Frontend git clone
```bash
git clone https://github.com/ashiqee/carwash-fontend.git
cd carwash-fontend
```
- Backend git clone
```bash
git clone https://github.com/ashiqee/car-wash-backend.git
cd car-wash-backend
```
2. Install dependencies:
```bash
npm install
# or
yarn install

```


### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
    NODE_ENV = development
    PORT=5000
    DATABASE_URL = 
    BCRYPT_SALT_ROUNDS=12
    DEFAULT_PASSWORD=

    JWT_ACCESS_SECRET =
    JWT_ACCESS_EXPIRES_IN=10d
    JWT_REFRESH_SECRET =
    JWT_REFRESH_EXPIRES_IN=365d

    STORE_ID = "aamarpaytest"
    SIGNETURE_KEY = "dbb74894e82415a2f7ff0ec3a97e4183"
    PAYMENT_URL="https://sandbox.aamarpay.com/jsonpost.php"
    PAYMENT_VERIFY_URL="https://sandbox.aamarpay.com/api/v1/trxcheck/request.php"
   ```


## L2Batch-3-assignment-5
#### Submission : (Please check my submissions:)


- Frontend Live Link: [Live Website](https://carwash-as.vercel.app/)
- Backend Live Link: [Backend Link](https://car-wash-backend-v2.vercel.app/api)
- GitHub Repository URL (Frontend): https://github.com/ashiqee/carwash-fontend
- GitHub Repository URL (Backend): https://github.com/ashiqee/car-wash-backend
- Overview Video: https://drive.google.com/file/d/1qwNM9soSeZBcXQ7WLgHmqCm5wYiIBOH6/view?usp=sharing
- Credentials: 

- Admin Role
```bash
useremail: admin@programming-hero.com  
password: ph-password
```
- User Role
```bash
useremail: reviewer@carwash.com  
password: 12345678
```
