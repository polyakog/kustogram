/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        fancy: ["Russo One"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
