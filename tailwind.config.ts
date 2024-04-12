import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgGrey: "rgba(244, 245, 250, 1)",
        textFieldBorder: "rgba(207, 211, 212, 1)",
        primaryGreen: "rgba(45, 216, 154, 1)",
        greySecondary: "#8B8D97",
        black50: "#53545C",
        black30: "#8B8D97",
      },
      fontSize: {
        20: "20px",
      },
      borderRadius: {
        12: "12px",
        8: "8px",
        4: "4px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
