import express from 'express';
import {createPost , getPosts, likePost, addComment} from '../controllers/postcontroller.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'; // Import Clerk middleware
const router = express.Router();

router.post('/create', createPost);  // Apply Clerk middleware here

router.get('/getdata',getPosts);

router.get('/like',likePost);

router.get('/comment',addComment);

export default router;
