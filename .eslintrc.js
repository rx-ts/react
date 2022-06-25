const { getGlobals } = require('eslint-plugin-mdx')

module.exports = {
  root: true,
  extends: '@1stg',
  overrides: [
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
