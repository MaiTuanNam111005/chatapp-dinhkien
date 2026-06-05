import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 relative overflow-hidden">

      {/* Background decoration - Tạo chiều sâu không gian */}
      {/* Tái sử dụng pattern chấm bi mờ từ ChatContainer để tạo sự đồng bộ */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-md text-center space-y-6 relative z-10">
        {/* Icon Display với hiệu ứng Floating & Ripple */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative group">

            {/* Layer 1: Hộp Icon chính - Thêm animation float thủ công bằng CSS inline hoặc class custom */}
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative z-10 
              animate-[bounce_2s_infinite] shadow-lg group-hover:scale-110 transition-transform duration-300"
            >
              <MessageSquare className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
            </div>

            {/* Layer 2: Hiệu ứng sóng lan toả (Ripple) - Nằm sau icon */}
            {/* Vòng sóng 1 */}
            <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-ping" style={{ animationDuration: '2s' }} />

            {/* Vòng sóng 2 (Chậm hơn) - Tạo độ dày cho hiệu ứng */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl animate-pulse delay-75" />
          </div>
        </div>

        {/* Welcome Text - Typography đẹp hơn */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight animate-[fadeInUp_0.5s_ease-out]">
            Welcome to Chatty!
          </h2>
          <p className="text-base-content/60 max-w-xs mx-auto animate-[fadeInUp_0.7s_ease-out]">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;