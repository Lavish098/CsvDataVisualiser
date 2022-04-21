module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{
      '#2c3e50':'#2c3e50'
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
