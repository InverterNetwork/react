'use client'

import { useGetDeploy } from '@/hooks'
import { useGetDeployStore } from '@/store'
import type { GetDeployFormStep, UseGetDeployFormProps } from '@/types'
import { isDeployForm } from '@/utils'
import type {
  DeploySchema,
  FactoryType,
  RequestedModules,
} from '@inverter-network/sdk'

export type UseGetDeployFormReturnType = ReturnType<typeof useGetDeployForm>

export const useGetDeployForm = ({
  onSuccess,
  onError,
}: UseGetDeployFormProps = {}) => {
  // Get the deploy store
  const {
    requestedModules,
    factoryType,
    getDeployFormStep,
    setPrepGetDeployStep,
    setGetDeployFormStep,
    getDeployFormUserArgs,
    resetGetDeployForm,
    ...restUseGetDeployStoreReturn
  } = useGetDeployStore()

  const { prepDeployment, runDeployment } = useGetDeploy({
    requestedModules: requestedModules as Exclude<typeof requestedModules, {}>,
    factoryType,
    onSuccess,
    onError,
  })

  // Available Form Steps based on data inputs length not being 0
  const availableFormSteps = (() => {
    if (!prepDeployment.data) return []
    const { optionalModules, ...rest } = prepDeployment.data
      .inputs as unknown as DeploySchema<RequestedModules, FactoryType>

    const result = (
      Object.keys(prepDeployment.data.inputs) as GetDeployFormStep[]
    ).filter((key) => {
      if (key === 'optionalModules')
        return optionalModules.some((optItem) => !!optItem.inputs.length)
      if (key === 'initialPurchaseAmount') return true
      if (key === 'beneficiary') return true
      if (key === 'issuanceToken') return true
      if (key === 'migrationConfig') return true

      return !!rest[key]?.inputs?.length
    })

    return result
  })()

  // Get the current form step index
  const currentStepIndex = availableFormSteps.indexOf(getDeployFormStep)

  // Construct a next step function that increments the current step index until it reaches the last step
  const isLastFormStep = currentStepIndex === availableFormSteps.length - 1

  // Construct a previous step function that decrements the current step index until it reaches the first step
  const prevFormStep = () => {
    if (currentStepIndex === 0) {
      setPrepGetDeployStep('Prepare')
      return
    }
    setGetDeployFormStep(availableFormSteps[currentStepIndex - 1])
  }

  const nextFormStep = () => {
    if (isLastFormStep && isDeployForm(getDeployFormUserArgs)) {
      return runDeployment.mutate(getDeployFormUserArgs)
    }
    setGetDeployFormStep(availableFormSteps[currentStepIndex + 1])
  }

  return {
    resetGetDeployForm,
    requestedModules,
    getDeployFormUserArgs,
    getDeployFormStep,
    nextFormStep,
    prevFormStep,
    isLastFormStep,
    availableFormSteps,
    setGetDeployFormStep,
    setPrepGetDeployStep,
    prepDeployment,
    runDeployment,
    factoryType,
    ...restUseGetDeployStoreReturn,
  }
}
