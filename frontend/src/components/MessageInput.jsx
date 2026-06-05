import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-100/80 backdrop-blur-sm border-t border-base-300/50">
      {/* Wrapper bên ngoài có backdrop-blur để tạo cảm giác input đang "trôi" 
          trên nội dung chat nếu có scroll quá dài 
       */}

      {/* Khu vực Preview Ảnh - Hiển thị tinh tế hơn */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-[fadeInUp_0.3s_ease-out]">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-base-300 shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-content text-base-100
              flex items-center justify-center shadow-md hover:bg-error transition-colors duration-200"
              type="button"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        {/* Input Container - Bo tròn mạnh (rounded-full) và gộp nút ảnh vào trong */}
        <div className="flex-1 flex gap-2 items-center bg-base-200/50 rounded-3xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-base-200 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">

          {/* Image Upload Button */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle btn-ghost btn-sm
                     ${imagePreview ? "text-emerald-500" : "text-base-content/50 hover:text-primary"}`}
            onClick={() => fileInputRef.current?.click()}
            title="Gửi ảnh"
          >
            <Image size={20} className="transition-transform duration-200 hover:scale-110" />
          </button>

          {/* Text Input - Trong suốt, không viền để hòa nhập vào container cha */}
          <input
            type="text"
            className="w-full bg-transparent border-none focus:ring-0 text-base-content placeholder:text-base-content/40 h-10 px-0"
            placeholder="Nhập tin nhắn..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Send Button - Tách rời để tạo điểm nhấn hành động */}
        <button
          type="submit"
          className={`btn btn-circle shadow-md transition-all duration-300 
            ${(text.trim() || imagePreview)
              ? "btn-primary scale-100 rotate-0"
              : "btn-disabled bg-base-200 text-base-content/20 scale-90"
            }
          `}
          disabled={!text.trim() && !imagePreview}
        >
          {/* Icon Send được căn chỉnh lại một chút cho cân đối thị giác */}
          <Send size={20} className={`ml-0.5 ${(text.trim() || imagePreview) ? "animate-pulse" : ""}`} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;