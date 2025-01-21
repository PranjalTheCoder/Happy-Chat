import mongoose from "mongoose";
import jwt from "jsonwebtoken";



const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

// connect database to express app
const connectDB = () => {
    mongoose
    .connect("mongodb://localhost:27017/HappyChat")
    .then((data) => {
        console.log(`Connected to DB : ${data.connection.host}`);
    })
    .catch((err) => {
        throw err;
    });
};

// for authentication
// login route pr jayege to hme kese pta chla jayega ki login hua ya nhi
// to uske liye hme cookies ka use krna hoga unhe save krna hota h
//  there are few methods of authentications
// jsontoken, json web token, session storage, o auth use kr skte h cookies me
// hm yha json web token ka use krege
//sendtoken funtion

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  
    return res.status(code).cookie("HappyChat-Token", token, cookieOptions).json({
      success: true,
      user,
      message,
    });
  };
// sendToken("sndjv", {_id: "sdvsv"}, 201, "User Maa Chudaye");

export { connectDB, sendToken, cookieOptions };