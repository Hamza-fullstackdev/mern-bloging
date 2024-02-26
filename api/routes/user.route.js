import express from "express";
import { googleAuth, login, signup } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post('/login',login);
router.post('/google',googleAuth);

export default router;
