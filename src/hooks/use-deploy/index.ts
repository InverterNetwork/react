'use client'

import * as React from 'react'
import { useSelectorStore } from '@/store'
import type { UseDeployOnSuccess } from '@/types'
import { getModuleData } from '@inverter-network/abis'
import type {
  DeployableContracts,
  GetDeployWorkflowModuleArg,
} from '@inverter-network/sdk'
import { useMutation } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { useInverter } from '../use-inverter'
import { initialStates } from './constants'

export const useDeploy = <T extends DeployableContracts>({
  name,
  onError,
  onSuccess,
}: {
  name: T
  onError?: (error: Error) => void
  onSuccess?: UseDeployOnSuccess
}) => {
  const moduleData = getModuleData(name)
  const { chainId } = useAccount()

  if (!('deploymentInputs' in moduleData)) {
    throw new Error('Module does not support deployment')
  }

  const inputs = moduleData.deploymentInputs.configData

  const { addAddress } = useSelectorStore()

  const [userArgs, setUserArgs] = React.useState(
    // @ts-expect-error - not all modules have initial states
    (initialStates?.[name] || {}) as GetDeployWorkflowModuleArg<T>
  )

  const handleSetUserArgs = (name: string, value: any) => {
    setUserArgs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const inverter = useInverter()

  const mutate = useMutation({
    mutationFn: async () => {
      if (!inverter.data) throw new Error('Inverter not initialized')

      const data = await inverter.data.deploy({
        name,
        args: userArgs,
      })
      return data
    },
    onSuccess: async ({ contractAddress, transactionHash }) => {
      await inverter.data!.publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      })

      addAddress({
        title: name,
        address: contractAddress,
        type: 'contract',
        chainId,
      })

      onSuccess?.({ contractAddress, transactionHash })
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  return {
    inputs,
    mutate,
    userArgs,
    handleSetUserArgs,
  }
}
