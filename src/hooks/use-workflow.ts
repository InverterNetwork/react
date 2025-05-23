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

/**
 * @description The parameters for the use workflow hook
 * @template TRequestedModules - The requested modules
 * @template TWorkflowToken - The funding token
 * @template TWorkflowIssuanceToken - The issuance token
 * @returns The use workflow hook parameters
 */
export type UseWorkFlowParams<
  TRequestedModules extends MixedRequestedModules | undefined = undefined,
  TWorkflowToken extends WorkflowToken | undefined = undefined,
  TWorkflowIssuanceToken extends WorkflowIssuanceToken | undefined = undefined,
> = {
  orchestratorAddress?: `0x${string}`
  requestedModules?: TRequestedModules
  issuanceTokenType?: TWorkflowIssuanceToken
  fundingTokenType?: TWorkflowToken
  options?: Except<
    UseQueryOptions<
      | Workflow<
          TRequestedModules,
          PopWalletClient,
          TWorkflowToken,
          TWorkflowIssuanceToken
        >
      | undefined,
      Error
    >,
    'queryKey' | 'queryFn'
  >
  dependencies?: any[]
}

/**
 * @description The return type of the use workflow hook
 * @template TRequestedModules - The requested modules
 * @returns The use workflow hook query
 */
export type UseWorkFlowReturnType<
  TRequestedModules extends MixedRequestedModules | undefined = undefined,
> = ReturnType<typeof useWorkflow<TRequestedModules>>

/**
 * @description The use workflow hook
 * @template TRequestedModules - The requested modules
 * @template TWorkflowToken - The funding token
 * @template TWorkflowIssuanceToken - The issuance token
 * @returns The use workflow hook
 */
export function useWorkflow<
  TRequestedModules extends MixedRequestedModules | undefined = undefined,
  TWorkflowToken extends WorkflowToken | undefined = undefined,
  TWorkflowIssuanceToken extends WorkflowIssuanceToken | undefined = undefined,
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
}: UseWorkFlowParams<
  TRequestedModules,
  TWorkflowToken,
  TWorkflowIssuanceToken
>): UseQueryResult<
  Workflow<
    TRequestedModules,
    PopWalletClient,
    TWorkflowToken,
    TWorkflowIssuanceToken
  >
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
