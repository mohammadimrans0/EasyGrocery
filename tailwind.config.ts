import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#77b91e", // Set your custom primary color here
        // Optionally, you can also set the foreground color if needed
        "primary-foreground": "#ffffff", // For example, white text on primary color
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
