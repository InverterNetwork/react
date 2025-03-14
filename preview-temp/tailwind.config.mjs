
    import baseConfig from '../tailwind.config.mjs';
    
    /** @type {import("tailwindcss").Config} */
    export default {
      ...baseConfig,
      content: [
        './preview.tsx',
        ...baseConfig.content
      ],
      theme: {
        ...baseConfig.theme,
        extend: {
          ...baseConfig.theme.extend,
          // Preview-specific theme extensions if needed
        }
      }
    };
  