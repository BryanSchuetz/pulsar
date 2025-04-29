/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        'SignalPurp': '#855fbf',
        'SignalTeal': '#007e90',
        'SignalGreen': '#008504',
        'SignalYellow': '#FFFF80',
        'SignalOrange': '#a0651b',
        'SignalRed': '#d82f39',
        'SignalPink': '#c13f8e',
        'SignalBlack': '#282A36',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '"["' },
            'code::after': { content: '"]"' },
          },
        },
      },
    },
	},
	plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}
