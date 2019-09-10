const fs = require('fs')
const path = require('path')
const { overrides } = require('@1stg/eslint-config/overrides')

module.exports = {
  extends: '@1stg',
  overrides: [
    ...overrides,
    {
      files: '**/docs/*.tsx',
      settings: {
        node: {
          allowModules: fs
            .readdirSync('packages')
            .map(
              pkg =>
                require(path.resolve('packages', pkg, 'package.json')).name,
            )
            .concat(['classnames', 'lodash-es', 'react-dom']),
        },
      },
    },
  ],
  settings: {
    polyfills: ['Array.from', 'Object.assign', 'Object.entries'],
  },
}
