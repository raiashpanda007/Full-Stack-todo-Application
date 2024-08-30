import { Router } from "express";
const router = Router();
import {createTodo, getAlltodos, loginuser, reqisterUser, toggleTodo, updateTodo} from '../controllers/user.controller'
import verifyuser from "../middleware/verify.middleware";
router.route("/register").post(
    reqisterUser
)
router.route("/login").post(
    loginuser
)


router.route('/create-todo').post(verifyuser,createTodo)
router.route('/toggle-todo').post(verifyuser,toggleTodo)
router.route('/get-todos').get(verifyuser,getAlltodos)
router.route("/update-todo").post(verifyuser,updateTodo)



export default router;