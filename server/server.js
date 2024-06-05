import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRouts.js"
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

// app.get("/", (req, res)=> {
//     res.send("hellow");
// })



app.listen(PORT, ()=> {
    connectToMongoDB()
    console.log(`Server is running to port ${PORT}`)
})