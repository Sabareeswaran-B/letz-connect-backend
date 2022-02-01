const User = require('../model/user');
const bycrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Signup Controller
async function signup(req, res, next) {

    const userExist = await User.findOne({ name: req.body.username })
    if (userExist) {
        res.status(400).json({ "msg": 'User name already Exist' })
    } else {
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) {
            res.status(400).json({ "msg": 'Email already Exist' })
        } else {
            var newPassword = req.body.password
            var confirmPassword = req.body.confirmPassword
            if (newPassword == confirmPassword) {
                const salt = await bycrypt.genSalt(10);
                hashpassword = await bycrypt.hash(req.body.password, salt)
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashpassword,
                })
                try {
                    // console.log("try")
                    const userSignup = await user.save()
                    res.send({ 'msg': 'succesfully registered' })
                } catch (err) {
                    // console.log(err)
                    res.sendStatus(400).send(err)
                }
            } else {
                // console.log("else")
                res.status(400).json({ error: "Password mismatch" })
            }

        }
    }
}




//Login Controller
async function login(req, res, next) {
    const emailExist = await User.findOne({ email: req.body.email })

    if (!emailExist) {
        res.status(400).json({ msg: "Invalid email" })
    } else {
        const checkpassword = await bycrypt.compare(req.body.password, emailExist.password)
        if (!checkpassword) {
            res.status(400).json({ msg: "Invalid password" })
        } else {
            const token = jwt.sign({ id: emailExist.id }, process.env.SECRET)
            res.header('token', token).json({ 'token': token, 'msg': "successfully loggedin", ...emailExist._doc })
        }
    }
}


//Get User details for Profile Page
async function getprofile(req, res) {
    const userData = await User.findById(req.user.id)
    if (!userData) {
        res.status(400).json({ error: "User not Found" })
    }
    else {
        res.send(userData)
    }
}


//Update User datails
const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender
    })
        .then(data => {
            res.send({ message: "Updated Successfully!", name: data.name })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Bag."
            });
        });

}

const addExperience = async (req, res) => {
    var user = await User.findById(req.user.id);
    console.log(req.user.id)
    if (user) {
        user.experience.push(req.body)
        var data = await user.save()
        res.send({ "msg": "Updated Successfully!", data: data });
    }
}

const addEducation = async (req, res) => {
    var user = await User.findById(req.user.id);
    console.log(req.user.id)
    if (user) {
        user.education.push(req.body)
        var data = await user.save()
        res.send({ "msg": "Updated Successfully!", data: data });
    }
}

const getExperience = (req, res) => {
    User.findById(req.user.id).then(data => {
        res.send({"msg": "success", data: data.experience})
    })
}

const getEducation = (req, res) => {
    User.findById(req.user.id).then(data => {
        res.send({"msg": "success", data: data.education})
    })
}

module.exports = {
    signup,
    login,
    getprofile,
    updateUser,
    addExperience,
    addEducation,
    getExperience,
    getEducation,
}