'use client'

import { useMutation } from '@tanstack/react-query'
import { useInverter } from '..'
import type {
  FactoryType,
  GetUserArgs,
  RequestedModules,
} from '@inverter-network/sdk'
import { useAccount } from 'wagmi'
import { useOrchestratorState, usePrepDeployState } from '../store'

export type UsePrepDeployResult = ReturnType<typeof usePrepDeploy>

export type UsePrepDeployOnSuccess = ({
  transactionHash,
  orchestratorAddress,
}: {
  transactionHash: `0x${string}`
  orchestratorAddress: `0x${string}`
}) => void

export const usePrepDeploy = ({
  onSuccess,
  onError,
}: {
  onSuccess?: UsePrepDeployOnSuccess
  onError?: (error: Error) => void
} = {}) => {
  const { isConnected } = useAccount()
  const orchestratorState = useOrchestratorState()

  const inverter = useInverter().data

  const {
    requestedModules,
    resetRequestedModules,
    addRequestedModule,
    setStep,
    factoryType,
    step,
    setFactoryType,
  } = usePrepDeployState()

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

      setStep('Deploy')

      return { run, inputs }
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  const deploy = useMutation({
    mutationFn: async (
      userArgs: GetUserArgs<RequestedModules, FactoryType>
    ) => {
      if (!prep.data) throw new Error('No deploy data found')

      return await prep.data.run(userArgs, {
        confirmations: 1,
      })
    },
    onSuccess: (params) => {
      orchestratorState.add(params.orchestratorAddress)
      onSuccess?.(params)
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  return {
    isConnected,
    requestedModules,
    addRequestedModule,
    setFactoryType,
    prep,
    deploy,
    step,
    setStep,
    resetRequestedModules,
  }
}

export type UsePrepDeployReturn = ReturnType<typeof usePrepDeploy>
