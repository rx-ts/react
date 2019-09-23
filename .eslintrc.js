const { allowModules } = require('@1stg/eslint-config/_util')

module.exports = {
  extends: '@1stg/eslint-config/recommended',
  settings: {
    polyfills: ['Array.from', 'Object.assign', 'Object.entries'],
  },
  overrides: [
    {
      files: '**/docs/*.tsx',
      settings: {
        node: {
          allowModules: allowModules.concat(
            'classnames',
            'lodash-es',
            'react-dom',
          ),
        },
      },
    },
  ],
}
