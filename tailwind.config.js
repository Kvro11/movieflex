/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: '#3D0000',
        lightColor: '#f6f6f6',
        defaultTxt: "#C9C9C9",
      },
      backgroundImage: {
        bgGradient: "linear-gradient(to bottom, #3d0000, #000000)"
      },
      width: {
        95: '95%'
      }
    },
  },
  plugins: [],
}

