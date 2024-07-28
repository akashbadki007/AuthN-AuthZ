// const jwt = require('jsonwebtoken')
// require('dotenv').config()

// exports.auth = (req,res,next) => {

//     try {

//         // Extract JWT Token
//         // PENDING: other ways to fetch token

//         const token = res.body.token;
//         if(!token) {
//             return res.status(401).json({
//                 success:true,
//                 message:"Token Missing"
//             });
//         }

//             // verify the token
//         try {
//             const decode = jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;
//         }

//         catch {
//             return res.status(400).json({
//                 success:false,
//                 message:"Token is Invalid"
//             })
//         }

//         next();

//     }


//     catch {
//         return res.status(400).json({
//             success:false,
//             message:"Token is Invalid"
//         })
//     }
// }

// exports.isAdmin = (req,res,next) => {

//     try{
//         if(req.user.role !== 'Admin') {
//             return res.status(401).json({
//                 success:false,
//                 message:"This is Protected route for Admin"
//             });
//         }
//         next();
//     }

//     catch{
//         return res.status(500).json({
//             success:true,
//             message:"User role is not matching"
//         })
//     }
// } 

// exports.isStudent = (req,res,next) => {

//     try{
//         if(req.user.role !== 'Student') {
//             return res.status(401).json({
//                 success:false,
//                 message:"This is Protected route for Student"
//             });
//         }
//         next();
//     }

//     catch{
//         return res.status(400).json({
//             success:true,
//             message:"User role is not matching"
//         })
//     }
// } 

// exports.isVisitor = (req,res,next) => {

//     try{
//         if(req.user.role !== 'Visitor') {
//             return res.status(401).json({
//                 success:false,
//                 message:"This is Protected route for Visitor"
//             });
//         }
//         next();
//     }

//     catch{
//         return res.status(400).json({
//             success:true,
//             message:"User role is not matching"
//         })
//     }
// } 