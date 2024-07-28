// import
const express = require('express');
const router = express.Router();
const {signup,login} = require('../controller/authController');
// const {auth,isAdmin,isStudent,isVisitor} = require('../Middlewares/authMiddlewares')

// Routing
router.post('/signup', signup);
router.post('/login',login);

// protected Routing

// router.get('/test',auth,(req,res) => {
//     return res.status(200).json({
//         success:true,
//         message:"Welcome To The Test Dashboard"
//     })
// })

// router.get('/student', auth, isStudent, (req,res) => {
//     return res.status(200).json({
//         success:true,
//         message:"Welcome To The Student Dashboard"
//     })
// })

// router.get('/admin', auth, isAdmin, (req,res) => {
//     return res.status(200).json({
//         success:true,
//         message:"Welcome To The Admin Dashboard"
//     })
// })

// router.get('/visitor', auth, isVisitor, (req,res) => {
//     return res.status(200).json({
//         success:true,
//         message:"Welcome To The Visitor Dashboard"
//     })
// })

// exports
module.exports = router;