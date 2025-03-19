# 💬 MERN Chat App

## 📌 Overview
**MERN-chatApp** is a **full-stack** real-time **chat application** built using the **MERN stack** (MongoDB, Express, React, Node.js). It features **real-time messaging with Socket.IO**, **Redux for state management**, and **Tailwind CSS for styling**. The application includes **advanced authentication** functionalities such as **sign-up, login, OTP-based email verification, password reset, and profile updates**. 

This project was a significant learning experience, integrating **advanced Express and Mongoose functionalities** to build a robust and scalable chat system.

## 🎯 Features
- **💬 Real-Time Chat** (via **Socket.IO**)
- **🔐 Secure Authentication**
  - Sign-up & Login
  - Email verification via OTP
  - Forgot & Reset Password
  - Profile update
- **📡 Real-Time Data Fetching** with WebSockets
- **🗄️ Backend with Express & Mongoose**
  - Optimized database structure
  - Advanced query handling
- **⚛️ State Management with Redux**
- **🔄 API Requests via Axios**
- **🎨 Responsive UI with Tailwind CSS**
- **🔒 Secure JWT-Based Authentication**
- **📂 Organized Code Structure**

## 🛠️ Technologies Used
### **Frontend**
- **React.js** (User Interface)
- **Redux** (State Management)
- **Axios** (API Requests)
- **Tailwind CSS** (Styling)

### **Backend**
- **Node.js & Express.js** (Server-side)
- **MongoDB & Mongoose** (Database)
- **Socket.IO** (Real-Time Communication)
- **JWT (JSON Web Tokens)** (Authentication)
- **Nodemailer** (Email Service)
- **Bcrypt.js** (Password Hashing)

## 🖼️ Screenshots
### 🏠 Home Page  
![Home Page Screenshot](https://res.cloudinary.com/dp0zdj77w/image/upload/v1742355520/forReadme/Screenshot_2024-12-13_194106_wwstfk.png)

### 🔑 Authentication  
![Auth Screenshot](https://res.cloudinary.com/dp0zdj77w/image/upload/v1742357624/forReadme/Screenshot_2025-03-19_101319_me1h6g.png)


## 🌐 Live Demo
🔗 [View Live Demo](https://textripple.netlify.app/)

## 📂 Folder Structure
```
MERN-chatApp/
│── client/           # React Frontend
│── server/            # Node.js & Express Backend
│── .env                # Environment variables (not included in repo)
│── package.json        # Dependencies
│── README.md           # Documentation
```

## 🔑 Environment Variables
Create a `.env` file in the **backend** folder with the following keys:

### **Backend (`/backend/.env`)**
```
PORT=your_server_port
DB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=your_jwt_expiry_time
COOKIE_EXPIRE=your_cookie_expiry_time

SMPT_SERVICE=your_smtp_service
SMPT_MAIL=your_smtp_email
SMPT_PASSWORD=your_smtp_password
SMPT_HOST=your_smtp_host
SMPT_PORT=your_smtp_port

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Make sure to replace `your_*` values with actual credentials before running the application.


### 🔑 Now replace the backend url in client code


## 🚀 How to Run Locally
0. Clone the repository:
   ```sh
   git clone https://github.com/abdullah116632/MERN-chatApp.git
   ```
### Backend
1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run server
   ```

### Frontend
1. Navigate to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
4. Open `http://localhost:3000/` in your browser.

## 🏆 Future Improvements
- 🔔 **Push Notifications for New Messages**
- 🎙️ **Voice & Video Calls Integration**

## 📜 License
This project is open-source and can be modified for learning purposes.
