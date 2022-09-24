import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../Utils/error.js";
import  jwt  from "jsonwebtoken";
import { json } from "express";

export const createUser = async (req,res,next)=> {
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User(req.body);
        Object.assign(newUser, {password:hash});
        
    try {
        await newUser.save();
        res.status(200).send("User has been created successfully");
    } catch (error) {
        next(createError(403, "Sorry, new user wasn't created. Try again"));
    }
}

export const login = async (req,res,next)=> {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404,"Sorry, user not found"));
        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong password"))
        
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {httpOnly:true,}).status(200).json({details:{...otherDetails}, isAdmin})
       // how to set expiry time for cookies
       
    } catch (error) {
        next(createError(400, "Sorry, login failed"));
    }
}