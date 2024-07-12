import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import sanitize from "express-mongo-sanitize"
import xss from "xss-clean";

import connectToMongoDB from "./db/connectToMongoDB.js";
import globalErrorHandler from "./controllers/errorController.js";
import { app, server } from "./socket/socket.js";
import customError from "./utils/customErrorClass.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRouts.js"
import goupMessageRoutes from "./routes/groupMessageRoues.js";
import morgan from "morgan";
import logger from "./utils/logger.js";


dotenv.config()

let limiter = rateLimit({
  max: 100,
  windowMs: 20 * 60 * 1000,
  message: "We have receive too many request from this IP . Please try after one hour",
  headers: true,
  skipFailedRequests: true 
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   credentials: true,
// }));

app.use(helmet());
app.use(cors(corsOptions));
app.use("/api/auth", limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sanitize());
app.use(xss());

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) }}));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/messages/group", goupMessageRoutes)
app.use("/api/users", userRoutes)


app.all("*", (req, res, next) => {
  const err = new customError(404, `Cant find the url ${req.originalUrl} on the server`)
  next(err)
})

app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    connectToMongoDB()
    console.log(`Server is running to port ${PORT}`)
})