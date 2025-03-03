'use client'

import { useInverter } from '@/hooks'
import { useSelectorStore } from '@/store'
import type { UseDeployWorkflowProps } from '@/types'
import type {
  FactoryType,
  GetUserArgs,
  RequestedModules,
} from '@inverter-network/sdk'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'

export type UseDeployWorkflowReturnType<
  T extends RequestedModules<FT extends undefined ? 'default' : FT>,
  FT extends FactoryType | undefined = undefined,
> = ReturnType<typeof useDeployWorkflow<T, FT>>

export const useDeployWorkflow = <
  T extends RequestedModules<FT extends undefined ? 'default' : FT>,
  FT extends FactoryType | undefined = undefined,
>({
  requestedModules,
  factoryType,
  resetDeployWorkflowForm,
  onSuccess,
  onError,
}: UseDeployWorkflowProps<T, FT>) => {
  // Get the orchestrator state store
  const { addAddress } = useSelectorStore()

  // Get the inverter instance
  const inverter = useInverter()

  const requestedModulesHash = Object.values(requestedModules).reduce(
    (acc, curr) => acc + (Array.isArray(curr) ? curr.join(',') : curr),
    ''
  )

  const prevGetRequestedModulesHash = useRef<string | null>(null)

  const prepDeploymentQueryHash = `prep_deployment-${inverter.dataUpdatedAt}-${requestedModulesHash}-${factoryType}`

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
        factoryType,
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

  type Args = GetUserArgs<T, FT extends undefined ? 'default' : FT>

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
