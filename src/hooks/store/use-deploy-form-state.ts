import type { GetUserArgs, RequestedModules } from '@inverter-network/sdk'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type DeployFormStep =
  | keyof RequestedModules
  | 'orchestrator'
  | 'issuanceToken'
  | 'initialPurchaseAmount'

type Args = GetUserArgs<
  RequestedModules,
  'default' | 'immutable-pim' | 'restricted-pim'
>

type DeployForm = Args | {}

type FormState = {
  deployFormState: DeployForm
  deployFormStep: DeployFormStep
  setDeployFormStep: (step: DeployFormStep) => void
  setDeployFormArg: (
    type: DeployFormStep,
    name: string,
    value: any,
    optName?: string
  ) => void
  resetDeployForm: () => void
}

export function isDeployForm(
  deployFormState: DeployForm
): deployFormState is Args {
  return Object.keys(deployFormState).length > 0
}

export const useDeployFormState = create<FormState>()(
  immer((set) => ({
    deployFormState: {},
    deployFormStep: 'orchestrator',
    setDeployFormStep: (step) => {
      set((state) => {
        state.deployFormStep = step
      })
    },
    setDeployFormArg: (type, name, value, optName) => {
      set((state) => {
        const prev = state.deployFormState
        // @ts-expect-error - conditionally setting state
        const prevTypeVal = prev?.[type] || {}
        const prevTypeValObj = prevTypeVal?.[name]
        let typeVal: any

        switch (type) {
          case 'optionalModules':
            typeVal = {
              ...prevTypeVal,
              [optName!]: {
                ...(prevTypeVal?.[optName!] || {}),
                [name]: value,
              },
            }
            break
          case 'initialPurchaseAmount':
            typeVal = value
            break
          default:
            if (typeof prevTypeValObj === 'object')
              typeVal = {
                ...prevTypeVal,
                [name]: {
                  ...prevTypeValObj,
                  ...value,
                },
              }
            else
              typeVal = {
                ...prevTypeVal,
                [name]: value,
              }
            break
        }

        state.deployFormState = {
          ...prev,
          [type]: typeVal,
        }
      })
    },
    resetDeployForm: () => {
      set((state) => {
        state.deployFormState = {}
      })
    },
  }))
)
