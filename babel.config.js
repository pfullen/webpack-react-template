// Cannot load "react-refresh/babel" in production
const plugins = [];
//

module.exports = {
  presets: [
    '@babel/preset-env',
    // Runtime automatic with React 17+ allows not importing React
    // in files only using JSX (no state or React methods)
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: plugins,
};
