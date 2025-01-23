import { compare } from "bcrypt";
import { User }  from "../models/user.js";
import { 
    cookieOptions, 
    sendToken 
} from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
//create a new user and save it to the database
// and save token in the cookie 



const newUser = TryCatch(async (req, res) => {
    const { name, username, password, bio } = req.body
//    console.log("hi user");
//     console.log(req.body);
    const file = req.file;
    if (!file) return next(new ErrorHandler("Please Upload Avatar"));

    const result = await uploadFilesToCloudinary([file]);

    const avatar = {
        public_id: "dsjsnv",
        url: "lsdl"
    };
    const user = await User.create({
        name,
        bio,
        username,
        password,
        avatar,
      });

    // status code 201 header me browser ko btane ke liye ki kya responce aaya
     
    // res.status(201).json({message: "User Created Successfully"});
    sendToken(res, user, 201, "User created");

});

const login = TryCatch(async (req, res, next) => {
        const { username, password } = req.body;
    // console.log(req.body);
    // password hm isliye lege kyuki hm check krege ki jo user ne password daala h 
    // aur jo hmare database me save h vo same h ya nhi
    const user = await User.findOne({ username }).select("+password");
    
    if(!user){  
        return next(new ErrorHandler("Invalid Username ", 400));
        // console.log("Invalid Username");
        // return res.status(400).json({ message: "Invalid Username"});
    }
    const isMatch = await compare(password, user.password);

// console.log("entered pass",password);
// console.log("user pass",user.password);
// console.log("username",user.username);

    // const isMatch= password===user.password;
    
    if(!isMatch){
        return next(new ErrorHandler("Invalid Password", 404))
        // console.log("Invalid Password");
        // return res.status(400).json(
        //     { message: "Invalid Password" }
        // );
    }
    sendToken(res, user, 200, `Welcome to the ${user.name}`);
    // res.send("HELLO CH*TIYO");
});

const getMyProfile = TryCatch(async (req, res) => {

    const user = await User.findById(req.user);
    res.status(200).json({
        success: true,
        user,
    });
});

const logout = TryCatch(async (req, res) => {
    return res.status(200)
    .cookie("HappyChat-Token", "", {...cookieOptions, maxAge: 0 })
    .json({
        success: true,
        message: "Logout Successfully"
    });
});

const searchUser = TryCatch(async (req, res) => {

    const { name } = req.query; 



    return res
        .status(200)
        .cookie("HappyChat-Token", "", {...cookieOptions, maxAge: 0 })
        .json({
            success: true,
            message: `Welcome to Mr. ${name}`
        });
});





export { login, newUser, getMyProfile, logout, searchUser };