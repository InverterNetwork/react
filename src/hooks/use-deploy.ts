'use client'

import { useChainSpecs, useEffectAfterMount, useInverter } from '@/hooks'
import { useDeployStore, useOrchestratorStore } from '@/store'
import type {
  DeployFormStep,
  DeployFormUserArgs,
  UseDeployOnSuccess,
} from '@/types'
import { isDeployForm } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import type { NonEmptyObject } from 'type-fest-4'

export const useDeploy = ({
  onNetworkChangeWarning,
  onSuccess,
  onError,
}: {
  onNetworkChangeWarning?: () => void
  onSuccess?: UseDeployOnSuccess
  onError?: (error: Error) => void
}) => {
  // Get the current chainId and previous chainId
  const { didChainIdChange } = useChainSpecs()

  // Get the orchestrator state store
  const { addOrchestrator } = useOrchestratorStore()

  // Get the deploy store
  const {
    addRequestedModule,
    deployFormStep,
    deployFormUserArgs,
    resetDeployForm,
    factoryType,
    prepDeployStep,
    requestedModules,
    resetRequestedModules,
    setDeployFormStep,
    setFactoryType,
    setPrepDeployStep,
    setDeployFormUserArg,
  } = useDeployStore()

  // Get the inverter instance
  const inverter = useInverter().data

  // Prep the deployment
  const prep = useMutation({
    mutationFn: async () => {
      if (
        !('authorizer' in requestedModules) ||
        !('fundingManager' in requestedModules) ||
        !('paymentProcessor' in requestedModules) ||
        (factoryType !== 'default' &&
          (!('issuanceToken' in requestedModules) ||
            !('initialPurchaseAmount' in requestedModules)))
      )
        throw new Error(
          'Authorizer, Funding Manager and Payment Processor are required'
        )

      if (!inverter) throw new Error('Inverter instance not found')

      const { run, inputs } = await inverter.getDeploy({
        requestedModules,
        factoryType,
      })

      setPrepDeployStep('Deploy')

      return { run, inputs }
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  // Deploy the workflow
  const deploy = useMutation({
    mutationFn: async (
      deployFormUserArgs: NonEmptyObject<DeployFormUserArgs>
    ) => {
      if (!prep.data) throw new Error('No deploy data found')

      return await prep.data.run(deployFormUserArgs, {
        confirmations: 1,
      })
    },
    onSuccess: (params) => {
      addOrchestrator(params.orchestratorAddress)
      onSuccess?.(params)
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  // Available Form Steps based on data inputs length not being 0
  const availableFormSteps = (() => {
    if (!prep?.data) return []
    const { optionalModules, ...rest } = prep.data.inputs

    const result = (Object.keys(prep.data.inputs) as DeployFormStep[]).filter(
      (key) => {
        if (key === 'optionalModules')
          return optionalModules.some((optItem) => !!optItem.inputs.length)
        if (key === 'initialPurchaseAmount') return true
        return !!rest[key]?.inputs?.length
      }
    )

    return result
  })()

  // Get the current form step index
  const currentStepIndex = availableFormSteps.indexOf(deployFormStep)

  // Construct a next step function that increments the current step index until it reaches the last step
  const isLastFormStep = currentStepIndex === availableFormSteps.length - 1

  // Construct a previous step function that decrements the current step index until it reaches the first step
  const prevFormStep = () => {
    if (currentStepIndex === 0) {
      handleResetDeployForm(true)
      return
    }
    setDeployFormStep(availableFormSteps[currentStepIndex - 1])
  }

  const nextFormStep = () => {
    if (isLastFormStep && isDeployForm(deployFormUserArgs))
      return deploy.mutate(deployFormUserArgs)
    setDeployFormStep(availableFormSteps[currentStepIndex + 1])
  }

  const handleResetDeployForm = (full?: boolean) => {
    deploy.reset()
    if (full) setPrepDeployStep('Prepare')
    setDeployFormStep('orchestrator')
    resetDeployForm()
  }

  useEffectAfterMount(() => {
    if (prepDeployStep === 'Deploy' && didChainIdChange) {
      handleResetDeployForm(true)
      onNetworkChangeWarning?.()
    }
  }, [didChainIdChange])

  return {
    setDeployFormUserArg,
    setFactoryType,
    resetRequestedModules,
    deployFormStep,
    addRequestedModule,
    nextFormStep,
    prevFormStep,
    isLastFormStep,
    availableFormSteps,
    setDeployFormStep,
    setPrepDeployStep,
  }
}

export type UseDeployReturnType = ReturnType<typeof useDeploy>
