import User from "../models/userModels.js";

//authentication

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            data: users
        })
    } catch (error){
        next(error)
    }
}

//get single user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password -createdAt -updatedAt");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "User fetched successfully",
            success: true,
            data: user
        })
    } catch (error){
        next(error)
    }
}