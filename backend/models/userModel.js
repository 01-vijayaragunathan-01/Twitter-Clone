import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true //the same username must not store again
    },
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true //the same email must not store again
    },
    password : {
        type : String ,
        required : true,
        minLength : 6
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        }
    ],
    profileImg : {
        type : String,
        default : ""
    },
    coverImg : {
        type : String,
        default : ""
    },
    bio : {
        type : String,
        default: ""
    },
    link : {
        type : String,
        default : ""
    },
    likedPosts :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post",
            default : []
        }
    ]   
}, {timestamps : true}) //it will automatically add user created date

const User = mongoose.model("User" , UserSchema) //User is collection name
export default User;