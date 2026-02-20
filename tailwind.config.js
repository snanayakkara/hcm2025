/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Updated color palette to match hex specifications
        primary: {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99f0fd',
          300: '#5de4fa',
          400: '#22d3f6',
          500: '#148792', // Main teal - your specified color
          600: '#0e6b75',
          700: '#0c5761',
          800: '#0d4750',
          900: '#103b44',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          50: '#f0fffe',
          100: '#ccfefd',
          200: '#99fdfb',
          300: '#5dfaf7',
          400: '#22f2ed',
          500: '#3bd7d6', // Bright cyan - your specified color
          600: '#2db5b4',
          700: '#259392',
          800: '#207675',
          900: '#1e6261',
        },
        sage: {
          50: '#f6f9f9',
          100: '#ecf1f1',
          200: '#d5e1e2',
          300: '#b1c9cb',
          400: '#86acaf',
          500: '#4a787d', // Muted teal - your specified color
          600: '#3e6469',
          700: '#355357',
          800: '#2f4649',
          900: '#2a3d40',
        },
        cream: {
          50: '#ffe4dd', // Very light peach - your specified color
          100: '#ffd3c2', // Peach - your specified color  
          200: '#fcdfbe', // Warm cream - your specified color
          300: '#fcd5b5', // Warm cream - your specified color
          400: '#ffe5b4', // Light peach - your specified color
          500: '#79e7e1', // Light cyan - your specified color
          600: '#f5c99b',
          700: '#eca978',
          800: '#e18a56',
          900: '#d6713a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        // Mobile-friendly touch targets
        '44': '2.75rem', // 44px minimum touch target
        '48': '3rem',    // 48px comfortable touch target
      },
      minHeight: {
        '44': '2.75rem', // 44px minimum touch target
        '48': '3rem',    // 48px comfortable touch target
      },
      minWidth: {
        '44': '2.75rem', // 44px minimum touch target
        '48': '3rem',    // 48px comfortable touch target
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};