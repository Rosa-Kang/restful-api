import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
        
    } catch (error) {
        next
    }
}   

export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })

    } catch (error) {
        next(error);
    }
}   

export const createUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}   

export const deleteUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}   
