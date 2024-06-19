import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"

//create router 
const userRouter = express.Router()

//get user data to create a new user
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter;