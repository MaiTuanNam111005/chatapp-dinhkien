import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Filter } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">

      {/* HEADER SECTION - Sticky & Glassmorphism */}
      <div className="border-b border-base-300 w-full p-5 sticky top-0 z-20 bg-base-100/80 backdrop-blur-lg">
        <div className="flex items-center gap-2 mb-2">
          <Users className="size-6 text-primary" />
          <span className="font-bold hidden lg:block text-lg">Contacts</span>
        </div>

        {/* Toggle Filter - Thiết kế lại dạng Switch hiện đại */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary rounded-md opacity-0 absolute"
            /* Ẩn checkbox thật, dùng UI custom hoặc DaisyUI toggle nếu muốn */
            />
            {/* Custom Toggle UI */}
            <div
              className={`w-8 h-4 rounded-full transition-colors duration-300 flex items-center px-0.5 
                ${showOnlineOnly ? 'bg-primary' : 'bg-base-300'}`}
              onClick={() => setShowOnlineOnly(!showOnlineOnly)} // Click giả lập
            >
              <div className={`size-3 bg-white rounded-full shadow-sm transform transition-transform duration-300
                    ${showOnlineOnly ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </div>

            <span className="text-sm font-medium text-base-content/70 group-hover:text-base-content transition-colors">
              Show online only
            </span>
          </label>
          <span className="text-xs text-base-content/40 ml-auto">
            {/* Hiển thị số lượng online thực tế */}
            {Math.max(0, onlineUsers.length - 1)} online
          </span>
        </div>
      </div>

      {/* USER LIST SECTION */}
      <div className="overflow-y-auto w-full py-3 space-y-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 transition-all duration-200 group
              hover:bg-base-200/50 
              ${selectedUser?._id === user._id ? "bg-base-300/60 border-l-4 border-primary pl-2" : "pl-3 border-l-4 border-transparent"}
            `}
          >
            {/* Avatar Container */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
              />

              {/* Online Indicator - Fix ring color theo theme */}
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-base-100 animate-pulse" // ring-base-100 để tiệp với nền
                />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate group-hover:text-primary transition-colors">
                {user.fullName}
              </div>
              <div className="text-sm text-base-content/50 truncate">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-500/80 font-medium">Online</span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </button>
        ))}

        {/* Empty State khi lọc không có ai */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-10 flex flex-col items-center gap-2">
            <Filter className="size-8 opacity-20" />
            <p className="text-sm">No online users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;