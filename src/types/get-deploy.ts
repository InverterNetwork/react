import type {
  FactoryType,
  GetUserArgs,
  RequestedModules,
} from '@inverter-network/sdk'
import type { ValueOf, PartialDeep } from 'type-fest-4'

// ===========STORE==============
export type PrepGetDeployStep = 'Prepare' | 'Deploy'

export type GetDeployFormStep =
  | Exclude<keyof RequestedModules, 'paymentProcessor'>
  | 'orchestrator'
  | 'issuanceToken'
  | 'initialPurchaseAmount'
  | 'beneficiary'

export type GetDeployFormUserArgs = PartialDeep<
  GetUserArgs<RequestedModules, 'default' | 'immutable-pim' | 'restricted-pim'>
>

export type GetDeployStore = {
  // Prep Deploy Store
  factoryType: FactoryType
  requestedModules: RequestedModules<FactoryType> | {}
  prepGetDeployStep: PrepGetDeployStep
  setPrepGetDeployStep: (step: PrepGetDeployStep) => void
  setFactoryType: (factoryType: FactoryType) => void
  addRequestedModule: (
    moduleType: keyof RequestedModules<FactoryType>,
    module: ValueOf<RequestedModules<FactoryType>>
  ) => void
  resetRequestedModules: () => void
  // Deploy Form Store
  getDeployFormUserArgs: GetDeployFormUserArgs
  getDeployFormStep: GetDeployFormStep
  setGetDeployFormStep: (step: GetDeployFormStep) => void
  setGetDeployFormUserArg: (
    type: string,
    name: string | null,
    value: any,
    optName?: string
  ) => void
  resetGetDeployForm: () => void
}

// ===========HOOKS==============
export type UseGetDeployOnSuccess = ({
  transactionHash,
  orchestratorAddress,
}: {
  transactionHash: `0x${string}`
  orchestratorAddress: `0x${string}`
}) => void
