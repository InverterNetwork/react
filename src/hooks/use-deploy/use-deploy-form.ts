'use client'

import * as React from 'react'

import { type UsePrepDeployReturn } from './use-prep-deploy'
import { useAccount } from 'wagmi'
import { useEffectAfterMount } from '..'
import { isDeployForm, useDeployFormState, type DeployFormStep } from '../store'

export const useDeployForm = ({
  prepResult: {
    prep: { data },
    setStep,
    deploy,
    step,
  },
  onNetworkChangeWarning,
}: {
  onNetworkChangeWarning?: () => void
  prepResult: UsePrepDeployReturn
}) => {
  const chainId = useAccount().chainId
  const prevChainId = React.useRef(chainId)

  const {
    deployFormState,
    deployFormStep,
    resetDeployForm,
    setDeployFormArg,
    setDeployFormStep,
  } = useDeployFormState()

  // Available Form Steps based on data inputs length not being 0
  const availableFormSteps = !data
    ? []
    : (Object.keys(data.inputs) as DeployFormStep[]).filter((key) => {
        const { optionalModules, ...rest } = data.inputs
        if (key === 'optionalModules')
          return optionalModules.some((optItem) => !!optItem.inputs.length)
        if (key === 'initialPurchaseAmount') return true
        return !!rest[key]?.inputs?.length
      })

  // Get the current form step index
  const currentStepIndex = availableFormSteps.indexOf(deployFormStep)
  // Construct a next step function that increments the current step index until it reaches the last step
  const isLastStep = currentStepIndex === availableFormSteps.length - 1

  const nextStep = () => {
    if (isLastStep && isDeployForm(deployFormState))
      return deploy.mutate(deployFormState)
    setDeployFormStep(availableFormSteps[currentStepIndex + 1])
  }

  const handleResetDeployForm = (full?: boolean) => {
    deploy.reset()
    if (full) setStep('Prepare')
    setDeployFormStep('orchestrator')
    resetDeployForm()
  }

  // Construct a previous step function that decrements the current step index until it reaches the first step
  const prevStep = () => {
    if (currentStepIndex === 0) {
      handleResetDeployForm(true)
      return
    }
    setDeployFormStep(availableFormSteps[currentStepIndex - 1])
  }

  useEffectAfterMount(() => {
    if (
      step === 'Deploy' &&
      chainId !== undefined &&
      prevChainId.current !== chainId
    ) {
      handleResetDeployForm(true)
      prevChainId.current = chainId

      onNetworkChangeWarning?.()
    }
  }, [chainId])

  return {
    setDeployFormArg,
    deployFormStep,
    deployFormState,
    nextStep,
    prevStep,
    isLastStep,
    availableFormSteps,
  }
}

export type UseDeployFormReturn = ReturnType<typeof useDeployForm>
