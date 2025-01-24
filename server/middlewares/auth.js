import  jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

const  isAuthenticated = (req, res, next) => {
    const token = req.cookies["HappyChat-Token"];
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
};


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

export {isAuthenticated, adminOnly};