import type {
  FactoryType,
  GetUserArgs,
  RequestedModules,
} from '@inverter-network/sdk'
import type { ValueOf, PartialDeep } from 'type-fest-4'

// ===========STORE==============
export type PrepDeployStep = 'Prepare' | 'Deploy'

export type DeployFormStep =
  | Exclude<keyof RequestedModules, 'paymentProcessor'>
  | 'orchestrator'
  | 'issuanceToken'
  | 'initialPurchaseAmount'

export type DeployFormUserArgs = PartialDeep<
  GetUserArgs<RequestedModules, 'default' | 'immutable-pim' | 'restricted-pim'>
>

export type DeployStore = {
  // Prep Deploy Store
  factoryType: FactoryType
  requestedModules: RequestedModules<FactoryType> | {}
  prepDeployStep: PrepDeployStep
  setPrepDeployStep: (step: PrepDeployStep) => void
  setFactoryType: (factoryType: FactoryType) => void
  addRequestedModule: (
    moduleType: keyof RequestedModules<FactoryType>,
    module: ValueOf<RequestedModules<FactoryType>>
  ) => void
  resetRequestedModules: () => void
  // Deploy Form Store
  deployFormUserArgs: DeployFormUserArgs
  deployFormStep: DeployFormStep
  setDeployFormStep: (step: DeployFormStep) => void
  setDeployFormUserArg: (
    type: string,
    name: string | null,
    value: any,
    optName?: string
  ) => void
  resetDeployForm: () => void
}

// ===========HOOKS==============
export type UseDeployOnSuccess = ({
  transactionHash,
  orchestratorAddress,
}: {
  transactionHash: `0x${string}`
  orchestratorAddress: `0x${string}`
}) => void
