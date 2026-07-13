import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("asksql_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedChat, setSelectedChat] = useState(null);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "asksql_history",
      JSON.stringify(history)
    );
  }, [history]);

  const newChat = () => {
    setSelectedChat(null);
  };

  const loadChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen">

     <Sidebar
    open={sidebarOpen}
    setOpen={setSidebarOpen}
    history={history}
    selectedChat={selectedChat}
    loadChat={loadChat}
    newChat={newChat}
    setHistory={setHistory}
/>

      <ChatWindow
        history={history}
        setHistory={setHistory}
        selectedChat={selectedChat}
      />

    </div>
  );
}

export default App;