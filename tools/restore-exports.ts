import { promises as fs } from 'fs'
import path from 'path'

const PACKAGE_JSON_PATH = path.resolve(__dirname, '..', './package.json')
const TEMP_EXPORTS_PATH = path.resolve(
  __dirname,
  '..',
  './package_exports_backup.json'
)

/**
 * Restores the original exports field in package.json from the backup.
 */
async function restoreExports() {
  if (await fs.stat(TEMP_EXPORTS_PATH).catch(() => false)) {
    const { exports: originalExports } = JSON.parse(
      await fs.readFile(TEMP_EXPORTS_PATH, 'utf-8')
    )
    const packageJson = JSON.parse(
      await fs.readFile(PACKAGE_JSON_PATH, 'utf-8')
    )

    // Restore the original exports field
    packageJson.exports = originalExports

    await fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2))
    await fs.unlink(TEMP_EXPORTS_PATH) // Remove the temporary backup file
    console.log('Restored original exports in package.json.')
  } else {
    console.log('No backup found, skipping export restore.')
  }
}

/**
 * Run the script to restore the original exports
 */
async function run() {
  await restoreExports()
}

run().catch((err) => {
  console.error('Error restoring exports:', err)
  process.exit(1)
})
