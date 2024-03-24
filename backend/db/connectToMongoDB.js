
import mongoose from "mongoose";


const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("__connected to mongoDB...")
    }
    catch(error){
        console.log("__mongoDB is not Connected...",error.message)
    }
};

export default connectToMongoDB;