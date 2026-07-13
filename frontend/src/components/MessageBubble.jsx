import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

function MessageBubble({ role, children }) {

    const isUser = role === "user";

    return (

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.35,
                ease: "easeOut"
            }}
            className={`flex mb-8 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >

            {/* Assistant Avatar */}

            {!isUser && (

                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3 flex-shrink-0">

                    <Bot size={18} />

                </div>

            )}

            {/* Message */}

            <div
                className={`max-w-4xl rounded-2xl px-6 py-5 shadow-sm ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                }`}
            >

                {children}

            </div>

            {/* User Avatar */}

            {isUser && (

                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white ml-3 flex-shrink-0">

                    <User size={18} />

                </div>

            )}

        </motion.div>

    );

}

export default MessageBubble;