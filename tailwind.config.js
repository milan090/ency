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
    },
    stroke: (theme) => ({
      primary: theme("colors.primary"),
      accent: theme("colors.accent"),
    }),
  },
  variants: {
    extend: {
      display: ["focus", "hover", "group-focus", "group-hover"]
    },
  },
  plugins: [],
};
