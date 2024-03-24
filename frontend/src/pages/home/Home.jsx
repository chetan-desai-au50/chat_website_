import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";


const Home = () => {
  return (
    
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg 
       bg-opticity-0">

            <Sidebar/>
            <MessageContainer/>

      </div>

  )
}

export default Home
