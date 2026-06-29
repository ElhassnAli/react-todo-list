/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0b1220",
        },
      },
      boxShadow: {
        glow: "0 8px 30px rgba(2, 6, 23, 0.6)",
      },
    },
  },
  plugins: [],
};
