/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': "url('./assets/bg.png')",
        'backg2': "url('./assets/ff.png')",
        'backg3': "url('./assets/gg.png')",
        'regbg': "url('./assets/aa.png')"
      },
      backgroundSize: {
        'stretch': '100% 100%',
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          overflow: 'hidden', // Prevents scroll
        },
        '.scrollbar-hidden::-webkit-scrollbar': {
          display: 'none', // Safari and Chrome
        },
        '.scrollbar-hidden': {
          '-ms-overflow-style': 'none', // Internet Explorer and Edge
          'scrollbar-width': 'none', // Firefox
        },
      });
    },
  ]
}
