import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";


// express ke andar ek Router hoter jisase hm mini app bna skte h
const app = express.Router();


app.use(isAuthenticated);



export default app;