
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
//    res.send("....message sent....")
//    console.log("....message sent....",req.params.id)
    try {
        let { message } = req.body;
        let { id: reciverId } = req.params
        let senderId = req.user._id//its take from cokkies
        console.log(senderId)

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId]
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        




        // await conversation.save();
        // await newMessage.save();      this will run step by step
        await Promise.all([conversation.save(),newMessage.save()])//this will run parallel

        // console.log("message sent :",newMessage)

        
        

        //SOCKET.IO functionality...

        const receiverSocketId = getReceiverSocketId(reciverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


        res.status(201).json(newMessage);




    } catch (error) {
        console.log("error in MESSAGE controller.....", error.message)
        res.status(500).json({ error: "error in MESSAGE controller..." })
    }
}

export const getMessage=async(req,res)=>{
    try{

        const {id:reciverId}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        });//its show all messages that had between reciver and sender

        if(!conversation){return res.status(201).json([])}

        const messagesId=conversation.messages;//it will show only messages obj from conversation...
        
        const messages=await Message.find(
            { _id: { $in: messagesId } }
        )

        res.status(201).json(messages)

    }catch(error){
        console.log("error in getMESSAGE controller.....", error.message)
        res.status(500).json({ error: "error in getMESSAGE controller..." })
    }
}

