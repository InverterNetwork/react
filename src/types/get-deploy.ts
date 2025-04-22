import type {
  GetDeployWorkflowArgs,
  MixedRequestedModules,
} from '@inverter-network/sdk'
import type { ValueOf, PartialDeep } from 'type-fest-4'

// ===========STORE==============
export type PrepDeployWorkflowStep = 'Prepare' | 'Deploy'

export type DeployWorkflowFormStep =
  | Exclude<keyof MixedRequestedModules, 'paymentProcessor'>
  | 'orchestrator'
  | 'issuanceToken'
  | 'initialPurchaseAmount'
  | 'beneficiary'
  | 'migrationConfig'

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

// ===========HOOKS==============
export type UseDeployWorkflowOnSuccess = ({
  transactionHash,
  orchestratorAddress,
}: {
  transactionHash: `0x${string}`
  orchestratorAddress: `0x${string}`
}) => void

export type UseDeployWorkflowProps<T extends MixedRequestedModules> = {
  requestedModules: T
  resetDeployWorkflowForm?: () => void
  onSuccess?: UseDeployWorkflowOnSuccess
  onError?: (error: Error) => void
}

export type UseDeployWorkflowFormProps = Omit<
  UseDeployWorkflowProps<MixedRequestedModules>,
  'resetDeployWorkflowForm' | 'requestedModules' | 'factoryType'
>
