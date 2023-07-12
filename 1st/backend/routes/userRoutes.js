import express from "express";
const  router = express.Router();
import { 
    authUser,
    registorUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
     } from "../controller/userController.js";
     import { protect } from "../middleware/authMiddleware.js";

    router.post('/registor', registorUser);
    router.post('/auth', authUser);
    router.post('/logout', logoutUser);
    router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;