import express from "express";
import { getUsersData, getUserTasks, addUserTasks } from "../controllers/UserController.js";
import userauth from "../middleware/usermiddleware.js";
const UserRouter = express.Router();

UserRouter.get("/getuserData", userauth, getUsersData);

UserRouter.get("/getUserTasks", userauth, getUserTasks);

UserRouter.post("/addUserTasks", userauth, addUserTasks);

export default UserRouter;
