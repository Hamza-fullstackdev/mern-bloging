import express from 'express';
import { verifyUser } from '../errors/verifyUser.js';
import { createPost, getPosts } from '../controllers/post.controller.js';

const router= express.Router();

router.post('/create',verifyUser,createPost);
router.get('/getposts',verifyUser,getPosts);
export default router;