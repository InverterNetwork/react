'use client'

import { subscription } from '@inverter-network/graphql'
import type {
  GraphQLSubscriptionArgs,
  GraphQLSubscriptionResult,
} from '@inverter-network/graphql'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

export type UseGraphQLSubscriptionParams<T extends GraphQLSubscriptionArgs> = {
  fields: T
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<GraphQLSubscriptionResult<T> | undefined, Error>,
    'queryKey' | 'queryFn'
  >
}

export type UseGraphQLSubscriptionReturnType<
  T extends GraphQLSubscriptionArgs = GraphQLSubscriptionArgs,
> = ReturnType<typeof useGraphQLSubscription<T>>

export const useGraphQLSubscription = <T extends GraphQLSubscriptionArgs>({
  fields,
  dependencies = [],
  options = {
    enabled: true,
  },
}: UseGraphQLSubscriptionParams<T>) => {
  return useQuery({
    queryKey: ['graphql-subscription', fields, ...dependencies],
    queryFn: () => subscription(fields),
    ...options,
  })
}
