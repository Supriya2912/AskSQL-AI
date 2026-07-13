import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

function PromptBox({ onSend, loading }) {

  const [text, setText] = useState("");

  const textareaRef = useRef(null);

  useEffect(() => {

    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";

    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";

  }, [text]);

  const send = () => {

    if (!text.trim() || loading) return;

    onSend(text);

    setText("");

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      send();

    }

  };

  return (

    <div className="border-t bg-white">

      <div className="max-w-4xl mx-auto px-6 py-5">

        <div className="flex items-end rounded-3xl border border-gray-300 bg-white shadow-sm px-5 py-4">

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your database..."
            className="
              flex-1
              resize-none
              bg-transparent
              outline-none
              max-h-52
              text-gray-800
              placeholder:text-gray-400
            "
          />

          <button
            onClick={send}
            disabled={loading || !text.trim()}
            className="
              ml-3
              h-11
              w-11
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              hover:bg-gray-900
              disabled:bg-gray-300
              disabled:cursor-not-allowed
              transition
            "
          >

            <SendHorizonal size={18} />

          </button>

        </div>

        <p className="text-center text-xs text-gray-400 mt-3">

          AskSQL can make mistakes. Verify important queries before using them.

        </p>

      </div>

    </div>

  );

}

export default PromptBox;