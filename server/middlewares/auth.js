import  jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";



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

export {isAuthenticated};