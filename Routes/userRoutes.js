const express = require("express");

const router = express.Router();
const {signUp,login} = require('../Controllers/UserControllers');
const {auth, isStudent, isAdmin} = require('../Middlewares/auth')

router.post("/signup", signUp);
router.post("/login", login);

// Testing protected route
router.get('/test', auth, (req,res) => {
    return res.status(201).json({
        success:true,
        msg:"Welcome to the testing protected route."
    })
}) 

// Protected route for Student
router.get('/student', auth, isStudent, (req,res) => {
    return res.status(200).json({
        success:true,
        msg:"Welcome to the student protected route."
    })
}) 

// Protected route for Admin
router.get('/admin', auth, isAdmin, (req,res) => {
    return res.status(201).json({
        success:true,
        msg:"Welcome to the admin protected route."
    })
})


module.exports = router;