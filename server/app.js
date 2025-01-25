import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
// import { createUser } from "./seeders/user.js";
// import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { 
    CHAT_JOINED, 
    CHAT_LEAVED, 
    NEW_MESSAGE, 
    NEW_MESSAGE_ALERT, 
    ONLINE_USERS, 
    START_TYPING, 
    STOP_TYPING 
} from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { v2 as cloudinary } from "cloudinary";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";


dotenv.config({
    path: "./.env",
});
  

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "PranjalTheCoder";
const userSocketIDs = new Map(); // isme saare corrently active users hai. Jo connected hai
const onlineUsers = new Set();

connectDB(mongoURI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createUser(10);
//create 10 sample users from faker

//temporary create single chat from seeders chat.js
// createSingleChats(10);
// // temp create group chat from seeders using faker
// createGroupChats(10);
// createMessagesInAChat("679169ffbcdaaae5d3857c10", 50);





const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
});


app.set("io", io);


//using middleware here
app.use(express.json());
// app.use(express.urlencoded());//json data ko use krne ke liye
//multer ka use krege
app.use(cookieParser());
/*
    cors - cross origin policy
    jab hmara code alg alg domain ya port pr hota to hmara data block n ho 
    then we are using cors
*/
/*
    frontend url : "https://localhost:5173"
    in VITE we use "npm run build" and then "npm run free view" then
    url : "https://localhost:4173"
*/
app.use(cors(corsOptions));


// url me ye mandatory nhi hai tm /user, /chat, /admin bhi rkh skte ho
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
    console.log("Welcome to Home Page");
});


//socket middleware
io.use((socket, next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async (err) => await socketAuthenticator(err, socket, next)
      );
});


//socket.io url format
// url : wss://ws.postman-echo.com/socketio
// This is for Web Sockets but for socket.io use directly http://localhost:3000
io.on("connection", (socket) => {
    
    /*
        authentication ke liye 2 ways hai
        first way : jab hum frontend se backend ko connect krege using socket.io-Client ka use krke
                    to vha connect krke token bhej dete hai
                    aur yha tocken access kr lete hai
                    ex: access token : socket.handshake.query.user; jis bhi naam bheja ho (user or auth).
                    this is common way but it is not secure
        Second way : socket ek khud middleware provide krta hai.
                    io.use((socket, next) => {})
                    ab iske andr me bhi cheez kru example user find krke create kru to ye kaam is middleware ke krne ke bad he access hoga
                    aur agr hm yha mna kr de to socket excute he nhi hoga
                    to yha hm cookie parser ka use krke token access krege
                    so rather then options me bhejne ke token
                    we are using cokkies aur jese hum api me use krte hai vese he 
                    aur ye hm krege fronet se connect hone ke bad he 



    */
    //temporary user
    // const user = { 
    //     _id: "ididididi",
    //     name: "Anamika"
    // };
    const user = socket.user;
    //corrently active users
    userSocketIDs.set(user._id.toString(), socket.id);
    // console.log("A User Connected", socket.id);
    // console.log(userSocketIDs); 
    /*
        ye node me default development ke liye kuch aisa nhi hota ki restart ho
        to isliye hum alag se ek package ka use krte hai jo hai nodemon jo restart krta hai
        jab server ko close krke fir se npm run dev krte h vo hota hai hard refresh
        aur jab hm ctrl+s se save krte hai jb server on tb server refresh hota h use khte hai soft refresh
        aur jo bun aaya h new technology vo hard refresh nhi krta vo soft refresh krta hai
        "Bun", a new JavaScript runtime that aims to be a faster and more streamlined alternative to Node.js"
    */
   //yha pr .on eventListner lgaya iska mtlb 
   // ye NEW_MESSAGE frontend se emit hua aur yha listen ho rha hai
    socket.on(NEW_MESSAGE, async({ chatId, members, message }) => {
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };
        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        };

        const membersSocket = getSockets(members); 
        //yha pr .to eventListner lgaya iska mtlb 
        // ye NEW_MESSAGE yha se emit hua aur frontend pr listen ho rha hoga
        io.to(membersSocket).emit(NEW_MESSAGE,{
            chatId,
            message: messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

        try{
            await Message.create(messageForDB);
        }
        catch(error){ 
            // console.log(error);
            throw new Error(error);
        }
            // console.log("New Messages", messageForRealTime);
    });

    socket.on(START_TYPING, ({ members, chatId }) => {
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(START_TYPING, { chatId });
    });

    socket.on(STOP_TYPING, ({ members, chatId }) => {
        const membersSockets = getSockets(members);
        socket.to(membersSockets).emit(STOP_TYPING, { chatId });
    });

    socket.on(CHAT_JOINED, ({ userId, members }) => {
        onlineUsers.add(userId.toString());
    
        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
    });

    socket.on(CHAT_LEAVED, ({ userId, members }) => {
        onlineUsers.delete(userId.toString());
    
        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
    });

    socket.on("disconnect", () => {

        userSocketIDs.delete(user._id.toString());
        onlineUsers.delete(user._id.toString());
        socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
        // console.log("User Disconnected");
    });
});

app.use(errorMiddleware);


//hmara phle jo server before using socket.io vo app par chl rha tha
/*
app.listen(port, () => {
    console.log(`Server is Listing on the Port ${port} in ${envMode} mode`);
});
*/
//but ab jo server chal after using socket.io vo server par chl rha hai
// use url in post to connect server  http://localhost:3000/
server.listen(port, () => {
    console.log(`Server is Listing on the Port ${port} in ${envMode} mode`);
});

export { adminSecretKey, envMode, userSocketIDs };