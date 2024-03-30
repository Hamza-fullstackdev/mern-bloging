import express from 'express';
import { verifyUser } from '../errors/verifyUser.js';
import { createPost } from '../controllers/post.controller.js';

const router= express.Router();

router.post('/create',createPost);

export default router;