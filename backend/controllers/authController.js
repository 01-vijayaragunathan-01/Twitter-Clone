import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
export const signup = async(req, res) => {
    try {
        const {username , fullName , email , password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //to validate email
        if(!emailRegex.test(email)){
            return res.status(400).json({ error : "Invalid Email Format"})
        }

        const existingEmail = await User.findOne({email : email}) //or check with username
        const existingUsername = await User.findOne({username})

        if(existingEmail || existingUsername){
            return res.status(400).json({error : "Already Existing user or email"})
        }
        if(password.length < 6){
            return res.status(400).json({error : "password must have atleast 6 char length"})
        }

        //hashing the password
        // 12345 = cn39f3ygbiurgf94bd
        const salt = await bcrypt.genSalt(10); //10 times hashing
        const hashedPassword = await bcrypt.hash(password, salt); //the password we get from frontend will be hashed

        const newUser = new User({
            username,
            fullName,
            email,
            password : hashedPassword
        }) //creating new user
        if(newUser){
            generateToken(newUser._id , res)
            await newUser.save() //it will be saved in mongoDB
            res.status(200).json(
                {
                    _id : newUser._id,
                    username : newUser.username,
                    fullName : newUser.fullName,
                    email : newUser.email,
                    followers : newUser.followers,
                    following : newUser.following,
                    profileImg : newUser.profileImg,
                    coverImg : newUser.coverImg,
                    bio : newUser.bio,
                    link : newUser.link
                }
            )
        }else{
            res.status(400).json({error : "Invalid Data"})
        }
    } catch (err) {
        console.log(`Error in signup controller : ${err}`);
        res.status(500).json({error : "Internal server error"})
    }
}

export const login = async(req, res) => {
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || ""); //password -> frontend , user?.password -> which is stored in DB , " " -> to make app not crash

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid username or password"})
        }

        generateToken(user._id , res);

        res.status(200).json({
                    _id : user._id,
                    username : user.username,
                    fullName : user.fullName,
                    email : user.email,
                    followers : user.followers,
                    following : user.following,
                    profileImg : user.profileImg,
                    coverImg : user.coverImg,
                    bio : user.bio,
                    link : user.link
        })
    } catch(err){
        console.log(`Error in login controller : ${err}`);
        res.status(500).json({error : "Internal Server Error"}) 
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge : 0}) //jwt token will be created and deleted immediately
        res.status(200).json({message : "Logout successfully"})
    } catch (err){
        console.log(`Error in logout controller : ${err}`);
        res.status(500).json({error : "Internal Server Error"})
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findOne({_id : req.user._id}).select("-password")
        res.status(200).json(user);
    } catch(err){
        console.log(`Error in getMe controller : ${err}`);
        res.status(500).json({error : "Internal Server Error"})
    }
}
