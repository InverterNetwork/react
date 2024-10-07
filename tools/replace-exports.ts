import { promises as fs } from 'fs'
import path from 'path'

const PACKAGE_JSON_PATH = path.resolve(__dirname, '..', './package.json')
const TEMP_EXPORTS_PATH = path.resolve(
  __dirname,
  '..',
  './package_exports_backup.json'
)

/**
 * Replaces the exports in package.json with the provided `exports` object.
 *
 * @param {object} newExports - The new exports configuration to apply.
 */
async function replaceExports(newExports: object) {
  const packageJson = JSON.parse(await fs.readFile(PACKAGE_JSON_PATH, 'utf-8'))

  // Backup the current exports field
  const originalExports = packageJson.exports
  await fs.writeFile(
    TEMP_EXPORTS_PATH,
    JSON.stringify({ exports: originalExports }, null, 2)
  )

  // Replace the exports field with new production exports
  packageJson.exports = newExports

  await fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2))
  console.log('Replaced exports in package.json for production build.')
}

/**
 * Run the script to replace the exports
 */
async function run() {
  const productionExports = {
    '.': {
      types: './dist/types/index.d.ts',
      import: './dist/esm/index.js',
      default: './dist/cjs/index.js',
    },
    './client': {
      types: './dist/types/client.d.ts',
      import: './dist/esm/client.js',
      default: './dist/cjs/client.js',
    },
    './package.json': './package.json',
  }

  await replaceExports(productionExports)
}

run().catch((err) => {
  console.error('Error replacing exports:', err)
  process.exit(1)
})
