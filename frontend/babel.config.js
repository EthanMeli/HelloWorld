module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-paper/babel',
      {
        env: process.env.NODE_ENV,
      },
    ],
  ],
};
