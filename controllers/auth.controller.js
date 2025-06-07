import mongoose from "mongoose";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async(req, res, next) => {
    //implementing signup logic
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name, email, password} = req.body;

        //checking if someone like that already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error("User with that email already exists");
            error.statusCode = 409;
            throw error;
        }

        // Passed if statement so user with that email doesnt exists
        //hasing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 26 xazma dahasha useris sheyvanili paroli da monacemta bazashi ar sheinaxavs chveulebriv parols 

        const newUsers = await User.create([{name, email, password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({success: true, message: "User created successfully", data: {
            token,
            user: newUsers[0]
        }})
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        next(err)
    }
}

export const signIn = async(req,res,next) => {
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            const error = "User doesn't exist";
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(200).json({
            success: true,
            message: "Signed in successfully",
            data: {
                token,
                user,
            }
        })
    }
    catch(err){
        next(err)
    }
}

export const signOut = async(req,res,next) => {
    
}