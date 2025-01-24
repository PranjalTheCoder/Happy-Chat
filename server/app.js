import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
// import { createUser } from "./seeders/user.js";
// import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";


dotenv.config({
    path: "./.env",
});
  

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "PranjalTheCoder";

connectDB(mongoURI);
// createUser(10);
//create 10 sample users from faker

//temporary create single chat from seeders chat.js
// createSingleChats(10);
// // temp create group chat from seeders using faker
// createGroupChats(10);
// createMessagesInAChat("679169ffbcdaaae5d3857c10", 50);





const app = express();


//using middleware here
app.use(express.json());
// app.use(express.urlencoded());//json data ko use krne ke liye
//multer ka use krege
app.use(cookieParser());



app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
    console.log("Welcome to Home Page");
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is Listing on the Port ${port}`);
});

export { adminSecretKey, envMode };