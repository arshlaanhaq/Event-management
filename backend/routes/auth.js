import express from "express";
import { registerUser, loginUser, guestLogin} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser); // Normal Register
router.post("/login", loginUser); // Normal Login
router.post("/guest-login", guestLogin); //  Guest Login


export default router;
