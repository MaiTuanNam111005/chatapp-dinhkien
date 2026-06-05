import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Kiểm tra online status để code gọn hơn
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    // Thêm backdrop-blur và sticky để header luôn nổi bên trên tin nhắn
    <div className="p-3 border-b border-base-300 w-full sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar Area */}
          <div className="relative group cursor-pointer">
            <div className="avatar">
              <div className="size-12 rounded-full relative transition-transform duration-300 group-hover:scale-105 ring-2 ring-transparent group-hover:ring-primary/50">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Status Dot - Chỉ hiện khi online */}
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-base-100 rounded-full animate-pulse shadow-sm">
                {/* Lớp màu xanh mờ lan tỏa nhẹ ra ngoài */}
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
              </span>
            )}
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/70">
              {selectedUser.fullName}
            </h3>
            <p className={`text-xs font-medium flex items-center gap-1.5 ${isOnline ? "text-green-500" : "text-base-content/60"}`}>
              {/* Logic hiển thị trạng thái tinh tế hơn */}
              {isOnline ? (
                <>
                  <span className="size-1.5 rounded-full bg-green-500 inline-block" />
                  Đang hoạt động
                </>
              ) : (
                "Ngoại tuyến"
              )}
            </p>
          </div>
        </div>

        {/* Close button - Tăng trải nghiệm người dùng với vùng bấm rộng hơn và hiệu ứng hover */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-ghost btn-circle transition-colors duration-200 hover:bg-base-300 text-base-content/60 hover:text-base-content"
          title="Đóng đoạn chat" // Tooltip mặc định của browser
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;