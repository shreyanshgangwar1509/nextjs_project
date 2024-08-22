import mongoose from "mongoose";

const userschema  = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide the username "],
        
    },
    email:{
        type:String,
        required:[true,"Please provide the username "],
    },
    password:{
        type:String,
        required:[true,"Please provide the username "],
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:[true,"Please provide the username "],
    } ,
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    VerifyToken:String,
    VerifyTokenExpiry:Date,
    
    
})
const User = mongoose.models.users ||mongoose.model("users",userschema);

export default User;