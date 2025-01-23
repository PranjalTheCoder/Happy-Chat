import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
// import { getBase64, getSockets } from "../lib/helper.js";
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



const emitEvent = (req, event, users, data) => {
  console.log("Emmiting Event", event);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

const deletFilesFromCloudinary = async (public_ids) => {
  //delete files from Cloudinary
};

export { 
  connectDB, 
  sendToken, 
  cookieOptions, 
  emitEvent, 
  deletFilesFromCloudinary,
  uploadFilesToCloudinary
};