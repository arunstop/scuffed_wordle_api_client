module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwind-animatecss'),
  ],
  // Daisy UI config theme
  daisyui: {
    styled: true,
    themes: [{
      corporate: {
        ...require('daisyui/src/colors/themes')["[data-theme=corporate]"],
        "--rounded-box": "0.42rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.42rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge": "0.42rem", // border radius rounded-badge utility class, used in badges and similar
        "--animation-btn": "0.3s", // duration of animation when you click on button
        "--animation-input": "0.3s", // duration of animation for inputs like checkbox, toggle, radio, etc
        "--btn-focus-scale": "0.9", // scale transform of button when you focus on it
        "--btn-text-case": "uppercase", // set default text transform for buttons
        "--border-btn": "1px", // border width of buttons
        "--tab-border": "1px", // border width of tabs
        "--tab-radius": "0.5rem", // border radius of tabs
      },
      business: {
        ...require('daisyui/src/colors/themes')["[data-theme=business]"],
        "--rounded-box": "0.42rem", // border radius rounded-box utility class, used in card and other large boxes
        "--rounded-btn": "0.42rem", // border radius rounded-btn utility class, used in buttons and similar element
        "--rounded-badge": "0.42rem", // border radius rounded-badge utility class, used in badges and similar
        "--animation-btn": "0.3s", // duration of animation when you click on button
        "--animation-input": "0.3s", // duration of animation for inputs like checkbox, toggle, radio, etc
        "--btn-focus-scale": "0.9", // scale transform of button when you focus on it
        "--btn-text-case": "uppercase", // set default text transform for buttons
        "--border-btn": "1px", // border width of buttons
        "--tab-border": "1px", // border width of tabs
        "--tab-radius": "0.5rem", // border radius of tabs
      },
    }],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    // darkTheme: "business",
  },
}
