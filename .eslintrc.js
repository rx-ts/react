const { allowModules } = require('@1stg/eslint-config/_util')

module.exports = {
  extends: '@1stg',
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
