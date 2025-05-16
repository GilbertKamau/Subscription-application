import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username required"],
        trim:true,
        minLength:2,
        maxLenghth:50,
    },
    email:{
        type: String,
        required:[true, "Email required"],
        unique: true,
        trim:true,
        lowercase:true,
        match: [/\S+@S+\.\S+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"]

    }},
    {
        timestamps: true,
    })


const User = mongoose.model("User", userSchema);
export default User;