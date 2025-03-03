import type {
  FactoryType,
  GetDeployWorkflowArgs,
  RequestedModules,
} from '@inverter-network/sdk'
import type { ValueOf, PartialDeep } from 'type-fest-4'

// ===========STORE==============
export type PrepDeployWorkflowStep = 'Prepare' | 'Deploy'

export type DeployWorkflowFormStep =
  | Exclude<keyof RequestedModules, 'paymentProcessor'>
  | 'orchestrator'
  | 'issuanceToken'
  | 'initialPurchaseAmount'
  | 'beneficiary'
  | 'migrationConfig'

export type DeployWorkflowFormUserArgs = PartialDeep<
  GetDeployWorkflowArgs<
    RequestedModules,
    'default' | 'immutable-pim' | 'restricted-pim' | 'migrating-pim'
  >
>

export type DeployWorkflowStore = {
  // Prep Deploy Store
  factoryType: FactoryType
  requestedModules: RequestedModules<FactoryType> | {}
  prepDeployWorkflowStep: PrepDeployWorkflowStep
  setPrepDeployWorkflowStep: (step: PrepDeployWorkflowStep) => void
  setFactoryType: (factoryType: FactoryType) => void
  addRequestedModule: (
    moduleType: keyof RequestedModules<FactoryType>,
    module: ValueOf<RequestedModules<FactoryType>>
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

export type UseDeployWorkflowProps<
  T extends RequestedModules<FT extends undefined ? 'default' : FT>,
  FT extends FactoryType | undefined = undefined,
> = {
  requestedModules: T
  factoryType?: FT
  resetDeployWorkflowForm?: () => void
  onSuccess?: UseDeployWorkflowOnSuccess
  onError?: (error: Error) => void
}

export type UseDeployWorkflowFormProps = Omit<
  UseDeployWorkflowProps<RequestedModules<FactoryType>, FactoryType>,
  'resetDeployWorkflowForm' | 'requestedModules' | 'factoryType'
>
