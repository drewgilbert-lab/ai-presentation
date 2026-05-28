import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      hg: {
        navy: '#003366',       // Primary Dark
        royal: '#2D59A7',      // Primary Mid
        medium: '#3B86D4',     // Primary Light
        light: '#BFE2F5',      // Highlight
        red: '#CC1E4C',        // Accent ONLY
        purple: '#6E3191',     // Accent ONLY
        gray: '#EAEBED',       // Background Light Gray
        dark: '#424242',       // Base Dark Text
      }
    },
    fontFamily: {
      sans: '"Nunito Sans", Arial, sans-serif',
    }
  },
  shortcuts: {
    // Structural Backgrounds
    'bg-cover-slide': 'bg-hg-navy text-white',
    'bg-content-slide': 'bg-white text-hg-dark',
    'bg-divider-slide': 'bg-hg-navy text-white flex flex-col justify-center items-center',
    
    // Slide Titles
    'hg-title': 'text-[28px] font-bold text-hg-navy mb-6',
    'hg-cover-title': 'text-[36px] font-bold text-white mb-2',
    'hg-cover-subtitle': 'text-[18px] text-white',

    // Component: Stat Box
    'hg-stat-box': 'bg-hg-gray rounded-md p-6 flex flex-col items-center justify-center text-center',
    'hg-stat-num': 'text-[32px] font-bold text-hg-navy',
    'hg-stat-label': 'text-[13px] text-hg-dark mt-2',

    // Component: Cards
    'hg-card': 'bg-hg-gray rounded-md flex flex-col overflow-hidden',
    'hg-card-header': 'bg-hg-navy text-white font-bold text-[18px] px-4 py-3',
    'hg-card-body': 'px-4 py-4 text-[14px] text-hg-dark',

    // Callout Panels
    'hg-panel-navy': 'bg-hg-navy text-white p-8',
    'hg-panel-royal': 'bg-hg-royal text-white p-8'
  }
})
