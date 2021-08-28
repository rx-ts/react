const { getGlobals } = require('eslint-plugin-mdx')

module.exports = {
  extends: '@1stg',
  overrides: [
    {
      files: '*.md',
      extends: 'plugin:mdx/overrides',
      globals: getGlobals(['ReactQriousDemo', 'ReactQrcodeDemo']),
      parserOptions: {
        extensions: '.md',
      },
      rules: {
        'react/jsx-no-target-blank': 0,
      },
    },
  ],
}
