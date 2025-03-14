import { exec } from 'child_process'
import path from 'path'

// Add server functionality at the end of the file
if (import.meta.main) {
  // 1. Create temp directory for preview assets
  const previewDir = './preview-temp'
  try {
    await Bun.write(Bun.file(`${previewDir}/.gitkeep`), '')
  } catch (e) {
    // Directory might already exist, that's fine
  }

  // 2. Create preview input.css
  const previewCssContent = `
    /* Import project styles */
    @import '../src/styles/global.css';
    
    /* Add preview-only styles */
    body {
      padding: 2rem;
    }
  `
  await Bun.write(Bun.file(`${previewDir}/input.css`), previewCssContent)

  // 3. Create preview tailwind config
  const previewConfigContent = `
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
  `
  await Bun.write(
    Bun.file(`${previewDir}/tailwind.config.mjs`),
    previewConfigContent
  )

  // 4. Generate CSS using the preview config
  console.log('Generating Tailwind CSS for preview...')
  try {
    const proc = Bun.spawn([
      'npx',
      'tailwindcss',
      '-i',
      `${previewDir}/input.css`,
      '-o',
      `${previewDir}/preview.css`,
      '-c',
      `${previewDir}/tailwind.config.mjs`,
    ])
    const exitCode = await proc.exited

    if (exitCode === 0) {
      console.log('Tailwind CSS generated successfully!')
    } else {
      console.error(
        'Failed to generate Tailwind CSS, but server will start anyway'
      )
    }
  } catch (err) {
    console.error('Error running Tailwind CLI:', err)
  }

  // This replaces the current Bun server with a Vite development server

  console.log('Starting Vite development server for component preview...')

  // Get the directory of the current file
  const currentDir = path.dirname(new URL(import.meta.url).pathname)

  // Launch Vite with watch mode
  const viteProcess = exec('npx vite --clearScreen false', { cwd: currentDir })

  viteProcess.stdout?.on('data', (data) => {
    console.log(data.toString().trim())
  })

  viteProcess.stderr?.on('data', (data) => {
    console.error(data.toString().trim())
  })

  // Handle server exit
  viteProcess.on('exit', (code) => {
    console.log(`Vite server exited with code ${code}`)
  })

  // Handle termination signals
  process.on('SIGINT', () => {
    viteProcess.kill('SIGINT')
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    viteProcess.kill('SIGTERM')
    process.exit(0)
  })
}
