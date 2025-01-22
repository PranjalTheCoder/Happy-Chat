import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { 
    addMembers, 
    deleteChat, 
    getChatDetails, 
    getMessages, 
    getMyChats, 
    getMyGroups, 
    leaveGroup, 
    newGroupChat, 
    removeMember, 
    renameGroup, 
    sendAttachments
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";


// express ke andar ek Router hoter jisase hm mini app bna skte h
const app = express.Router();


app.use(isAuthenticated);
app.post("/new", newGroupChat);

app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);
app.put("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup);

//send Attachments
app.post("/message", attachmentsMulter, sendAttachments);

//get Messages
app.get("/message/:id", getMessages);

//Get Chat Details, rename, delete
app.route("/:id")
.get(getChatDetails)
.put(renameGroup)
.delete(deleteChat);

export default app;