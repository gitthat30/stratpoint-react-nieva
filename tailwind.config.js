/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        "card-background": "rgba(var(--card-background))",
        "card-background-shade": "rgba(var(--card-background-shade))",
        sidebar: "rgba(var(--sidebar))",
        "sidebar-hover": "rgba(var(--sidebar-hover))",
        "sidebar-highlighted": "rgba(var(--sidebar-highlighted))",
        header: "rgba(var(--header))",
        "header-text": "rgba(var(--header-text))",
        "card-header": "rgba(var(--card-header))",
        border: "rgba(var(--border))",
        "card-text": "rgba(var(--card-text))",
        "card-text-small": "rgba(var(--card-text-small))",
        "currency-background": "rgba(var(--currency-background))",
        "currency-text": "rgba(var(--currency-text))",
        "button": "rgba(var(--button))",
        "button-hover": "rgba(var(--button-hover))",
        "button-text": "rgba(var(--button-text))",
        "currency-button": "rgba(var(--currency-button))",
        "currency-button-hover": "rgba(var(--currency-button-hover))"
      }
    },
  },
  plugins: [],
}

