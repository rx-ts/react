const { allowModules } = require('@1stg/eslint-config/_util')
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
    {
      files: '**/docs/*.tsx',
      settings: {
        node: {
          allowModules: allowModules.concat(
            'classnames',
            'lodash',
            'react-dom',
          ),
        },
      },
    },
  ],
}
