import type {
  GetDeployWorkflowArgs,
  MixedRequestedModules,
} from '@inverter-network/sdk'
import type { PartialDeep, ValueOf } from 'type-fest-4'

// ===========STORE==============
export type PrepDeployWorkflowStep = 'Prepare' | 'Deploy'

export type DeployWorkflowFormStep =
  | Exclude<keyof MixedRequestedModules, 'paymentProcessor'>
  | 'orchestrator'

export type DeployWorkflowFormUserArgs = PartialDeep<
  GetDeployWorkflowArgs<MixedRequestedModules>
>

export type DeployWorkflowStore = {
  // Prep Deploy Store
  requestedModules: MixedRequestedModules | {}
  prepDeployWorkflowStep: PrepDeployWorkflowStep
  setPrepDeployWorkflowStep: (step: PrepDeployWorkflowStep) => void
  addRequestedModule: (
    moduleType: keyof MixedRequestedModules,
    module: ValueOf<MixedRequestedModules>
  ) => void
  resetRequestedModules: () => void
  // Deploy Form Store
  deployWorkflowFormUserArgs: DeployWorkflowFormUserArgs
  deployWorkflowFormStep: DeployWorkflowFormStep
  setDeployWorkflowFormStep: (step: DeployWorkflowFormStep) => void
  setDeployWorkflowFormUserArg: (
    type: string,
    name: string | null,
    value: any,
    optName?: string
  ) => void
  resetDeployWorkflowForm: () => void
}
