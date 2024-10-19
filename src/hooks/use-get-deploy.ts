'use client'

import { useInverter } from '@/hooks'
import { useSelectorStore, useGetDeployStore } from '@/store'
import type {
  GetDeployFormStep,
  GetDeployFormUserArgs,
  UseGetDeployOnSuccess,
} from '@/types'
import { isDeployForm } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { RequiredDeep } from 'type-fest-4'

export type UseGetDeployReturnType = ReturnType<typeof useGetDeploy>

export const useGetDeploy = ({
  onSuccess,
  onError,
}: {
  onNetworkChangeWarning?: () => void
  onSuccess?: UseGetDeployOnSuccess
  onError?: (error: Error) => void
} = {}) => {
  // Get the orchestrator state store
  const { addAddress } = useSelectorStore()

  // Get the deploy store
  const {
    addRequestedModule,
    getDeployFormStep,
    getDeployFormUserArgs,
    resetGetDeployForm,
    factoryType,
    prepGetDeployStep,
    requestedModules,
    resetRequestedModules,
    setGetDeployFormStep,
    setFactoryType,
    setPrepGetDeployStep,
    setGetDeployFormUserArg,
  } = useGetDeployStore()

  // Get the inverter instance
  const inverter = useInverter().data

  // Prep the deployment
  const prepDeployment = useQuery({
    queryKey: ['prepDeployment', JSON.stringify(requestedModules)],
    queryFn: async () => {
      if (
        !('authorizer' in requestedModules) ||
        !('fundingManager' in requestedModules) ||
        !('paymentProcessor' in requestedModules)
      )
        throw new Error(
          'Authorizer, Funding Manager and Payment Processor are required'
        )

      if (!inverter) throw new Error('Inverter instance not found')

      const { run, inputs } = await inverter.getDeploy({
        requestedModules,
        factoryType,
      })

      resetGetDeployForm()

      return { run, inputs }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    gcTime: 0,
    staleTime: Infinity,
    enabled:
      'authorizer' in requestedModules &&
      'fundingManager' in requestedModules &&
      'paymentProcessor' in requestedModules,
  })

  // Deploy the workflow
  const runDeployment = useMutation({
    mutationFn: async (
      getDeployFormUserArgs: RequiredDeep<GetDeployFormUserArgs>
    ) => {
      if (!prepDeployment.data) throw new Error('No deploy data found')

      // The object might be frozen if it comes from a state management system
      // like Redux or Immer, which often freeze objects to enforce immutability.
      // We use structuredClone to create a deep, mutable copy of the object.
      const unfrozenArgs = structuredClone(getDeployFormUserArgs)

      return await prepDeployment.data.run(unfrozenArgs, {
        confirmations: 1,
      })
    },
    onSuccess: (params) => {
      addAddress({ address: params.orchestratorAddress, type: 'orchestrator' })
      onSuccess?.(params)
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  // Available Form Steps based on data inputs length not being 0
  const availableFormSteps = (() => {
    if (!prepDeployment?.data) return []
    const { optionalModules, ...rest } = prepDeployment.data.inputs

    const result = (
      Object.keys(prepDeployment.data.inputs) as GetDeployFormStep[]
    ).filter((key) => {
      if (key === 'optionalModules')
        return optionalModules.some((optItem) => !!optItem.inputs.length)
      if (key === 'initialPurchaseAmount') return true
      if (key === 'beneficiary') return true
      if (key === 'issuanceToken') return true

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
    requestedModules,
    getDeployFormUserArgs,
    setGetDeployFormUserArg,
    setFactoryType,
    resetRequestedModules,
    getDeployFormStep,
    prepGetDeployStep,
    addRequestedModule,
    nextFormStep,
    prevFormStep,
    isLastFormStep,
    availableFormSteps,
    setGetDeployFormStep,
    setPrepGetDeployStep,
    prepDeployment,
    runDeployment,
    factoryType,
  }
}
