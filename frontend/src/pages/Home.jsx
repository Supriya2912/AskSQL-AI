import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function Home() {

    return(

        <div className="flex">

            <Sidebar/>

            <div className="flex-1">

                <ChatWindow/>

            </div>

        </div>

    )

}

export default Home;