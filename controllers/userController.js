import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bycrypt from "bcrypt"
import validator from "validator"
import { response } from "express";


//user login
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        //if the user is there it is stored in the variable
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        //if the user is available
        //the password will be matched with the mail
        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        //token for if the pass matches the mail
        const token = createToken(user._id);
        res.json({success: true, token})

    }catch(error){
        console.log(error);
        res.json({success: false, message:"error"})
    }
}

//create token in response to a new user
const createToken =  (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try{
        //if the emial is available the account will be stored in the variables
        //checks if the user exist
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success: false, message:"the account already exists"})
        }

        //validates email and password
        if(!validator.isEmail(email)){//checks if the email is valid
            return res.json({success: false, message:"please enter a valid email"})    
        }
        
        if(password.length < 8){
            return res.json({success: false, message:"please enter a strong password"})
        }

        //encrpytion of credentials
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt);

        //create a new account
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //save the new account
        //into a variable
        //with credentials
        const user = await newUser.save()

        //take user id an generate a token
        const token = createToken(user._id)
        //send the token as a response
        res.json({success: true,token})


    } catch(error){
        console.log(error);
        res.json({success: false, message:"Error"})
    }   
}

export {loginUser, registerUser}