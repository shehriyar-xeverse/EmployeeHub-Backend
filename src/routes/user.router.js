import express from "express";

import {
    register,
    getUsers
} from "../controllers/user.controller.js";

import {
    verifyToken
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",register);

router.get(
    "/users",
    verifyToken,
    getUsers
);

export default router;