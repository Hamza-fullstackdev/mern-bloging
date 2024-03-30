import express from "express";
import { googleAuth, login, signup, updateUser,deleteUser, signOut } from "../controllers/user.controller.js";
import { verifyUser } from "../errors/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post('/login',login);
router.post('/google',googleAuth);
router.put('/update/:id',verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser);
router.post('/signout',signOut);
export default router;
