'use-client'

import type {
  MixedRequestedModules,
  PopWalletClient,
  Workflow,
  WorkflowIssuanceToken,
  WorkflowToken,
} from '@inverter-network/sdk'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

import { useInverter } from '.'

export type UseWorkFlowParams<
  T extends MixedRequestedModules | undefined = undefined,
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
  T extends MixedRequestedModules | undefined = undefined,
> = ReturnType<typeof useWorkflow<T>>

export function useWorkflow<
  T extends MixedRequestedModules | undefined = undefined,
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
}: UseWorkFlowParams<T, FT, IT>): UseQueryResult<
  Workflow<PopWalletClient, T, FT, IT>
> {
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
