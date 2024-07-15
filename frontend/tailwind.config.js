/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backg1': "url('./assets/hh.png')",
        'backg2': "url('./assets/ff.png')",
        'backg3': "url('./assets/gg.png')",
        'regbg': "url('./assets/aa.png')"
      },
      backgroundSize: {
        'stretch': '100% 100%',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

