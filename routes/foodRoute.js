import express from "express"
import { addFood, listFood, removeFood} from "../controllers/foodController.js"
import multer from "multer"

//create methods with the use of this router
const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage: storage});

//post methods sends data to the server
foodRouter.post("/add", upload.single("image"),addFood)//add middleware to the route
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)





export default foodRouter;