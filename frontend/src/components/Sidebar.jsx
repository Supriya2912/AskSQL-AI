import {
  Menu,
  Search,
  Plus,
  Trash2,
  MessageSquare,
  UserCircle2,
} from "lucide-react";

import { useMemo, useState } from "react";

function Sidebar({
  open,
  setOpen,
  history,
  selectedChat,
  loadChat,
  newChat,
  setHistory,
}) {

  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {

    return history.filter(chat =>
      chat.question
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [history, search]);

  const deleteChat = (question) => {

    const updated = history.filter(
      chat => chat.question !== question
    );

    setHistory(updated);

    localStorage.setItem(
      "asksql_history",
      JSON.stringify(updated)
    );

  };

  return (

    <aside

      className={`
      bg-white
      border-r
      border-gray-200
      h-screen
      transition-all
      duration-300
      flex
      flex-col
      ${open ? "w-72" : "w-20"}
      `}

    >

      {/* Header */}

      <div className="h-16 flex items-center justify-between px-4 border-b">

        <div className="flex items-center gap-3">

          💬

          {open &&

            <h1 className="font-bold text-xl">

              AskSQL

            </h1>

          }

        </div>

        <button

          onClick={() => setOpen(!open)}

          className="p-2 rounded-lg hover:bg-gray-100"

        >

          <Menu size={20} />

        </button>

      </div>

      {/* New Chat */}

      <div className="p-4">

        <button

          onClick={newChat}

          className="
          w-full
          bg-black
          hover:bg-gray-900
          text-white
          rounded-xl
          py-3
          flex
          items-center
          justify-center
          gap-2
          transition
          "

        >

          <Plus size={18} />

          {open && "New Chat"}

        </button>

      </div>

      {/* Search */}

      {

        open &&

        <div className="px-4">

          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-3">

            <Search size={17} />

            <input

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              placeholder="Search chats..."

              className="bg-transparent ml-3 outline-none w-full text-sm"

            />

          </div>

        </div>

      }

      {/* History */}

      <div className="flex-1 overflow-y-auto px-3 mt-5">

        {

          filteredHistory.length===0 && open &&

          <p className="text-sm text-gray-400 px-3">

            No chats yet

          </p>

        }

        {

          filteredHistory.map((chat,index)=>(

            <div

              key={index}

              className={`
              group
              rounded-xl
              mb-2
              transition
              ${selectedChat?.question===chat.question
                ? "bg-gray-200"
                : "hover:bg-gray-100"
              }
              `}

            >

              <button

                onClick={()=>loadChat(chat)}

                className="
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                "

              >

                <MessageSquare size={16}/>

                {

                  open &&

                  <span className="truncate flex-1 text-left text-sm">

                    {chat.question}

                  </span>

                }

              </button>

              {

                open &&

                <button

                  onClick={()=>deleteChat(chat.question)}

                  className="
                  hidden
                  group-hover:block
                  absolute
                  right-5
                  -mt-10
                  p-1
                  rounded
                  hover:bg-red-100
                  "

                >

                  <Trash2

                    size={15}

                    className="text-red-500"

                  />

                </button>

              }

            </div>

          ))

        }

      </div>

      {/* Footer */}

      <div className="border-t p-4">

        <div className="flex items-center gap-3">

          <UserCircle2 size={36}/>

          {

            open &&

            <div>

              <p className="font-semibold">

                Guest User

              </p>

              <p className="text-xs text-gray-500">

                Login Coming Soon

              </p>

            </div>

          }

        </div>

      </div>

    </aside>

  );

}

export default Sidebar;