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

  // --- SỬA LOGIC SCROLL ---
  // Chỉ cuộn xuống đáy khi:
  // 1. Mới vào đoạn chat (messages có dữ liệu)
  // 2. Có tin nhắn MỚI được thêm vào
  useEffect(() => {
    if (messageEndRef.current && messages) {
      // Dùng behavior "smooth" để mượt, nhưng cẩn thận nếu tin nhắn quá dài nó sẽ lag
      // scrollIntoView block: "end" giúp mép dưới tin nhắn hiện ra rõ ràng
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  // Lưu ý: Nếu muốn xịn hơn, ta cần logic "Sticky Scroll" (nếu đang lướt lên xem lịch sử thì không tự kéo xuống), 
  // nhưng logic đó khá phức tạp, logic hiện tại là đủ tốt cho app cơ bản.

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-base-100">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    // --- SỬA CSS LAYOUT ---
    // Loại bỏ 'overflow-auto' ở div cha này để tránh xung đột 2 thanh cuộn
    <div className="flex-1 flex flex-col bg-base-100 relative h-full max-h-screen">
      <ChatHeader />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] pointer-events-none" />

      {/* --- KHU VỰC HIỂN THỊ TIN NHẮN ---
         1. flex-1: Chiếm toàn bộ khoảng trống còn lại
         2. overflow-y-auto: Chỉ cuộn TRONG khu vực này
         3. min-h-0: Fix lỗi flexbox trên một số trình duyệt (quan trọng để scroll hoạt động)
      */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 relative z-10 min-h-0 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {messages.map((message, idx) => {
          const isMyMessage = message.senderId === authUser._id;
          const previousMessage = messages[idx - 1];
          const isSameSender = previousMessage?.senderId === message.senderId;

          return (
            <div
              key={message._id}
              className={`chat ${isMyMessage ? "chat-end" : "chat-start"} 
                ${!isSameSender ? "mt-4" : "mt-0.5"}
                animate-[fadeInUp_0.3s_ease-out] origin-bottom
              `}
            >
              {/* Avatar Logic */}
              <div className="chat-image avatar opacity-100 transition-opacity duration-300">
                <div className="size-10 rounded-full border border-base-300 shadow-sm overflow-hidden">
                  {/* Chỉ hiện avatar ở tin nhắn cuối cùng hoặc render luôn nhưng ẩn bằng CSS nếu cần logic phức tạp hơn */}
                  <img
                    src={
                      isMyMessage
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Header Time */}
              {!isSameSender && (
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1 font-medium">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              )}

              {/* Chat Bubble */}
              <div
                className={`chat-bubble flex flex-col shadow-md transition-all duration-200 hover:shadow-lg
                  ${isMyMessage
                    ? "bg-primary text-primary-content bg-gradient-to-br from-primary to-primary/80"
                    : "bg-base-200 text-base-content"
                  }
                  ${!isSameSender && isMyMessage ? "rounded-tr-2xl" : ""}
                  ${!isSameSender && !isMyMessage ? "rounded-tl-2xl" : ""}
                `}
              >
                {message.image && (
                  <div className="relative group rounded-md overflow-hidden mb-2">
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                {message.text && <p className="leading-relaxed">{message.text}</p>}
              </div>
            </div>
          );
        })}

        {/* Div mỏ neo để scroll xuống đáy */}
        <div ref={messageEndRef} className="h-1 w-full" />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;