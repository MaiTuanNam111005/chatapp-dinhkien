import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion"; // Import thư viện

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  // Định nghĩa các biến thể animation (Variants) để code gọn gàng hơn
  // Parent container sẽ điều khiển việc xuất hiện tuần tự của con
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Mỗi phần tử con hiện cách nhau 0.1s
        delayChildren: 0.2,
      },
    },
  };

  // Animation cho từng phần tử con (trượt nhẹ từ dưới lên)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-200">
      {/* Left Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100"
      >
        <motion.div
          className="w-full max-w-md space-y-8"
          variants={containerVariants} // Áp dụng stagger
          initial="hidden"
          animate="visible"
        >
          {/* Logo Section */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }} // Micro-interaction khi hover
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </motion.div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }} // Phóng to nhẹ khi focus -> Tăng trải nghiệm nhập liệu
                  type="email"
                  className={`input input-bordered w-full pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }} // Hiệu ứng nổi lên khi hover
              whileTap={{ scale: 0.98 }}   // Hiệu ứng lún xuống khi click (rất quan trọng cho cảm giác thật)
              type="submit"
              className="btn btn-primary w-full shadow-lg hover:shadow-primary/40 transition-shadow"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary hover:text-primary-focus transition-colors font-semibold">
                Create account
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Side - Image/Pattern */}
      {/* Slide in from right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="hidden lg:flex h-full"
      >
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={"Sign in to continue your conversations and catch up with your messages."}
        />
      </motion.div>
    </div>
  );
};
export default LoginPage;