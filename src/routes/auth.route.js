import { Router } from "express";
import { allUsers, checkAuth, signIn, signOut, signUp } from "../auth/controller.js";

const router = Router();

router.get('/users', allUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/check', checkAuth);

export default router;