import misc from './misc'
import format from './format'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default {
  ...misc,
  format,
}

export * from './errors'
export * from './guards'
export * from './status-codes'
