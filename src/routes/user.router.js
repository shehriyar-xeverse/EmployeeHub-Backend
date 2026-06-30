import express from "express";

import {
    register,
    getUsers,
    login,
    logoutUser
} from "../controllers/user.controller.js";

import {
    verifyToken
} from "../middleware/auth.middleware.js";

const userRouter = express.Router();
userRouter.post("/register",register);
userRouter.post("/login", login);
userRouter.post("/logout", logoutUser);
userRouter.get( "/users",verifyToken,getUsers);

export default userRouter;