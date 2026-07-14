import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: { cyan: '#5ce1e6', purple: '#7c8cff', pink: '#e766ff', gold: '#f8cf62', green: '#69da8c', red: '#ff7d95' },
        panel: { DEFAULT: '#121722', '2': '#171d2a', border: '#273041' },
        bg: { DEFAULT: '#0b0d12', '2': '#10131a' }
      },
      fontFamily: { display: ['Clash Display', 'system-ui', 'sans-serif'], body: ['Satoshi', 'system-ui', 'sans-serif'] },
      animation: { 'fall': 'fallNote 0.6s ease forwards', 'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite', 'combo': 'comboAnim 0.4s ease' },
      keyframes: {
        fallNote: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 8px 2px #5ce1e680' }, '50%': { boxShadow: '0 0 20px 6px #5ce1e6cc' } },
        comboAnim: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.35)' }, '100%': { transform: 'scale(1)' } }
      }
    }
  },
  plugins: []
}
export default config
