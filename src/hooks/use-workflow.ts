'use-client'

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useInverter } from '.'
import type {
  FactoryType,
  PopWalletClient,
  RequestedModules,
  Workflow,
  WorkflowIssuanceToken,
  WorkflowToken,
} from '@inverter-network/sdk'
import type { Except } from 'type-fest-4'

export type UseWorkFlowParams<
  T extends RequestedModules<FactoryType> | undefined = undefined,
  FT extends WorkflowToken | undefined = undefined,
  IT extends WorkflowIssuanceToken | undefined = undefined,
> = {
  orchestratorAddress?: `0x${string}`
  requestedModules?: T
  issuanceTokenType?: IT
  fundingTokenType?: FT
  options?: Except<
    UseQueryOptions<Workflow<PopWalletClient, T, FT, IT> | undefined, Error>,
    'queryKey' | 'queryFn'
  >
  dependencies?: any[]
}

export type UseWorkFlowReturnType<
  T extends RequestedModules<FactoryType> | undefined = undefined,
> = ReturnType<typeof useWorkflow<T>>

export function useWorkflow<
  T extends RequestedModules<FactoryType> | undefined = undefined,
  FT extends WorkflowToken | undefined = undefined,
  IT extends WorkflowIssuanceToken | undefined = undefined,
>({
  orchestratorAddress,
  requestedModules,
  issuanceTokenType,
  fundingTokenType,
  options = {
    enabled: true,
    refetchOnWindowFocus: false,
  },
  dependencies = [],
}: UseWorkFlowParams<T>): UseQueryResult<Workflow<PopWalletClient, T, FT, IT>> {
  const inverter = useInverter()

  const enabled = !!inverter.data && !!orchestratorAddress && options.enabled

  const query = useQuery({
    queryKey: [
      'workflow',
      inverter.dataUpdatedAt,
      orchestratorAddress,
      ...dependencies,
    ],
    queryFn: () =>
      inverter.data!.getWorkflow({
        orchestratorAddress: orchestratorAddress!,
        issuanceTokenType,
        fundingTokenType,
        requestedModules,
      }) as any,
    ...options,
    enabled,
  })

  return query as any
}
