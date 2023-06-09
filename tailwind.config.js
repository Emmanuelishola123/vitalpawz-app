module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      regular:
        'PlusJakartaSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    extend: {
      colors: {
        orange: '#f8b84a',
        'light-orange': '#faefe2',
        'more-light-orange': '#f8b84a17',
        pink: '#ea3e70',
        'light-pink': '#ffecf1',
        purple: '#4a2072',
        'dark-purple': '#cfc2dc',
        'light-purple': '#fbf7ff',
        'active-purple': '#f0eaf7',
        'lighter-black': '#262624',
        'more-lighter-black': '#494949',
        'middle-black': '#2d2d2b',
        'more-middle-black': '#444346',
        'dark-black': '#333',
        'even-more-lighter-gray': '#e3e3e3',
        'more-lighter-gray': '#d7d7d7',
        'lighter-gray': '#909090',
        'more-darker-gray': '#303030',
        'darker-gray': '#5b5b5b',
        'dark-gray': '#2c3137',
        'darker-white': '#f5f5f5',
        'auth-bg-top': '#793bb7',
        'auth-bg-bottom': '#4a2072',
        'middle-white': '#a6a6a6',
        medium_black: '#3d3d3d',
        light_black: '#6d7278',
        'dark-white': '#e7e7e7',
        'dark-green': '#51ac5c',
        'medium-white': '#e8e8e8',
        negative: '#ff5857',
        'full-black': '#000',
      },
      spacing: {
        '7px': '7px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '17px': '17px',
        '18px': '18px',
        '19px': '19px',
        '20px': '20px',
        '21px': '21px',
        '25px': '25px',
        '29px': '29px',
        '31px': '31px',
        '50px': '50px',
        '55px': '55px',
        '57px': '57px',
        '80px': '80px',
        '270px': '270px',
        '510px': '510px',
        50: '200px',
      },
      fontSize: {
        '15px': '15px',
        '16px': '16px',
        '19px': '19px',
        '22px': '22px',
        '23px': '23px',
        '32px': '32px',
        '40px': '40px',
        '34px': '34px',
      },
      lineHeight: {
        or: '1.94',
        auth_bottom: '2.08',
        sub_heading: '1.39',
      },
      letterSpacing: {
        or: '1.64px',
      },
      minHeight: {
        auth_h: '980px',
      },
      maxWidth: {
        forget_modal: '528px',
      },
      boxShadow: {
        product: '0 5px 10px 5px rgba(0, 0, 0, 0.3)',
        btnPrimarySmall: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
