export function amountString(input: string): string {
  // Remove any leading zeros
  let sanitizedInput = input.replace(/^0+(?=[1-9])/g, '')
  // Replace commas with periods
  sanitizedInput = sanitizedInput.replace(/,/g, '.')
  // Replace all characters except numbers, commas, and periods with an empty string
  sanitizedInput = sanitizedInput.replace(/[^\d.,]/g, '')
  // Replace any duplicate periods with a single period
  sanitizedInput = sanitizedInput.replace(/\.+/g, '.')
  // Add a leading zero if the input starts with a decimal point
  if (/^\./.test(sanitizedInput)) sanitizedInput = `0${sanitizedInput}`
  // Don't start with a point or comma
  if (/^[.,]/.test(sanitizedInput)) sanitizedInput = `0${sanitizedInput}`
  // Ensure that only one period or comma is present in the output string
  const [integerPart, fractionalPart] = sanitizedInput.split('.')
  if (fractionalPart)
    sanitizedInput = `${integerPart}.${fractionalPart.replace(/[\.,]/g, '')}`
  return sanitizedInput
}

export function toCompactNumber(value?: string | number) {
  const number = Number(value)
  if (isNaN(number)) return '...'

  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}

export const compressAddress = (address?: string) =>
  !address ? '...' : address.slice(0, 4) + '...' + address.slice(-4)

export const firstLetterToUpperCase = (text?: string) =>
  !text ? '...' : text.charAt(0).toUpperCase() + text.slice(1)

export const unixTimeToDisplay = (date: number | Date) => {
  let timestamp: number

  try {
    if (date instanceof Date) timestamp = date.getTime()
    else timestamp = date * 1000

    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp)
  } catch {
    return '...'
  }
}

export function prettyName(text?: string): string {
  const prefixes = ['FM', 'BC', 'LM', 'PC', 'AUT', 'EXT', 'PP']

  if (!text) return '...'
  if (text === 'ERC20') return text

  let mutableText = text

  const hasPrefix = prefixes.some((prefix) => text.includes(prefix))

  if (hasPrefix) {
    // if text includes prefixes, remove them and any leading _ and set the new text
    mutableText = prefixes.reduce((acc, prefix) => {
      if (text.includes(prefix)) {
        const regex = new RegExp(`${prefix}_`, 'g')
        return acc.replace(regex, '')
      }
      return acc
    }, text)
  }

  if (mutableText.includes('_')) {
    // Type 2: Replace underscores with spaces and capitalize each word
    return mutableText
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  } else {
    // Type 1: Insert a space before each uppercase letter and capitalize each word
    return mutableText
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }
}

export function extractError(errorMessage?: string) {
  if (!errorMessage) return 'Error: Unknown error'
  const regex = /(Error|Details): .*/
  const match = errorMessage.match(regex)
  return match ? match[0] : errorMessage
}
