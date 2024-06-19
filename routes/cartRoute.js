import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";

//create express routeer
const cartRouter = express.Router();

//api endpoint to allow for interaction with a server
cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/remove",authMiddleware, removeFromCart)
cartRouter.post("/get",authMiddleware, getCart)

export default cartRouter;