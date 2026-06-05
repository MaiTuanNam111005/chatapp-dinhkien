import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { motion, AnimatePresence } from "framer-motion"; // Import thư viện

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 overflow-hidden relative">
      {/* Background decoration (Optional - tạo chiều sâu cho background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="flex items-center justify-center pt-20 px-4 z-10 relative">
        <motion.div
          // Animation lúc mới vào trang: Phóng to nhẹ và hiện dần
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-base-100/90 backdrop-blur-lg border border-base-300 rounded-lg shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden"
        >
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar tĩnh hoặc có thể thêm animation nhẹ nếu muốn */}
            <Sidebar />

            {/* Khu vực nội dung thay đổi động */}
            <div className="flex-1 flex flex-col h-full transition-all duration-300 ease-in-out">
              {/* AnimatePresence giúp animate component khi nó bị unmount (biến mất) */}
              <AnimatePresence mode="wait">
                {!selectedUser ? (
                  <motion.div
                    key="no-chat"
                    initial={{ opacity: 0, x: 20 }} // Trượt từ phải sang
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} // Trượt ra trái khi mất đi
                    transition={{ duration: 0.3 }}
                    className="flex-1 h-full"
                  >
                    <NoChatSelected />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`chat-${selectedUser._id}`} // Key thay đổi để trigger animation khi đổi user
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 h-full"
                  >
                    <ChatContainer />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;