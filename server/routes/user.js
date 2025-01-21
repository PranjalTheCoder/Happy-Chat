import express from "express";
import { getMyProfile, login, logout, newUser, searchUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";


// express ke andar ek Router hoter jisase hm mini app bna skte h
const app = express.Router();


//browser me post request hit nhi kr skte tm browser me post req ko access nhi kr paoge
// there is only one way to access post req form me convert krke aur form submit hoga aue end point hit ho jayega
// hum yha form to bnayege nhi hm yha postman ka use krege

// 
// actual is  https://localhost:3000/user/login
app.post("/new", singleAvatar, newUser);
app.post("/login", login);
// so that is way to add prefix


//after here user must be logged in to access the routes
//jha par bhi me chahta hu ki logged in rhe user
//us route se phle isAuthenticate lgana hoga 
//kyuki isme id hai user ki
app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);



export default app;