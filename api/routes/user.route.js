import express from "express";
import { googleAuth, login, signup, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../errors/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post('/login',login);
router.post('/google',googleAuth);
router.put('/update/:id',verifyUser,updateUser);

export default router;
