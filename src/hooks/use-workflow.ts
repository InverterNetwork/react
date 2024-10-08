'use-client'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useInverter } from '.'
import type {
  FactoryType,
  PopWalletClient,
  RequestedModules,
  Workflow,
} from '@inverter-network/sdk'

export type UseWorkFlowReturnType = ReturnType<typeof useWorkflow>

export function useWorkflow<T extends RequestedModules<FactoryType>>({
  orchestratorAddress,
  requestedModules,
}: {
  orchestratorAddress?: `0x${string}`
  requestedModules?: T
}): UseQueryResult<Workflow<PopWalletClient, T>> {
  const inverter = useInverter()

  const enabled = !!inverter.data && !!orchestratorAddress

  const query = useQuery({
    queryKey: ['workflow', inverter.dataUpdatedAt],
    queryFn: () =>
      inverter.data!.getWorkflow({
        orchestratorAddress: orchestratorAddress!,
        requestedModules,
      }),
    enabled,
    refetchOnWindowFocus: false,
  })

  return query as any
}
