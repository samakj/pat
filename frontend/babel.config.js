/** @format */

module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['react-app'],
    plugins: [
      'babel-plugin-styled-components',
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
          importSource: 'preact/compat',
        },
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
            'react/jsx-runtime': 'preact/jsx-runtime',
          },
        },
      ],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ],
  };
};
