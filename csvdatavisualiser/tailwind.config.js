module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
      screens: {
        xl: '1440px',
      },
    extend: {},
    colors:{
      'void':'#0E0B16',
      'stark':'#e7dfdd',
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
    },
    borderRadius: {
      '20px': '20px',
      '30px': '30px',
      '40px': '40px',
      '50px': '50px',
      '70px': '70px'
    },
    lineHeight: {
      '50px': '50px',
      '40px': '40px'
    },
    screens:{
      'sm': '500px',
      'smm': '576px',
      'md': '768px',
      'lg': '990px'
    },
    boxShadow:{
      '4x1': '0 2px 48px 0 rgb(0 0 0 / 10%)',
  
    },
    
  },
  variants: {
    extend: {
      borderWidth: ['last']
    },
    border:['hover'],
    borderStyle: ['hover']
  },
  plugins: [],
}
