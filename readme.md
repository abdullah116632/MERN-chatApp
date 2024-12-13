# ChatApp

This is a real-time messaging application built using the MERN stack. It features secure user authentication, media sharing. This fully responsive application ensures smooth communication with a modern user interface.

## Features

- **Real-Time Messaging**: Communicate instantly using Socket.IO.
- **Media Sharing**: Send and receive images and videos seamlessly.
- **User Authentication**:
  - Secure Signup, Login, and Logout functionality.
  - Password reset and recovery using email verification.
- **Profile Management**: Update profile details, including profile pictures.
- **Protected APIs**: All APIs are secured using JSON Web Tokens (JWT).
- **Responsive Design**: Optimized for all device sizes with Tailwind CSS.

## Tech Stack

### Frontend
- **React**: Component-based UI framework.
- **Tailwind CSS**: Modern CSS framework for styling.
- **React Router**: Handles application routing.
- **Redux**: State management for consistent data flow.
- **Axios**: For seamless API requests.
- **Socket.IO Client**: Real-time communication with the backend.

### Backend
- **Express**: Lightweight framework for building APIs.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **JWT**: Secure token-based authentication.
- **Nodemailer**: Email functionality for password recovery.
- **Multer**: File upload management.
- **Morgan**: HTTP request logging.
- **Cloudinary**: Media storage and management.

# Install Dependencies

**For Backend** - `npm i`

**For Frontend** - `cd frontend` ` npm i`

## Env Variables

Make Sure to Create a config.env file in backend/config directory and add appropriate variables in order to use the app.

**Essential Variables**
PORT=
DB_URI =
JWT_SECRET=
JWT_EXPIRE=
COOKIE_EXPIRE=
SMPT_SERVICE =
SMPT_MAIL=
SMPT_PASSWORD=
SMPT_HOST=
SMPT_PORT=
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

_fill each filed with your info respectively_