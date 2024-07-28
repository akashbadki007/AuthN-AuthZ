// import 
const User = require('../model/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signup = async(req,res) => {

    try {
        const {name,email,password,role} = req.body;

        // verify email already exists or not
        const verifyEmail = await User.findOne({email});
        if(verifyEmail) {
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }

        // secure Password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10)
        }
        catch(err) {
            re.status(400).json({
                success:false,
                message:"Error in hashing password"
            })
        }
                 // create entry for user
        const user = await User.create({name,email,password:hashedPassword,role});

        return res.status(200).json({
            success:true,
            message:"User Created Successfully.."
        })
    }

    catch{
        return res.status(500).json({
            success:false,
            message:"User cannot be registered please try again..."
        })
    }
}


exports.login = async (req,res) => {

    try{
        // fetch data from db or body
        const {email,password} = req.body;

        // Validate email & password
        if(!email || !password) {
           return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }

        // check for registered user
        let user = await User.findOne({email});
        // if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"user is not registered please login"
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }

        // check you have enter password 
        if(await bcrypt.compare(password,user.password)) {

            // if you have enter password is match,
            let token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:"2h"});
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            let options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("tokenCookies",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            })
        }
        // if you have enter wrong password
        else {
            return res.status(403).json({
                success:false,
                message:"Password incorrect"
            });
        }
    }

    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Login Failure"
        });
    }

}