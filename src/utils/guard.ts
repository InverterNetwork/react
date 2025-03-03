import type { DeployWorkflowFormUserArgs } from '@/types'
import type { RequiredDeep } from 'type-fest-4'

export function isDeployForm(
  deployWorkflowFormUserArgs: DeployWorkflowFormUserArgs
): deployWorkflowFormUserArgs is RequiredDeep<DeployWorkflowFormUserArgs> {
  return Object.keys(deployWorkflowFormUserArgs).length > 0
}
