module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1000,
      viewportHeight: 680,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
    },
  },
};
