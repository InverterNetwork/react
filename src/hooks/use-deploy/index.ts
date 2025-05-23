'use client'

import * as React from 'react'
import { useSelectorStore } from '@/store'
import { getModuleData } from '@inverter-network/abis'
import type {
  DeployableContracts,
  DeployBytecodeReturnType,
  DeployWriteReturnType,
  GetDeployWorkflowModuleArg,
  GetModuleConfigData,
  MethodOptions,
} from '@inverter-network/sdk'
import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { useInverter } from '../use-inverter'
import { initialStates } from './constants'

export type UseDeployOnSuccess<TMethodKind extends 'write' | 'bytecode'> =
  TMethodKind extends 'write'
    ? ({
        contractAddress,
        transactionHash,
      }: {
        contractAddress: `0x${string}`
        transactionHash: `0x${string}`
      }) => void
    : ({
        contractAddress,
        factoryAddress,
        bytecode,
      }: {
        contractAddress: `0x${string}`
        factoryAddress: `0x${string}`
        bytecode: `0x${string}`
      }) => void

/**
 * @description The parameters for the deploy hook
 * @template T - The deployable contract
 * @template TMethodKind - The method kind
 * @param name - The name of the contract
 * @param kind - The method kind
 * @param onError - The error handler
 * @param onSuccess - The success handler
 */
export type UseDeployParams<
  T extends DeployableContracts,
  TMethodKind extends 'write' | 'bytecode' = 'write',
> = {
  name: T
  kind: TMethodKind
  onError?: (error: Error) => void
  onSuccess?: UseDeployOnSuccess<TMethodKind>
}

export type UseDeployMutateData<TMethodKind extends 'write' | 'bytecode'> = {
  write: DeployWriteReturnType
  bytecode: Omit<DeployBytecodeReturnType, 'run'> & {
    bytecode: `0x${string}`
  }
}[TMethodKind]

/**
 * @description The return type for the deploy hook
 * @template T - The deployable contract
 * @template TMethodKind - The method kind
 * @returns The return type for the deploy hook
 */
export type UseDeployReturnType<
  T extends DeployableContracts,
  TMethodKind extends 'write' | 'bytecode' = 'write',
> = {
  inputs: GetModuleConfigData<T>
  userArgs: GetDeployWorkflowModuleArg<T>
  mutate: Omit<
    UseMutationResult<
      UseDeployMutateData<TMethodKind>,
      Error,
      TMethodKind extends 'write' ? [] : [`0x${string}`[]]
    >,
    'mutate' | 'mutateAsync'
  > & {
    mutate: TMethodKind extends 'write'
      ? (calls: `0x${string}`[], options?: MethodOptions) => void
      : (calls: `0x${string}`[]) => void
    mutateAsync: TMethodKind extends 'write'
      ? (
          calls: `0x${string}`[],
          options?: MethodOptions
        ) => Promise<UseDeployMutateData<TMethodKind>>
      : (calls: `0x${string}`[]) => Promise<UseDeployMutateData<TMethodKind>>
  }
  handleSetUserArgs: (name: string, value: any) => void
}

/**
 * @description Use the deploy hook to deploy a contract
 * @template T - The deployable contract
 * @template TMethodKind - The method kind
 * @param params - The parameters for the deploy
 * @returns The deploy hook
 */
export const useDeploy = <
  T extends DeployableContracts,
  TMethodKind extends 'write' | 'bytecode' = 'write',
>({
  name,
  kind = 'write' as TMethodKind,
  onError,
  onSuccess,
}: UseDeployParams<T, TMethodKind>): UseDeployReturnType<T, TMethodKind> => {
  const moduleData = getModuleData(name)
  const { chainId } = useAccount()

  if (!('deploymentInputs' in moduleData)) {
    throw new Error('Module does not support deployment')
  }

  const inputs = moduleData.deploymentInputs
    .configData as GetModuleConfigData<T>

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

  const mutation = useMutation({
    mutationFn: async (
      params: TMethodKind extends 'write'
        ? [calls: `0x${string}`[], options?: MethodOptions]
        : [`0x${string}`[]]
    ): Promise<UseDeployMutateData<TMethodKind>> => {
      if (!inverter.data) throw new Error('Inverter not initialized')

      const response = (await inverter.data.deploy[kind]({
        name,
        args: userArgs,
      })) as {
        write: DeployWriteReturnType
        bytecode: DeployBytecodeReturnType
      }[TMethodKind]

      if ('run' in response && params.length > 0) {
        const [calls] = params as [`0x${string}`[]]
        const bytecode = await response.run(calls)

        return {
          bytecode,
          ...response,
        } as unknown as UseDeployMutateData<TMethodKind>
      }

      return response as unknown as UseDeployMutateData<TMethodKind>
    },
    onSuccess: async (response) => {
      if ('transactionHash' in response) {
        const { contractAddress, transactionHash } = response
        addAddress({
          title: name,
          address: contractAddress,
          type: 'contract',
          chainId,
        })
        ;(onSuccess as UseDeployOnSuccess<'write'>)?.({
          contractAddress,
          transactionHash,
        })
      } else {
        const { contractAddress, factoryAddress, bytecode } = response

        ;(onSuccess as UseDeployOnSuccess<'bytecode'>)?.({
          contractAddress,
          factoryAddress,
          bytecode,
        })
      }
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  // Create wrapped mutate functions that accept spread parameters
  const wrappedMutate =
    kind === 'write'
      ? (calls: `0x${string}`[], options?: MethodOptions) => {
          mutation.mutate([calls, options] as any)
        }
      : (calls: `0x${string}`[]) => {
          mutation.mutate([calls] as any)
        }

  const wrappedMutateAsync =
    kind === 'write'
      ? async (calls: `0x${string}`[], options?: MethodOptions) => {
          return await mutation.mutateAsync([calls, options] as any)
        }
      : async (calls: `0x${string}`[]) => {
          return await mutation.mutateAsync([calls] as any)
        }

  const mutate = {
    ...mutation,
    mutate: wrappedMutate,
    mutateAsync: wrappedMutateAsync,
  } as UseDeployReturnType<T, TMethodKind>['mutate']

  return {
    inputs,
    mutate,
    userArgs,
    handleSetUserArgs,
  }
}
