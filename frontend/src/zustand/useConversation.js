
import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }), // Changed from ({ messages }) to set({ messages })
}));

export default useConversation;


// import { create } from "zustand";

// const useConverstion = create((set) => ({

//     selectedConversation: null,
//     setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
//     messages: [],
//     setMessages: (messages) => ({ messages })

// }))

// export default useConverstion;


// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
// 	messages: [],
// 	setMessages: (messages) => set({ messages }),
// }));

// export default useConversation;