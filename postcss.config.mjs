/** @type {import('postcss-load-config').Config} */
import selectorParser from 'postcss-selector-parser'
import postcssImport from 'postcss-import'
import attributeCaseInsensitive from 'postcss-attribute-case-insensitive'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

function processHexSelectors() {
  return {
    postcssPlugin: 'process-hex-selectors',
    prepare() {
      return {
        OnceExit(root) {
          root.walkRules((rule) => {
            try {
              const processor = selectorParser((selectors) => {
                selectors.walk((selector) => {
                  if (selector.type === 'attribute') {
                    // Handle hex values in attribute selectors
                    if (selector.value && selector.value.includes('#')) {
                      selector.setValue(selector.value.replace(/#/g, '\\#'))
                    }
                  }
                })
              })

              // Process and update the selector
              const processed = processor.processSync(rule.selector)
              rule.selector = processed
            } catch (error) {
              console.warn('Selector processing error:', error)
            }
          })
        },
      }
    },
  }
}
processHexSelectors.postcss = true

export default {
  parser: 'postcss-safe-parser',
  plugins: [
    processHexSelectors(),
    postcssImport,
    attributeCaseInsensitive({
      preserveAttributes: true,
    }),
    tailwindcss,
    autoprefixer,
  ],
}
