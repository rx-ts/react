const { getGlobals } = require('eslint-plugin-mdx')

module.exports = {
  root: true,
  extends: '@1stg',
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: '.github/*.yml',
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    {
      files: 'packages/**/README.md',
      extends: 'plugin:mdx/overrides',
      globals: getGlobals(['ReactQriousDemo', 'ReactQrcodeDemo']),
      parserOptions: {
        extensions: '.md',
      },
    },
  ],
}
