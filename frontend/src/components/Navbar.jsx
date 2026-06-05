import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg transition-all duration-300"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all group"
            >
              {/* Icon Container - Thêm hiệu ứng rung nhẹ khi hover */}
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              </div>

              {/* Text Brand - Đậm đà hơn */}
              <h1 className="text-lg font-bold tracking-tight text-base-content">
                Chatty
              </h1>
            </Link>
          </div>

          {/* ACTION BUTTONS SECTION */}
          <div className="flex items-center gap-2">

            {/* Settings Button */}
            <Link
              to={"/settings"}
              className="btn btn-sm btn-ghost gap-2 transition-colors hover:bg-base-200"
              title="Cài đặt"
            >
              <Settings className="w-4 h-4 text-base-content/70 group-hover:text-primary transition-colors" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile Button */}
                <Link
                  to={"/profile"}
                  className="btn btn-sm btn-ghost gap-2 transition-colors hover:bg-base-200"
                  title="Hồ sơ cá nhân"
                >
                  <User className="size-5 text-base-content/70" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                {/* Logout Button - Thiết kế riêng biệt để cảnh báo hành động thoát */}
                <button
                  className="btn btn-sm btn-ghost gap-2 text-error/80 hover:text-error hover:bg-error/10 transition-all duration-200 group"
                  onClick={logout}
                  title="Đăng xuất"
                >
                  {/* Icon di chuyển nhẹ sang phải khi hover báo hiệu 'rời đi' */}
                  <LogOut className="size-5 group-hover:translate-x-1 transition-transform" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;