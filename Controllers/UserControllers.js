const jwt = require("jsonwebtoken");
const UserModels = require("../Models/UserModels")
const bcrypt = require("bcrypt");
const {sendEmail} = require("../Utils/email")
require("dotenv").config();

exports.signUp = async (req,res) => {

    try{
        const {name,email,password,role} = req.body;

        // Validate required fields
        if(!name || !email || !password || !role) {
            return res.status(400).json(
                {
                    success:false,
                    msg:"All fields are required"
                }
            )
        }

        // Check if email already exists
        const verifyEmail = await UserModels.findOne({email});
        if(verifyEmail) {
            return res.status(409).json(
                {
                    success:false,
                    msg:"Email already exists. Please use a different email."
                }
            )
        }

        // Hash the password
        let hashPassword;
        if(password) {
            hashPassword = await bcrypt.hash(password, 10);
        }
        else {
            return res.status(505).json(
                {
                    success:false,
                    msg:"Error in hashing"
                }
            )
        }
        // Store the user data in DB..
        const storeData = await UserModels.create({name, email, password:hashPassword, role});
        console.log(`Your response is here : ${storeData}`)
        
        // Send email after signup
        await sendEmail(
            email,
            "SignUp Notification",
            `<h3>Welcome to AuthN-AuthZ Web Applications, ${name}!</h3>
            <p>Thank you for signing up and joining our growing community.</p>
            <p>Explore all the exciting features we’ve built just for you, and make the most of your experience with us.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team anytime.</p>
            <p>Warm regards,<br>The AuthN-AuthZ Team</p>`
           
        );
        
        // Success response
        res.status(201).json(
            {
                success:true,
                msg:"User registered successfully",
                response:storeData
            }
        )

    } catch(err) {
        console.error("Error during signup:", err);
        // Handle server-side error
        res.status(500).json(
            {
                success:false,
                msg:"An error occurred during signup. Please try again later."
            }
        )
   }
}


exports.login = async (req,res) => {

    try{

        const {email, password} = req.body;

        // Validate required fields   ||   Check if all required fields are provided
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                msg:"Email and password are required"
            })
        }

        // Find the user by email
        const user = await UserModels.findOne({email});
        if(!user) {
            return res.status(404).json(
                {
                    success:false,
                    msg:"User not found. Please signup first."
                }
            )
        }
         // Verify the password
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) {
            return res.status(401).json(
                {
                    success:false,
                    msg:"Invalid email or password"
                }
            )
        }

        //  Generate JWT token   const token = jwt.sign(payload,secretKey, options)
        const token = jwt.sign({ id:user._id, email:user.email, role:user.role }, process.env.SECRET_KEY, {expiresIn:Date.now() + 60*60*1000});

        // Remove sensitive data like password from the response
        const userResponse = {...user.toObject()}  // Convert Mongoose document to plain object
        delete userResponse.password  // Remove password from the user object
        userResponse.token = token;   // Add token to the user object
        console.log("User Response Here -->>",userResponse);
        
        // Send email after login
        await sendEmail(
            email,
            "Login Notification",
            `<h2>Hi, ${user.name}!</h2>
            <p>You have successfully logged in to AuthN-AuthZ Web Applications.</p>`
        );

        const cookieOptions = {
            httpOnly: true,          // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "strict",      // Prevent cross-site request forgery
            maxAge:  3000, // Cookie expires in 1 day
        }

        // Send response with cookie
        res.status(200).cookie("token",token,cookieOptions).json({
            success:true,
            token,
            user:userResponse,
            msg:"User login successfully"
        })


    } catch(err) {
        console.error("Error during login:", err);
        res.status(500).json({
            success:false,
            msg:"An error occurred during login. Please try again later."
        })
    }

}