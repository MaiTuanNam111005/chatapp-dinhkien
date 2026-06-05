import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // Import thư viện animation

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  // --- Animation Variants ---
  // Container tổng điều khiển nhịp độ xuất hiện của các con
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Nhanh hơn trang Login một chút vì form dài hơn
        delayChildren: 0.2,
      },
    },
  };

  // Hiệu ứng cho từng item (trượt từ dưới lên)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-200">
      {/* LEFT SIDE - FORM SECTION */}
      {/* Trượt từ trái sang để khớp với layout */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100"
      >
        <motion.div
          className="w-full max-w-md space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LOGO HEADER */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }} // Xoay nhẹ ngược chiều kim đồng hồ cho khác trang Login
                whileTap={{ scale: 0.95 }}
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <MessageSquare className="size-6 text-primary" />
              </motion.div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </motion.div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* FULL NAME INPUT */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  className={`input input-bordered w-full pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </motion.div>

            {/* EMAIL INPUT */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  className={`input input-bordered w-full pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </motion.div>

            {/* PASSWORD INPUT */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
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
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full shadow-lg hover:shadow-primary/40 transition-shadow"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          {/* FOOTER LINK */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary hover:text-primary-focus transition-colors font-semibold">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE - IMAGE PATTERN */}
      {/* Slide in từ phải để "gặp nhau" ở giữa */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="hidden lg:flex h-full"
      >
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </motion.div>
    </div>
  );
};
export default SignUpPage;