import  jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { User } from "../models/user.js";
import { HAPPYCHAT_TOKEN } from "../constants/config.js";
import { TryCatch } from "./error.js";

const  isAuthenticated = TryCatch((req, res, next) => {
    const token = req.cookies[HAPPYCHAT_TOKEN];
    // agar cookies nhi h to token bhi nhi hai
    //iska mtlb user ka data database me nhi hai user ko login nhi kr skta 
    if(!token){
        return next(new ErrorHandler("please Login to access this route", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);
    // console.log("cookies : ", token);
    req.user = decodedData._id;

    next();
});


const adminOnly = (req, res, next) => {
    const token = req.cookies["HappyChat-Admin-Token"];
  
    if (!token)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  
    const isMatched = secretKey === adminSecretKey;
  
    if (!isMatched)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    next();
  };

  const socketAuthenticator = async (err, socket, next) => {
    try {
      if (err) return next(err);
  
      const authToken = socket.request.cookies[HAPPYCHAT_TOKEN];
  
      if (!authToken)
        return next(new ErrorHandler("Please login to access this route", 401));
  
      const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
  
      const user = await User.findById(decodedData._id);
  
      if (!user)
        return next(new ErrorHandler("Please login to access this route", 401));
  
      socket.user = user;
  
      return next();
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Please login to access this route", 401));
    }
  };

export {isAuthenticated, adminOnly, socketAuthenticator };