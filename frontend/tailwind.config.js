import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#334155',
        accent: '#3B82F6',
        neutral: '#1F2937',
        'base-100': '#0F172A',
        'base-200': '#1E293B',
        'base-300': '#334155',
        info: '#3B82F6',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#1E293B',
          secondary: '#334155',
          accent: '#3B82F6',
          neutral: '#1F2937',
          'base-100': '#0F172A',
          'base-200': '#1E293B',
          'base-300': '#334155',
          info: '#3B82F6',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
    ],
  },
};
