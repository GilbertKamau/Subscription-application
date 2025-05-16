import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

import User from "../models/userModels.js";



export  const signUp = async (req, res, next) => {
    //Get session
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // logic to create user

        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        //hashed password
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUsers = await User.create([{name, email, password: hashedPassword}], { session });

        const token =jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expires_in: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: {
                token,
                user: newUsers[0]
            }
    })
} catch (error) {
        // Rollback transaction in case of error
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
   

    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // Check password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
           const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {
                token,
                user: existingUser
            }
        });
    } catch (error) {
        // Rollback transaction in case of error
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signOut = async (req, res, next) => {}

export const forgotPassword = async (req, res, next) => {}



