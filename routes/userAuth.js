const express = require("express")
const authRouter = express.Router();
const {register, login, logout, adminRegister} = require("../controllers/userAuthenticate")
const userMiddleware = require("../middlewares/userMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")

// Register
// login
// logout
// Getprofile

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout",userMiddleware, logout);
authRouter.post("/admin/register",adminMiddleware, adminRegister)
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter

