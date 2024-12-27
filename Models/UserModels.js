const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

    {
        name:{
            type:String,
            required:true,
            maxLength:50,
            trim: true,
        },

        email:{
            type:String,
            required:true,
            unique:true,
            maxLength:50,
            trim: true, // Removes unnecessary whitespaces
            lowercase: true // Ensures case-insensitivity
        },

        password:{
            type:String,
            required:true,
            maxLength:500
        },

        role:{
            type:String,
            enum:["Admin","Student","Visitor"],
            required:true,
        },
    },

    {
        timestamps:true
    }

)

module.exports = mongoose.model("UserModels" ,userSchema);