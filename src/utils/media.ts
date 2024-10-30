export type PrunedFile = {
  string: string
  type: string
  name: string
}

// Function to convert a Blob to a base64 string
export async function pruneFile(blob?: Blob | File): Promise<PrunedFile> {
  if (!blob) throw new Error('No file selected')

  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return { string: buffer.toString('base64'), type: blob.type, name: blob.name }
}

// Function to reconstruct a Blob from a base64 string
export function parseFile({ string, type, name }: PrunedFile): File {
  const buffer = Buffer.from(string, 'base64')
  // Create a File from the Blob, specifying the name and type
  return new File([buffer], name, { type })
}
