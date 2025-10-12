import express from "express";
import { userinfo, userlogin, userregister, getAllUsers, insertUser, finduser} from "../controllers/usercontroller.js";

const router = express.Router();

router.get('/userdata/:clerkid',userinfo);

router.get('/finduser/:username',finduser);

router.get('/all',getAllUsers);

router.get('/login/:uname',userlogin);

router.post('/register',userregister)

router.post('/insert',insertUser)

export default router;