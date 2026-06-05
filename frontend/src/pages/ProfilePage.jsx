import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2 } from "lucide-react"; // Thêm Loader2
import { motion } from "framer-motion";

const ProfilePage = () => {
  
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Variants cho hiệu ứng xuất hiện tuần tự
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15, // Các phần tử con hiện cách nhau 0.15s
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-screen pt-20 overflow-auto bg-base-200"> {/* Thêm overflow-auto để tránh lỗi layout trên màn nhỏ */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-2xl mx-auto p-4 py-8"
      >
        <div className="bg-base-100 rounded-xl p-6 space-y-8 shadow-xl border border-base-300">

          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              Profile
            </h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </motion.div>

          {/* Avatar Upload Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
            <div className="relative group">
              {/* Hình ảnh Avatar */}
              <motion.div
                // Key thay đổi để trigger animation khi ảnh đổi
                key={selectedImg || authUser.profilePic}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative"
              >
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className={`size-32 rounded-full object-cover border-4 border-base-200 shadow-lg ${isUpdatingProfile ? "opacity-50" : ""
                    }`}
                />

                {/* Loading overlay khi đang upload - UX quan trọng */}
                {isUpdatingProfile && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full z-10">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </motion.div>

              {/* Nút Upload Camera */}
              <motion.label
                whileHover={{ scale: 1.1, rotate: 10 }} // Hiệu ứng lắc nhẹ khi hover
                whileTap={{ scale: 0.9 }}
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary-focus
                  p-2.5 rounded-full cursor-pointer 
                  shadow-lg border-2 border-base-100
                  transition-colors duration-200
                  z-20
                  ${isUpdatingProfile ? "pointer-events-none opacity-50" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-content" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </motion.label>
            </div>

            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </motion.div>

          {/* Form Fields Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <motion.p
                whileHover={{ scale: 1.01, x: 5 }} // Micro-interaction: trượt nhẹ khi hover
                className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300"
              >
                {authUser?.fullName}
              </motion.p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <motion.p
                whileHover={{ scale: 1.01, x: 5 }}
                className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300"
              >
                {authUser?.email}
              </motion.p>
            </div>
          </motion.div>

          {/* Account Info Section */}
          <motion.div
            variants={itemVariants}
            className="mt-6 bg-base-300/50 rounded-xl p-6 shadow-inner"
          >
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }} // Xuất hiện sau cùng
                className="flex items-center justify-between py-2 border-b border-zinc-700/50"
              >
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between py-2"
              >
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
export default ProfilePage;