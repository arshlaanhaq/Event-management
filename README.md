# Event Management Platform

## Overview
The Event Management Platform is a full-stack web application that allows users to create, manage, and view events. It includes user authentication and real-time updates using WebSockets.

## Features
- User Authentication (Signup/Login)
- Create, Read, Update, Delete (CRUD) functionality for events
- Real-time updates using WebSockets (Socket.IO)
- Category field for event classification
- Responsive UI with React.js
- Secure backend with Node.js and Express.js
- Database integration with MongoDB Atlas 

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (or Planetscale for SQL)
- **Real-time Communication:** Socket.IO
- **Deployment:** Netlify (Frontend), Render (Backend)

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB Atlas database setup

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/arshlaanhaq/Event-management.git
   cd event-management-platform
   ```
2. Install dependencies:
   ```bash
   npm install
   
   ```
3. Set up environment variables (`.env` file):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. Navigate to the frontend directory and start the frontend:
   ```bash
   cd client
   npm start
   ```

## API Endpoints
| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| POST   | /api/auth/register | User registration  |
| POST   | /api/auth/login    | User login        |
| GET    | /api/events        | Get all events    |
| POST   | /api/events        | Create an event   |
| PUT    | /api/events/:id    | Update an event   |
| DELETE | /api/events/:id    | Delete an event   |

## Future Enhancements
- **Image Hosting** (Cloudinary or alternative)
- **Event Booking & RSVP system**
- **Payment Integration for ticketed events**

## Contribution
Feel free to fork the repo, create a branch, and submit a PR!

## License
This project is licensed under the MIT License.
