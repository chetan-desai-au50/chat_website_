import User from '../models/user.model.js'
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from '../utils/generateToken.js'


export const signup = async (req, res) => {
    try {

        const { fullname, username, password, confirmpassword, gender } = req.body

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "password is not matching..." })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username alredy exist..." })
        }

        //Hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)


        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic
            })

        } else {
            res.status(400).json({error:"invaild user data..."})
        }

    } catch (error) {
        console.log("error in signup controller...", error.message)
        res.status(500).json({ error: "internal server error" })
    }
}




export const login = async (req, res) => {
    try{
        const {username,password}=req.body;

        const user= await User.findOne({username});

        const isPasswordCorrect= await bcryptjs.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"invaild username and password..."})
        }

        console.log("from login-----:",user._id)

        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic
        })

    }
    catch(error){
        console.log("error in LOGIN controller...", error.message)
        res.status(500).json({ error: "internal server error" })        
    }
}




export const logout = async (req, res) => {
    try{

        res.cookie("jwt","",{maxAge:0})
        
        if(res.cookie("jwt","",{maxAge:0})){
            console.log("logged out and token removed sucessflly...")
        }

        res.status(200).json({message:"logged out sucessfully..."})

    }
    catch(error){
        console.log("error in LOGOUT controller...", error.message)
        res.status(500).json({ error: "internal server error" })    
    }
}