module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/pages/**/*.tsx",
      "./src/client/components/**/*.tsx",
      "./src/client/layouts/**/*.tsx",
    ],

    // PurgeCSS options
    options: {},
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    },
    extend: {
      colors: {
        "dark-blue": "#675DD9",

        // Primary Colors
        "primary-600": "#333333",
        "primary-500": "#505050",
        "primary-400": "#777777",
        "primary-300": "#C9CBCC",
        "primary-200": "#F3F3F3",
        "primary-150": "#F9F9F9",
        "primary-100": "#FFFFFF",

        // Accent Colors
        "acccent-violet": "#B34DF1",
        "accent-dblue": "#675DD9",
        "accent-lblue": "#6398FF",
        "accent-green": "#79D362",
        "accent-yellow": "#F9BC4A",
        "accent-red": "#FF6767",

        // Pastel Colors
        "pastel-violet": "#F4D6FF",
        "pastel-dblue": "#D6DDFF",
        "pastel-lblue": "#D4EDED",
        "pastel-green": "#D5F6BF",
        "pastel-yellow": "#FDF1C7",
        "pastel-red": "#FFE3E3",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "10xl": "104rem",
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        base: "0.25rem",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      lineHeight: {
        tighter: "1.1",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
      },
      width: {
        88: "22rem",
        92: "23rem",
      },
      fontSize: {
        "4.5xl": "2.75rem",
      },
    },
    stroke: (theme) => ({
      "accent-lblue": theme("colors.accent-lblue"),
      white: theme("colors.white"),
      black: theme("colors.black"),
    }),
  },
  variants: {
    extend: {
      display: ["focus", "hover", "group-focus", "group-hover"],
      stroke: ["hover", "group-hover"],
    },
  },
  plugins: [],
};
