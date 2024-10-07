module.exports = {
  rules: {
    'check-cn-classes': {
      meta: {
        name: 'check-cn-classes',
        version: '1.0.4',
        type: 'problem',
        docs: {
          description:
            'Ensure valid Tailwind class names passed to cn function',
          category: 'Stylistic Issues',
        },
        fixable: null,
        schema: [
          {
            type: 'object',
            properties: {
              prependCustomPrefix: {
                type: 'string',
                description:
                  'The custom prefix that class names should start with.',
              },
            },
            additionalProperties: false,
          },
        ], // Now accepts a schema for configuration
      },
      create(context) {
        // Define the function name that we are checking (cn)
        const functionName = 'cn'

        // Get user options and set default prefix to 'in--' if none is provided
        const options = context.options[0] || {}
        const requiredPrefix = options.prependCustomPrefix || 'in--'

        // Function to validate if a class name part is valid (after split by ':')
        function isValidClassPart(part) {
          // Allow arbitrary values inside brackets (e.g., data-[state=closed], [style], etc.)
          const arbitraryStylePattern = /^\[.+\]$/

          // Check if the class part starts with the required prefix or matches arbitrary values
          return (
            part.startsWith(requiredPrefix) || arbitraryStylePattern.test(part)
          )
        }

        // Function to validate if the full class name is valid
        function isValidClassName(className) {
          // Skip empty class names (resulting from extra spaces or empty template literals)
          if (!className.trim()) {
            return true // Treat empty strings as valid to avoid false positives
          }

          // Split the class by `:` to handle arbitrary variants and class names
          const parts = className.split(':')

          // The last part should be a valid class name (the actual class after the arbitrary variant)
          const classPart = parts.pop()

          // Validate the final class name part (after the arbitrary variant)
          if (!isValidClassPart(classPart)) {
            return false
          }

          // The preceding parts (variants) can be anything, so we won't validate them
          return true
        }

        return {
          CallExpression(node) {
            if (node.callee.name === functionName) {
              node.arguments.forEach((arg) => {
                if (arg.type === 'Literal' && typeof arg.value === 'string') {
                  const classNames = arg.value.split(' ')
                  classNames.forEach((className) => {
                    if (!isValidClassName(className)) {
                      context.report({
                        node,
                        message: `Invalid class name "${className}" passed to "${functionName}" function. Ensure it follows the Tailwind or custom prefix convention.`,
                      })
                    }
                  })
                } else if (arg.type === 'TemplateLiteral') {
                  arg.quasis.forEach((quasi) => {
                    const classNames = quasi.value.raw.split(' ')
                    classNames.forEach((className) => {
                      if (!isValidClassName(className)) {
                        context.report({
                          node,
                          message: `Invalid class name "${className}" in template literal passed to "${functionName}" function.`,
                        })
                      }
                    })
                  })
                }
              })
            }
          },
        }
      },
    },
  },
}
