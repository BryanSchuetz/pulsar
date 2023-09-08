/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        'SignalPurp': '#7F69F5',
        'SignalTeal': '#92FEE4',
        'SignalGreen': '#97FF7D',
        'SignalYellow': '#FFFF80',
        'SignalOrange': '#F4C179',
        'SignalRed': '#ED8673',
        'SignalPink': '#EA6FAF',
        'SignalBlack': '#1A1921',
      },
    },
	},
	plugins: [],
}
