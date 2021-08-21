const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Titillium Web', ...defaultTheme.fontFamily.sans],
        mono: ['Source Code Pro', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
