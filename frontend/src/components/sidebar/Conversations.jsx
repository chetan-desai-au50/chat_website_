import useGetConversation from "../../hooks/useGetConversation"
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading,conversations}=useGetConversation();
  console.log("CONVERSATION-:-",conversations)
  return (
    <div className="py-2 flex flex-col overflow-auto">
       {conversations.map((val,idx)=>(
         <Conversation
          key={val._id}
					conversation={val}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length-1}
         />
       ))}
       
       {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
        
    </div>
  )
}

export default Conversations







//BASE CODE
// import Conversation from "./Conversation"

// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
        
//     </div>
//   )
// }

// export default Conversations

