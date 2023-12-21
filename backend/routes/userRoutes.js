const express = require("express");
const { createOrUpdateUser, getUsers, getUserById, removeUser } = require("../contollers/user");
const router = express.Router();

// USER routes
router.post("/createOrUpdateUser", createOrUpdateUser)
router.get("/getUsers", getUsers)
router.get("/getUserById/:userId", getUserById)
router.delete("/removeUserById/:userId", removeUser)

module.exports = router;
