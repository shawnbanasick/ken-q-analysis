/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "corporate", "emerald", "synthwave"],
    styled: true,
    // themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
