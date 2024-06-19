import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},/*makes sure a data type needs a value to be stored*/ 
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
})

//makes sure that the model is created once
//if exists it is used 
//if not a model is created
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel;