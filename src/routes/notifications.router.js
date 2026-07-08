import express from "express";
import { approveNotification, getAllNotifications, rejectNotification } from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";



const notificationRouter = express.Router();

notificationRouter.get( "/notifications",getAllNotifications);
notificationRouter.post( "/approve-notify",verifyToken,approveNotification);
notificationRouter.post( "/reject-notify",verifyToken,rejectNotification);



export default notificationRouter;