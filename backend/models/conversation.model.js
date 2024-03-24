import mongoose from "mongoose";


const conversationSchema = new mongoose.Schema({

    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        }
    ],

    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Message",
            default:[]
        }
    ]

}, { timestamps: true })



const Conversation =mongoose.model("conversation", conversationSchema);

export default Conversation;