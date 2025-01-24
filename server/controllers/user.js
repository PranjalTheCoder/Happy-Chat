import { compare } from "bcrypt";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
//create a new user and save it to the database
// and save token in the cookie 



const newUser = TryCatch(async (req, res, next) => {
    const { name, username, password, bio } = req.body
//    console.log("hi user");
//     console.log(req.body);
    const file = req.file;
    if (!file) return next(new ErrorHandler("Please Upload Avatar"));

    // const result = await uploadFilesToCloudinary([file]);

    const avatar = {
        public_id: "bhh",
        url: "kbhbk"
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
  
    // Finding All my chats
    const myChats = await Chat.find({ groupChat: false, members: req.user });
  
    //  extracting All Users from my chats means friends or people I have chatted with
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);
  
    // Finding all users except me and my friends
    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });
  
    // Modifying the response
    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));
  
    return res.status(200).json({
      success: true,
      users,
    });
  });

  const sendFriendRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
  
    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });
  
    if (request) return next(new ErrorHandler("Request already sent", 400));
  
    await Request.create({
      sender: req.user,
      receiver: userId,
    });
  
    emitEvent(req, NEW_REQUEST, [userId]);
  
    return res.status(200).json({
      success: true,
      message: "Friend Request Sent",
    });
  });

  const acceptFriendRequest = TryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body;
  
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");
  
    if (!request) return next(new ErrorHandler("Request not found", 404));
  
    if (request.receiver._id.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not authorized to accept this request", 401)
      );
  
    if (!accept) {
      await request.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "Friend Request Rejected",
      });
    }
  
    const members = [request.sender._id, request.receiver._id];
  
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);
  
    emitEvent(req, REFETCH_CHATS, members);
  
    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
      senderId: request.sender._id,
    });
  });

const getMyNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});



export { 
    login, 
    newUser, 
    getMyProfile, 
    logout, 
    searchUser,
    sendFriendRequest,
    acceptFriendRequest,
    getMyNotifications,
    getMyFriends,
};