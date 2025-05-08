// const { Error } = require("mongoose")
// const User = require("../models/user")
// const {Validate} = require("../utils/validator")
// const bcrypt = require('bcrypt')
// const jwt = require("jsonwebtoken")
// const register = async (req,res) => {
//     try {

//         // Validate the data like password wagera sab kuch
//         Validate(req.body);
//         const {firstName, emailId, password} =  req.body;
//         req.body.password = await bcrypt.hash(password,10);


//         const user =  await User.create(req.body);
//         const token = jwt.sign({_id: user._id,emailId}, process.env.JwT_KEY, {expiresIn: 60*60})
//         res.cookie("token", token, {maxAge: 60*60*1000})
//         res.statuts(201).send("User Registered Successfully")
        
//     } catch (error) {
//         res.status(400).send("Error"+error)
//     }
// }

// const login = async(req,res) => {

//     try {
//         const {emailId, password} = req.body

//         if(!emailId) 
//             throw new Error("Invaliud Credentials");
//         if(!password) 
//             throw new Error("Invaliud Credentials");

//         const user = User.findOne({emailId});

//         const match = bcrypt.compare(password,user.password);

//         if(!match) 
//             throw new Error("Invalid credential")
//         const token = jwt.sign({_id: user._id,emailId:emailId}, process.env.JwT_KEY, {expiresIn: 60*60})
//         res.cookie("token", token, {maxAge: 60*60*1000})
//         res.statuts(200).send("Logged in successfully")

//     } catch (error) {
//         res.statuts(401).send("Error"+ error.message)
//     }
// }


// // Logout Feature

// const logout  =async(req,res)=> {
//         try {

//             // Validate the token 
//             // Token ko add kar denge redis ke blocklist me 
//             // Cookies ko clear kar dena ....

        
//         } catch (error) {
        
//         }
//     }
    
//     module.exports = {register, login, logout}



const { Error } = require("mongoose");
const User = require("../models/user");
const { Validate } = require("../utils/validator"); // Assuming named export
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis")

const register = async (req, res) => {
    try {
        Validate(req.body); // validation
        const { firstName, emailId, password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user'

        const user = await User.create(req.body);
        const token = jwt.sign({ _id: user._id, emailId:emailId, role:'user' }, process.env.JwT_KEY,{ expiresIn: 60 * 60 });

        res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
        res.status(201).send("User Registered Successfully");

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) 
            throw new Error("Invalid Credentials");

        const user = await User.findOne({ emailId });
        if (!user)
            throw new Error("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new Error("Invalid Credentials");

        const token = jwt.sign(
            { _id: user._id, emailId:emailId,role: user.role },
            process.env.JwT_KEY,
            { expiresIn: 60 * 60 }
        );

        res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
        res.status(200).send("Logged in successfully");

    } catch (error) {
        res.status(401).send("Error: " + error.message);
    }
};

// Logout ->
// Validate the token
// Token ko add kar denge redis ke blocklist me 
// cookies ko clear kar de....
const logout = async (req, res) => {
    try {
        const {token} = req.cookies; 
        // console.log(token);

        const payload = jwt.decode(token)
        // console.log(payload);
        
         await redisClient.set(`token: ${token}`, "Blocked")
         await redisClient.expireAt(`token: ${token}`,payload.exp)

        res.cookie("token",null, {expires: new Date(Date.now())})
        res.send("Logout Successfully")

    } catch (error) {
       res.status(503).send("Error" + error)
    }
};


const adminRegister = async(req,res) => {

    try {
        Validate(req.body); // validation
        const { firstName, emailId, password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);

        const user = await User.create(req.body);
        const token = jwt.sign({ _id: user._id, emailId:emailId, role:user.role }, process.env.JwT_KEY,{ expiresIn: 60 * 60 });

        res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
        res.status(201).send("User Registered Successfully");

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }

}

module.exports = { register, login, logout, adminRegister };
