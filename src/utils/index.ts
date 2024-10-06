import misc from './misc'
import format from './format'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import * as error from './error'
import * as guard from './guard'
import * as statusCode from './status-code'

export default {
  ...misc,
  format,
  error,
  guard,
  statusCode,
}
