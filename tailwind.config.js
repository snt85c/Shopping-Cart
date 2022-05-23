module.exports = {
  darkMode: 'class',
  plugins: [require("daisyui"), require('flowbite/plugin')],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        newake: ["Newake", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"),require('flowbite/plugin')],
};
