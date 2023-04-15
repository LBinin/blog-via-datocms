module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        midnight: {
          100: '#232222',
          200: '#171514',
        },
        theme: {
          red: '#e54d42',
          green: '#019E02',
        },
        // 宇宙探索编辑部
        journey: {
          100: '#B6D9B7',
          200: '#A3D1A4',
          300: '#89CC8B',
          400: '#6ABB65',
          500: '#33A131',
          600: '#019E02',
          700: '#109410',
          800: '#2F9130',
          900: '#3A8A41',
        }
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        me: '0 1px 1px rgba(0,0,0,.075), 0 2px 2px rgba(0,0,0,.075), 0 4px 4px rgba(0,0,0,.075), 0 8px 8px rgba(0,0,0,.075), 0 16px 16px rgba(0,0,0,.075)'
      },
      keyframes: {
        waving: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '10%': {
            transform: 'rotate(14deg)',
          },
          '20%': {
            transform: 'rotate(-8deg)',
          },
          '30%': {
            transform: 'rotate(14deg)',
          },
          '40%': {
            transform: 'rotate(-8deg)',
          },
          '50%': {
            transform: 'rotate(10deg)',
          },
          '60%': {
            transform: 'rotate(0deg)',
          },
          'to': {
            transform: 'rotate(0deg)',
          },
        },
      },
      typography: ({ theme }) => ({
        bigno: {
          css: {
            // '--tw-prose-body': "#71717a",
            '--tw-prose-invert-body': '#d4d4d4',
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            // '--tw-prose-invert-hr': "#404040", // 亮一点
            '--tw-prose-invert-hr': '#373737',
            '--tw-prose-invert-quote-borders': 'var(--post-content-theme)',
          },
        },
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.500'),
            img: {
              marginTop: '0',
              marginBottom: '0',
            },
          },
        },
        lg: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
