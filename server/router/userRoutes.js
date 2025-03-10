import express from "express";
import { getUsersData } from "../controllers/UserController.js";
import userauth from "../middleware/usermiddleware.js";
const UserRouter = express.Router();

UserRouter.get("/getuserData", userauth, getUsersData);

export default UserRouter;
