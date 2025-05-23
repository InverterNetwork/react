'use client'

import { useDeployWorkflow } from '@/hooks'
import { useDeployWorkflowStore } from '@/store'
import type { DeployWorkflowFormStep } from '@/types'
import { isDeployForm } from '@/utils'
import type {
  GetDeployWorkflowInputs,
  MixedRequestedModules,
} from '@inverter-network/sdk'

import type { UseDeployWorkflowFormProps } from '@/hooks/use-deploy-workflow'

/**
 * @description The return type of the use deploy workflow form hook
 * @returns The use deploy workflow form hook
 */
export type UseDeployWorkflowFormReturnType = ReturnType<
  typeof useDeployWorkflowForm
>

/**
 * @description Use the deploy workflow form hook to deploy a workflow via step by step form
 * @param params.onSuccess - The success callback
 * @param params.onError - The error callback
 * @returns The deploy workflow form hook
 */
export const useDeployWorkflowForm = ({
  onSuccess,
  onError,
}: UseDeployWorkflowFormProps = {}) => {
  // Get the deploy store
  const {
    requestedModules,
    deployWorkflowFormStep,
    setPrepDeployWorkflowStep,
    setDeployWorkflowFormStep,
    deployWorkflowFormUserArgs,
    resetDeployWorkflowForm,
    ...restUseDeployWorkflowStoreReturn
  } = useDeployWorkflowStore()

  const { prepDeployment, runDeployment } = useDeployWorkflow({
    requestedModules: requestedModules as Exclude<typeof requestedModules, {}>,
    onSuccess,
    onError,
  })

  // Available Form Steps based on data inputs length not being 0
  const availableFormSteps = (() => {
    if (!prepDeployment.data) return []
    const { optionalModules, ...rest } = prepDeployment.data
      .inputs as unknown as GetDeployWorkflowInputs<MixedRequestedModules>

    const result = (
      Object.keys(prepDeployment.data.inputs) as DeployWorkflowFormStep[]
    ).filter((key) => {
      if (key === 'optionalModules')
        return optionalModules.some((optItem) => !!optItem.inputs.length)

      return !!rest[key]?.inputs?.length
    })

    return result
  })()

  // Get the current form step index
  const currentStepIndex = availableFormSteps.indexOf(deployWorkflowFormStep)

  // Construct a next step function that increments the current step index until it reaches the last step
  const isLastFormStep = currentStepIndex === availableFormSteps.length - 1

  // Construct a previous step function that decrements the current step index until it reaches the first step
  const prevFormStep = () => {
    if (currentStepIndex === 0) {
      setPrepDeployWorkflowStep('Prepare')
      return
    }
    setDeployWorkflowFormStep(availableFormSteps[currentStepIndex - 1])
  }

  const nextFormStep = () => {
    if (isLastFormStep && isDeployForm(deployWorkflowFormUserArgs)) {
      return runDeployment.mutate(deployWorkflowFormUserArgs)
    }
    setDeployWorkflowFormStep(availableFormSteps[currentStepIndex + 1])
  }

  return {
    resetDeployWorkflowForm,
    requestedModules,
    deployWorkflowFormUserArgs,
    deployWorkflowFormStep,
    nextFormStep,
    prevFormStep,
    isLastFormStep,
    availableFormSteps,
    setDeployWorkflowFormStep,
    setPrepDeployWorkflowStep,
    prepDeployment,
    runDeployment,
    ...restUseDeployWorkflowStoreReturn,
  }
}
