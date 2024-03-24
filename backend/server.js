import express from "express"
import dotenv from "dotenv";//its helps to access .env file data...
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";


import {app,server} from "./socket/socket.js";
//const app = express();

dotenv.config();//its used to use .env file data...
app.use(express.json())//its used to convert incoming data into json...
app.use(cookieParser());





const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("hello")
});


//authRoutes
app.use("/api/auth", authRoutes);

//messageRoutes
app.use("/api/message", messageRoutes);

//userRoutes
app.use("/api/users", userRoutes);



server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}...`);
});