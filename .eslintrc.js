module.exports = {
  env: {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true
  },
  rules: {
    indent: [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ]
  }
}