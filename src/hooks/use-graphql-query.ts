'use client'

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'
import type {
  GraphQLQueryArgs,
  GraphQLQueryResult,
} from '@inverter-network/graphql'
import { query } from '@inverter-network/graphql'

export type UseGraphQLQueryParams<T extends GraphQLQueryArgs> = {
  fields: T
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<GraphQLQueryResult<T> | undefined, Error>,
    'queryKey' | 'queryFn'
  >
}

export type UseGraphQLQueryReturnType<
  T extends GraphQLQueryArgs = GraphQLQueryArgs,
> = ReturnType<typeof useGraphQLQuery<T>>

export const useGraphQLQuery = <T extends GraphQLQueryArgs>({
  fields,
  dependencies = [],
  options = {
    enabled: true,
  },
}: UseGraphQLQueryParams<T>) => {
  const queryResult = useQuery({
    queryKey: ['graphql-query', fields, ...dependencies],
    queryFn: () => query(fields),
    ...options,
  })

  return queryResult
}
