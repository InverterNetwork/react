import type { GetDeployFormUserArgs } from '@/types'
import type { RequiredDeep } from 'type-fest-4'

export function isDeployForm(
  getDeployFormUserArgs: GetDeployFormUserArgs
): getDeployFormUserArgs is RequiredDeep<GetDeployFormUserArgs> {
  return Object.keys(getDeployFormUserArgs).length > 0
}
