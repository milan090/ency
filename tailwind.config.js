module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#4B5EB2",
        accent: "#FFDC60",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "10xl": "104rem",
      },
      borderWidth: {
        3: "3px"
      }
    },
    stroke: (theme) => ({
      primary: theme("colors.primary"),
      accent: theme("colors.accent"),
      white: theme("colors.white"),
      black: theme("colors.black"),
      "blue-500": theme("colors.blue.500"),
      "red-500": theme("colors.red.500")
    }),
  },
  variants: {
    extend: {
      display: ["focus", "hover", "group-focus", "group-hover"],
      stroke: ["hover", "group-hover"]
    },
  },
  plugins: [],
};
