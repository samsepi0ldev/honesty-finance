/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      dark: {
        25: '#292B2D',
        50: '#212325',
        75: '#161719',
        100: '#0D0E0F'
      },
      light: {
        20: '#91919F',
        40: '#E3E5E5',
        60: '#F1F1FA',
        80: '#FCFCFC',
        100: '#FFFFFF'
      },
      violet: {
        20: '#EEE5FF',
        40: '#D3BDFF',
        60: '#B18AFF',
        80: '#8F57FF',
        100: '#7F3DFF'
      },
      red: {
        20: '#FDD5D7',
        40: '#FDA2A9',
        60: '#FD6F7A',
        80: '#FD5662',
        100: '#FD3C4A'
      },
      green: {
        20: '#CFFAEA',
        40: '#93EACA',
        60: '#65D1AA',
        80: '#2AB784',
        100: '#00A86B'
      },
      yellow: {
        20: '#FCEED4',
        40: '#FCDDA1',
        60: '#FCCC6F',
        80: '#FCBB3C',
        100: '#FCAC12'
      },
      blue: {
        20: '#BDDCFF',
        40: '#8AC0FF',
        60: '#57A5FF',
        80: '#248Aff',
        100: '#0077FF'
      },
      background: {
        100: '#F6F6F6'
      }
    },
    extend: {
      fontFamily: {
        'inter-regular': ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold']
      }
    }
  },
  plugins: []
}
