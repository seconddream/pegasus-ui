import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pegasus-ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.slate[700],
        ['primary-hover']: colors.slate[600],
        ['primary-active']: colors.slate[800],
        ['primary-light']: colors.slate[200],
        secondary: colors.white,
        ['secondary-hover']: colors.slate[100],
        ['secondary-active']: colors.slate[200],
        ['secondary-light']: colors.white,
        success: colors.emerald[500],
        ['success-hover']: colors.emerald[400],
        ['success-active']: colors.emerald[600],
        ['success-light']: colors.emerald[200],
        error: colors.red[500],
        ['error-hover']: colors.red[500],
        ['error-active']: colors.red[700],
        ['error-light']: colors.red[200],
        warning: colors.amber[500],
        ['warning-hover']: colors.amber[400],
        ['warning-active']: colors.amber[600],
        ['warning-light']: colors.amber[200],
        disabled: colors.slate[300],
        danger: colors.rose[500],
        ['danger-hover']: colors.rose[400],
        ['danger-active']: colors.rose[600],
        ['danger-light']: colors.rose[200],
        // border
        ['dark-line']: colors.slate[300],
        ['light-line']: colors.slate[200],
        // content
        ['emphasized-content']: colors.slate[900],
        ['content']: colors.slate[700],
        ['disabled-content']: colors.slate[400],
        ['deemphasized-content']: colors.slate[400],
        // foucs
        highlight: colors.indigo[300],
      },
      keyframes: {
        signal: {
          from: {
            ['box-shadow']:
              '0 0 1px 2px rgb(165 180 252),0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
          to: {
            ['box-shadow']:
              '0 0 4px 4px rgb(255, 255, 255, 0),0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
        fadein: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        fadeout: {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
        slideup: {
          from: {
            opacity: '0',
            transform: 'translateY(4px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        slidedown: {
          from: {
            opacity: '0',
            transform: 'translateY(-4px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        centeredslideup: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, 4px)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%, 0px)',
          },
        },
        centeredslidedown: {
          from: {
            opacity: '0',
            transform: 'translate(-50%,-4px)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%,0px)',
          },
        },
      },
      animation: {
        signal: 'signal 300ms ease forwards',
        ['fade-in']: 'fadein 150ms ease forwards',
        ['fade-out']: 'fadeout 150ms ease forwards',
        ['slide-up']: 'slideup 150ms ease inherit',
        ['slide-down']: 'slidedown 150ms ease none',
        ['centered-slide-up']: 'centeredslideup 150ms ease inherit',
        ['centered-slide-down']: 'centeredslidedown 150ms ease none',
      },
    },
  },
  plugins: [],
}
export default config
