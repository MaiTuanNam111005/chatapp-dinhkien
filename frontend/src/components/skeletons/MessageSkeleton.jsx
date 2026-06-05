import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Tạo mảng giả lập độ dài text ngẫu nhiên để tránh hiệu ứng "mã vạch"
  // Chúng ta dùng mẫu cố định để tránh lỗi Hydration của React
  const skeletonContacts = [
    { nameWidth: "w-32", msgWidth: "w-16" },
    { nameWidth: "w-24", msgWidth: "w-20" },
    { nameWidth: "w-28", msgWidth: "w-12" },
    { nameWidth: "w-36", msgWidth: "w-24" },
    { nameWidth: "w-20", msgWidth: "w-16" },
    { nameWidth: "w-32", msgWidth: "w-14" },
    { nameWidth: "w-28", msgWidth: "w-20" },
    { nameWidth: "w-24", msgWidth: "w-10" },
  ];

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">

      {/* Header Area - Tạo điểm nhấn thương hiệu */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          {/* Icon lắc nhẹ để báo hiệu ứng dụng đang hoạt động */}
          <div className="animate-pulse">
            <Users className="w-6 h-6 text-base-content/50" />
          </div>
          <span className="font-medium hidden lg:block text-base-content/50 animate-pulse">
            Contacts
          </span>
        </div>
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-3 space-y-2"> {/* Thêm space-y để thoáng mắt */}
        {skeletonContacts.map((item, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center gap-3 group px-5" // Tăng padding ngang
          >
            {/* Avatar skeleton với hiệu ứng Shimmer cao cấp */}
            <div className="relative mx-auto lg:mx-0 flex-shrink-0">
              <div className="size-12 rounded-full bg-base-300 relative overflow-hidden">
                {/* Lớp phủ Shimmer quét qua avatar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-100/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>

              {/* Giả lập chấm Online Status - Chi tiết nhỏ, giá trị lớn */}
              <div className="absolute bottom-0 right-0 size-3 bg-base-100 rounded-full flex items-center justify-center">
                <div className="size-2 bg-base-300 rounded-full animate-pulse" />
              </div>
            </div>

            {/* User info - Chỉ hiện trên Desktop */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">

              {/* Tên User - Dùng độ dài ngẫu nhiên từ mảng */}
              <div className={`h-4 ${item.nameWidth} bg-base-300 rounded relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-100/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"
                  style={{ animationDelay: '0.1s' }} // Chạy chậm hơn avatar 1 chút
                />
              </div>

              {/* Tin nhắn cuối/Trạng thái */}
              <div className={`h-3 ${item.msgWidth} bg-base-200 rounded relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-100/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"
                  style={{ animationDelay: '0.2s' }} // Chạy chậm hơn tên
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;