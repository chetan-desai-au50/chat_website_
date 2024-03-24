import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {

    // console.log("userId:",userId)

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    console.log("token:", token)

    const cookie=res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        samiSite: "strict",
        secure: process.env.NODE_ENV !== "development"

    })
    if(cookie){
        console.log("cookie is created...")
    }else{
        console.log("cookie is not created...")
    }

}

export default generateTokenAndSetCookie;