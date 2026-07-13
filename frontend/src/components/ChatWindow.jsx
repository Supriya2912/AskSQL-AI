import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Database } from "lucide-react";

import api from "../services/api";

import PromptBox from "./PromptBox";
import MessageBubble from "./MessageBubble";
import SQLCard from "./SQLCard";
import ExplanationCard from "./ExplanationCard";
import ResultsTable from "./ResultsTable";

function ChatWindow({
  history,
  setHistory,
  selectedChat,
}) {

  const defaultMessage = [
    {
      id: 1,
      role: "assistant",
      text: "👋 Hi! Ask me anything about your database."
    }
  ];

  const [messages, setMessages] = useState(defaultMessage);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll whenever messages change
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);

  // Load previous chat
  useEffect(() => {

    if (selectedChat) {

      setMessages([
        {
          id: 1,
          role: "user",
          text: selectedChat.question
        },
        {
          id: 2,
          role: "assistant",
          data: selectedChat.response
        }
      ]);

    } else {

      setMessages(defaultMessage);

    }

  }, [selectedChat]);

  const sendQuestion = async (question) => {

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: question
    };

    setMessages(prev => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await api.post("/ask", {
        question
      });

      const assistantMessage = {
        id: Date.now() + Math.random(),
        role: "assistant",
        data: response.data
      };

      setMessages(prev => [...prev, assistantMessage]);

      setHistory(prev => {

        const filtered = prev.filter(
          chat => chat.question !== question
        );

        return [
          {
            question,
            response: response.data
          },
          ...filtered
        ];

      });

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          text:
            err.response?.data?.detail ||
            "❌ Error contacting backend."
        }
      ]);

    }

    setLoading(false);

  };

  return (

    <div className="flex flex-col flex-1 h-screen bg-gray-50">

      {/* Header */}

      <div className="h-16 bg-white border-b flex items-center px-8">

        <Database className="mr-3" />

        <h2 className="font-bold text-xl">

          AskSQL

        </h2>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto">

        <div className="max-w-4xl mx-auto px-6 py-8">

          <AnimatePresence>

            {messages.map((msg) => (

              <MessageBubble
                key={msg.id}
                role={msg.role}
              >

                {msg.text &&

                  <p>{msg.text}</p>

                }

                {msg.data &&

                  <div className="space-y-6">

                    <SQLCard sql={msg.data.sql} />

                    <ExplanationCard
                      explanation={msg.data.explanation}
                    />

                    <ResultsTable
                      results={msg.data.results}
                    />

                  </div>

                }

              </MessageBubble>

            ))}

          </AnimatePresence>

          {loading && (

            <MessageBubble role="assistant">

              <div className="flex gap-2">

                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>

                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: ".15s" }}
                ></div>

                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: ".3s" }}
                ></div>

              </div>

            </MessageBubble>

          )}

          <div ref={bottomRef}></div>

        </div>

      </div>

      {/* Sticky Prompt */}

      <div className="sticky bottom-0 bg-white">

        <PromptBox
          onSend={sendQuestion}
          loading={loading}
        />

      </div>

    </div>

  );

}

export default ChatWindow;