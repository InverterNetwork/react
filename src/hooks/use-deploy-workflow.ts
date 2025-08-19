'use client'

import * as React from 'react'
import { useInverter } from '@/hooks'
import { useSelectorStore } from '@/store'
import type {
  GetDeployWorkflowArgs,
  MixedRequestedModules,
} from '@inverter-network/sdk'
import { useMutation, useQuery } from '@tanstack/react-query'

export type UseDeployWorkflowOnSuccess = ({
  transactionHash,
  orchestratorAddress,
}: {
  transactionHash: `0x${string}`
  orchestratorAddress: `0x${string}`
}) => void

/**
 * @description The parameters for the deploy workflow hook
 * @template TRequestedModules - The requested modules
 * @template TUseTags - Whether to use tags
 * @returns The parameters for the deploy workflow hook
 */
export type UseDeployWorkflowParams<
  T extends MixedRequestedModules,
  TUseTags extends boolean = true,
> = {
  useTags?: TUseTags
  requestedModules: T
  resetDeployWorkflowForm?: () => void
  onSuccess?: UseDeployWorkflowOnSuccess
  onError?: (error: Error) => void
}

/**
 * @description Use the deploy workflow hook to deploy a workflow
 * @template TRequestedModules - The requested modules
 * @template TUseTags - Whether to use tags
 * @param params - The parameters for the deploy workflow
 * @returns The deploy workflow hook
 */
export type UseDeployWorkflowReturnType<
  TRequestedModules extends MixedRequestedModules,
  TUseTags extends boolean = true,
> = ReturnType<typeof useDeployWorkflow<TRequestedModules, TUseTags>>

/**
 * @description Use the deploy workflow hook to deploy a workflow
 * @template TRequestedModules - The requested modules
 * @template TUseTags - Whether to use tags
 * @param params - The parameters for the deploy workflow
 * @returns The deploy workflow hook
 */
export const useDeployWorkflow = <
  TRequestedModules extends MixedRequestedModules,
  TUseTags extends boolean = true,
>({
  requestedModules,
  resetDeployWorkflowForm,
  onSuccess,
  onError,
  useTags,
}: UseDeployWorkflowParams<TRequestedModules, TUseTags>) => {
  // Get the orchestrator state store
  const { addAddress } = useSelectorStore()

  // Get the inverter instance
  const inverter = useInverter()

  const requestedModulesHash = Object.values(requestedModules).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.join(',') : curr),
    ''
  )

  const prevGetRequestedModulesHash = React.useRef<string | null>(null)

  const prepDeploymentQueryHash = `prep_deployment-${inverter.dataUpdatedAt}-${requestedModulesHash}-${useTags}`

  // Prep the deployment
  const prepDeployment = useQuery({
    queryKey: [prepDeploymentQueryHash],
    queryFn: async ({ queryKey }) => {
      if (
        !('authorizer' in requestedModules) ||
        !('fundingManager' in requestedModules) ||
        !('paymentProcessor' in requestedModules)
      )
        throw new Error(
          'Authorizer, Funding Manager and Payment Processor are required'
        )

      if (!inverter.data) throw new Error('Inverter instance not found')

      const prevHash = prevGetRequestedModulesHash.current
      const currHash = queryKey[0].split('-')[2]

      const shouldResetForm = !!prevHash && prevHash !== currHash
      prevGetRequestedModulesHash.current = currHash

      if (shouldResetForm) resetDeployWorkflowForm?.()

      return await inverter.data.deployWorkflow({
        requestedModules,
        useTags,
      })
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 0,
    enabled:
      'authorizer' in requestedModules &&
      'fundingManager' in requestedModules &&
      'paymentProcessor' in requestedModules,
  })

  type Args = GetDeployWorkflowArgs<TRequestedModules, TUseTags>

  // Deploy the workflow
  const runDeployment = useMutation({
    mutationFn: async (userArgs: Args) => {
      if (!prepDeployment.data) throw new Error('No deploy data found')
      const unfrozenArgs = structuredClone(userArgs) as any
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

  return {
    prepDeployment,
    runDeployment,
  }
}
