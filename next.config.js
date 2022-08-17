require('dotenv').config()

/**
 * Stolen from https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
 */
const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  )
}

// Overrides for css-loader plugin
function cssLoaderOptions(modules) {
  // const { getLocalIdent, ...others } = modules // Need to delete getLocalIdent else localIdentName doesn't work
  return {
    ...modules,
    // ...others,
    localIdentName: '[hash:base64:6]',
    exportLocalsConvention: 'camelCaseOnly',
    mode: 'local',
  }
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN:
      process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
  },
  webpack: config => {
    const oneOf = config.module.rules.find(
      rule => typeof rule.oneOf === 'object'
    )

    if (oneOf) {
      // Find the module which targets *.scss|*.sass files
      const moduleSassRule = oneOf.oneOf.find(rule =>
        regexEqual(rule.test, /\.module\.(scss|sass)$/)
      )

      if (moduleSassRule) {
        // Get the config object for css-loader plugin
        const cssLoader = moduleSassRule.use.find(({ loader }) =>
          loader.includes('css-loader')
        )
        if (cssLoader) {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules),
          }
        }
      }
    }

    return config
  },
}
