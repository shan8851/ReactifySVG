import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
       deepCharcoal: '#2B2B2B',
       lightGray: '#3E3E3E',
       black: '#000000',
       white: '#FFFFFF',
       typography: '#C0C0C0',
       slateGray: '#1E1E1E',
       green: '#19BD64'
      },
    },
  },
  plugins: [],
} satisfies Config;
