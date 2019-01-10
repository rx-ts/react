const config = {
  plugins: {
    autoprefixer: null,
  },
}

if (process.env.NODE_ENV) {
  config.plugins.cssnano = null
}

module.exports = config
