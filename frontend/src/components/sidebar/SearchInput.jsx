import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation.js'
import useGetConversations from '../../hooks/useGetConversation.js'
import toast from "react-hot-toast";

const SearchInput = () => {

    const [search, setSearch] = useState("");
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");

    }

    return (
        <form onSubmit={handleSubmit}  className="flex items-center gap-2">
            <input type="text" placeholder="Search" className="input input-bordered rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}>
            </input>

            <button type="submit" className="btn btn-circle border-none bg-sky-900 text-white">
                <IoSearchSharp className="w-6 h-6 outline-none"></IoSearchSharp>
            </button>
        </form>
    )
}

export default SearchInput;


// const SearchInput = () => {
//     return (
//         <form className="flex items-center gap-2">
//             <input type="text" placeholder="Search" className="input input-bordered rounded-full"></input>
//             <button type="submit" className="btn btn-circle border-none bg-sky-900 text-white">
//                 <IoSearchSharp className="w-6 h-6 outline-none"></IoSearchSharp>
//             </button>
//         </form>
//     )
// }

// export default SearchInput