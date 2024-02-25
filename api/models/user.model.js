import mongoose from "mongoose";

const userScheama= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});

const User= mongoose.model("User",userScheama);
export default User;