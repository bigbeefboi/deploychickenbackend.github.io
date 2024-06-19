import mongoose from "mongoose";

//export makes this accessible in server.js
export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://pathanmfaiz:159236478@cluster0.mrkvmdp.mongodb.net/gbc-chicken').then(() => console.log("DB connected"));
}