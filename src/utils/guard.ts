import type { GetDeployFormUserArgs } from '@/types'
import { HTTPError } from './error'
import type { RequiredDeep } from 'type-fest-4'

export function isDeployForm(
  getDeployFormUserArgs: GetDeployFormUserArgs
): getDeployFormUserArgs is RequiredDeep<GetDeployFormUserArgs> {
  return Object.keys(getDeployFormUserArgs).length > 0
}

export function authorized<T>(
  value: T | undefined | null,
  message?: string
): asserts value is T {
  if (!value)
    throw new HTTPError(
      !!message ? `Unauthorized: ${message}` : 'Unauthorized',
      401
    )
}

export function isNotEmpty<T>(
  value: T | undefined | null,
  message?: string
): asserts value is T {
  if (!value)
    throw new HTTPError(
      !!message ? `No Data Found: ${message}` : 'No Data Found',
      404
    )
}
