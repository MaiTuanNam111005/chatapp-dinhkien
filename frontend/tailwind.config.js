import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // --- Phần Animation bắt đầu ---
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' }, // Bắt đầu từ bên ngoài bên trái
          '100%': { transform: 'translateX(100%)' }, // Quét sang bên phải
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite', // Class sử dụng: animate-shimmer
      },
      // --- Phần Animation kết thúc ---
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};