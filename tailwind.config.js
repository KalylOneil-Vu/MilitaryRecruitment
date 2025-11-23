/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'army-black': '#0a0a0a',
        'army-dark': '#111111',
        'army-olive': '#4a5d23',
        'army-olive-dark': '#3a4d13',
        'army-olive-light': '#5a6d33',
        'army-gold': '#d4af37',
        'army-gold-dark': '#b4952a',
        'army-gold-light': '#e4bf47',
        'hud-green': '#00ff41',
        'hud-green-dim': '#00aa2a',
      },
      fontFamily: {
        'tactical': ['Rajdhani', 'Orbitron', 'system-ui', 'sans-serif'],
        'hud': ['Share Tech Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #d4af37, 0 0 10px #d4af37' },
          '100%': { boxShadow: '0 0 20px #d4af37, 0 0 30px #d4af37, 0 0 40px #d4af37' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
