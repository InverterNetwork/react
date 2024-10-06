'use client'

import { useMutation } from '@tanstack/react-query'
import { useInverter } from '..'
import type { GetUserArgs, RequestedModules } from '@inverter-network/sdk'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useOrchestratorState } from '../zustand'

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

  const [requestedModules, setRequestedModules] = useState(
    {} as RequestedModules
  )

  const [step, setStep] = useState<'Prepare' | 'Deploy'>('Prepare')

  const prep = useMutation({
    mutationFn: async () => {
      if (
        !requestedModules?.authorizer ||
        !requestedModules?.fundingManager ||
        !requestedModules?.paymentProcessor
      )
        throw new Error(
          'Authorizer, Funding Manager and Payment Processor are required'
        )

      if (!inverter) throw new Error('Inverter instance not found')

      const { run, inputs } = await inverter.getDeploy({ requestedModules })

      setStep('Deploy')

      return { run, inputs }
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  const deploy = useMutation({
    mutationFn: async (userArgs: GetUserArgs) => {
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

  const addRequestedModule = (moduleType: string, module: any) => {
    setRequestedModules((prev) => {
      return {
        ...prev,
        [moduleType]: module,
      }
    })
  }

  const resetRequestedModules = () => {
    setRequestedModules({} as RequestedModules)
  }

  return {
    isConnected,
    requestedModules,
    addRequestedModule,
    prep,
    deploy,
    step,
    setStep,
    resetRequestedModules,
  }
}

export type UsePrepDeployReturn = ReturnType<typeof usePrepDeploy>
