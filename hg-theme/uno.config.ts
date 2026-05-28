import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      hg: {
        navy: '#003366',       
        royal: '#2D59A7',      
        medium: '#3B86D4',     
        light: '#BFE2F5',      
        red: '#CC1E4C',        
        purple: '#6E3191',     
        gray: '#EAEBED',       
        dark: '#424242',       
      }
    }
  },
  shortcuts: {
    'hg-title': 'text-[28px] font-bold text-hg-navy mb-6',
    'hg-cover-title': 'text-[36px] font-bold text-white mb-2',
    'hg-cover-subtitle': 'text-[18px] text-white',
    'hg-stat-box': 'bg-hg-gray rounded-md p-6 flex flex-col items-center justify-center text-center',
    'hg-stat-num': 'text-[32px] font-bold text-hg-navy',
    'hg-stat-label': 'text-[13px] text-hg-dark mt-2',
    'hg-card': 'bg-hg-gray rounded-md flex flex-col overflow-hidden',
    'hg-card-header': 'bg-hg-navy text-white font-bold text-[18px] px-4 py-3',
    'hg-card-body': 'px-4 py-4 text-[14px] text-hg-dark',
  }
})
