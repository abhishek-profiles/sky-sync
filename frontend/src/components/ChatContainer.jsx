import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative h-full bg-gradient-to-b from-base-100 to-base-200/30">
      <ChatHeader />
    
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div className="flex items-end gap-3 max-w-[85%]">
              {message.senderId !== authUser._id && (
                <div className="avatar cursor-pointer" onClick={() => setShowProfileModal(true)}>
                  <div className="size-8 rounded-full ring-2 ring-base-300 hover:ring-accent transition-all transform hover:scale-105">
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <div
                className={`
                  flex flex-col gap-1 rounded-2xl px-4 py-2.5 shadow-lg
                  ${message.senderId === authUser._id
                    ? "bg-gradient-to-br from-accent to-primary text-white"
                    : "bg-base-300"}
                `}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[240px] rounded-xl shadow-md"
                  />
                )}
                {message.text && (
                  <p className="text-sm">{message.text}</p>
                )}
                <time className={`text-[10px] ${message.senderId === authUser._id ? "text-white/70" : "text-base-content/60"}`}>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    
      <div className="sticky bottom-0 bg-base-100 border-t border-base-300">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;
