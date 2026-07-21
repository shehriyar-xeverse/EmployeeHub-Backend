import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmins,
  logoutAdmin,
  getAdminProfile,
  updateProfileImage,
  verifiedOTP
} from "../controllers/admin.controller.js";
import {
    verifyToken
} from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";

const adminRouter = express.Router();
adminRouter.post("/register-Admin",  registerAdmin);
adminRouter.post("/verified-otp-admin",  verifiedOTP);
adminRouter.post("/login-Admin", loginAdmin);
adminRouter.post("/logout-Admin", logoutAdmin);
adminRouter.get( "/admins",verifyToken,getAdmins);
adminRouter.get("/admin-profile", verifyToken, getAdminProfile);
adminRouter.put("/update-profile-image",verifyToken, upload.single("profile_image"),updateProfileImage);

export default adminRouter;