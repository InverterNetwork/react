'use client'

import type {
  GraphQLQueryArgs,
  GraphQLQueryResult,
} from '@inverter-network/graphql'
import { query } from '@inverter-network/graphql'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

/**
 * @description Use the use graphql query hook to query a graphql query
 * @template T - The query args
 * @param params - The parameters for the use graphql query hook
 * @returns The use graphql query hook
 */
export type UseGraphQLQueryParams<T extends GraphQLQueryArgs> = {
  fields: T
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<GraphQLQueryResult<T> | undefined, Error>,
    'queryKey' | 'queryFn'
  >
}

/**
 * @description The return type of the use graphql query hook
 * @template T - The query args
 * @returns The use graphql query hook
 */
export type UseGraphQLQueryReturnType<
  T extends GraphQLQueryArgs = GraphQLQueryArgs,
> = ReturnType<typeof useGraphQLQuery<T>>

/**
 * @description The use graphql query hook
 * @template T - The query args
 * @param params - The parameters for the use graphql query hook
 * @returns The use graphql query hook
 */
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
