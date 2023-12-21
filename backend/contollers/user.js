const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const User = require("../models/UserModel");


//  Create or Update user
const createOrUpdateUser = async (req, res) => {
    try {

        const { firstName, lastName, email, phone, status } = req.body
        // check validtion
        if (!firstName && !lastName && !email && !phone && !status) {
            res.status(403).json({
                data: null,
                message: "Invalid req perameters",
            })
        }
        if (req.body.userId) {
            const updatedUser = await User.findByIdAndUpdate(req.body.userId, { firstName, lastName, email, phone, status }, { new: true })

            res.status(200).json({
                data: updatedUser,
                message: "User updated",
            })

        } else {
            const newUser = await new User({ firstName, lastName, email, phone, status })
            await newUser.save();

            res.status(200).json({
                data: newUser,
                message: "User created",
            })
        }
    } catch (error) {
        console.log("Error wile user create", error);

        res.status(500).json({
            data: newUser,
            message: error.message,
        })
    }
}

//  Remove user
const removeUser = async (req, res) => {
    try {
        const { userId } = req.params
        // check validtion
        if (!isValidObjectId(userId)) {
            res.status(403).json({
                data: null,
                message: "Invalid userId",
            })
        } else {
            const removedUser = await User.findByIdAndDelete(userId);

            res.status(200).json({
                data: removedUser,
                message: "User removed",
            })
        }
    } catch (error) {
        console.log("Error wile user remove", error);
        res.status(500).json({
            data: newUser,
            message: error.message,
        })
    }
}

//  Get users
const getUsers = async (req, res) => {
    try {
        let { page = 1, pageSize = 10 } = req.params
        page = parseInt(page)
        pageSize = parseInt(pageSize)

        const totalUsers = await User.find({}).count()
        const totalPages = Math.ceil(totalUsers / pageSize)
        const users = await User.find({}).sort({created_at:-1}).skip((page - 1) * pageSize).limit(pageSize)
        const pageInfo = {
            currentPage: page,
            currentPage: page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
        }
        res.status(200).json({
            data: { users, pageInfo },
            message: "Users get successfully",
        })
    } catch (error) {
        console.log("Error wile user get", error);
        res.status(500).json({
            data: null,
            message: error.message,
        })
    }
}

//  Get user by id
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        // check validtion
        if (!isValidObjectId(userId)) {
            res.status(403).json({
                data: null,
                message: "Invalid userId",
            })
        } else {
            const user = await User.findById(userId);

            res.status(200).json({
                data: user,
                message: "User finded",
            })
        }
    } catch (error) {
        console.log("Error wile user get", error);
        res.status(500).json({
            data: newUser,
            message: error.message,
        })
    }
}

module.exports = { createOrUpdateUser, removeUser, getUserById, getUsers }

