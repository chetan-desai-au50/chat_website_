import { useSocketContext } from '../../context/SocketContext.jsx';
import useConverstion from '../../zustand/useConversation.js';

const Conversation = ({ conversation, lastIdx, emoji }) => {

    const {selectedConversation, setSelectedConversation}=useConverstion()

    const isSelected=selectedConversation?._id===conversation._id;
    const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
            ${isSelected? "bg-sky-500" : "" } `} onClick={()=>setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilepic} alt="user img"></img>
                    </div>
                </div>

                <div className="flex felx-col flex-1">
                    <div className="flex gap-10 justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullname}</p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
        </>
    );
};

export default Conversation
