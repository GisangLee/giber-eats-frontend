/** @type {import('tailwindcss').Config} */

const color = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      color: {
        lime: color.lime,
      },
      backgroundImage: {
        "food": "url('/public/images/food_photo.jpg')",
      },
    },
  },
  plugins: [],
}
