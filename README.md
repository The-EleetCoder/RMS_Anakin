# Railway Management System - Anakin

This project is a railway management system similar to IRCTC, where users can check train availability, book seats, and manage bookings. It provides APIs for user registration, authentication, train management, seat availability, and booking operations.

## Features

- **User Registration and Authentication**: Users can sign up for an account and log in to access the system.
- **Train Management**: Admin users can add new trains and update existing train information.
- **Seat Availability**: Users can check the availability of seats between two stations.
- **Seat Booking**: Users can book seats on available trains.
- **Booking Details**: Users can view details of their bookings.

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Sequelize**: Promise-based ORM for Node.js, used for database operations.
- **MySQL**: Relational database management system.
- **JWT (JSON Web Tokens)**: Authentication mechanism for securing API endpoints.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone git@github.com:The-EleetCoder/RMS_Anakin.git

2. **Install dependencies:**:

   ```bash
   cd railway-management-system
   npm install

3. **Create tables in database**:
   
    Just uncomment this line -> ```await sequelize.sync({ force: true });```-> in the db.js file, inside the config folder and comment it after running the code once.

4. **Start the server**:

   ```bash
    npm start
## Database Schema
 ![image](https://github.com/The-EleetCoder/RMS_Anakin/assets/87275213/ee1014de-5d0c-4213-b81f-af5992999cc7)

## Testing 
I have attached a postman collection file named ```rms_anakin.postman_collection```. Import this file in postman for testing all the API endpoin

## GitHub Repo Link: 
```https://github.com/The-EleetCoder/RMS_Anakin```
