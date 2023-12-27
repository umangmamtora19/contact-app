const asyncHandler = require("express-async-handler"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

//@desc Register New User
//@route POST /users/register
//@access public

const userRegister = asyncHandler(async (req, res) => {
    const {email, phone, name, password} = req.body

    if (!email || !phone || !name || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const existUser = await User.findOne({email});
    console.log(`user found: ${existUser}`);
    if (!existUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        let body = {
            name,
            email,
            phone,
            password : hashPassword
        }
        const user = await User.create(body);
        res.status(201).json({ message: "User Register", data:  body});
    } else {
        res.status(400);
        throw new Error("User already exist");
    }
});


//@desc User Login
//@route POST /users/login
//@access public

const userLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userExist = await User.findOne({email}); 
    if (!userExist) {
        res.status(400);
        throw new Error("User with this email does not exit, please register first");
    }

    if (await bcrypt.compare(password, userExist.password)) {
        const accessToken = jwt.sign({
            user: {
                name: userExist.name,
                email: userExist.email,
                phone: userExist.phone,
                id: userExist.id,
            }
        }, process.env.JWT_SECRET);

        var dataToSend = userExist;
        dataToSend = {
            token: accessToken,
            name: userExist.name,
            email: userExist.email,
            phone: userExist.phone,
            id: userExist.id,
        }
        res.status(201).json({ message: "User Login Success", data: dataToSend });
    } else {
        res.status(400);
        throw new Error("Password does not match");
    }
});


//@desc User Data
//@route GET /users/current
//@access private

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Current User Data", data: req.user });
});


module.exports = {userRegister, userLogin, getCurrentUser}