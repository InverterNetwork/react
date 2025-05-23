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
 * @template TQueryArgs - The query args
 * @param params - The parameters for the use graphql query hook
 * @returns The use graphql query hook
 */
export type UseGraphQLQueryParams<TQueryArgs extends GraphQLQueryArgs> = {
  fields: TQueryArgs
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<GraphQLQueryResult<TQueryArgs> | undefined, Error>,
    'queryKey' | 'queryFn'
  >
}

/**
 * @description The return type of the use graphql query hook
 * @template TQueryArgs - The query args
 * @returns The use graphql query hook
 */
export type UseGraphQLQueryReturnType<
  TQueryArgs extends GraphQLQueryArgs = GraphQLQueryArgs,
> = ReturnType<typeof useGraphQLQuery<TQueryArgs>>

/**
 * @description The use graphql query hook
 * @template TQueryArgs - The query args
 * @param params - The parameters for the use graphql query hook
 * @returns The use graphql query hook
 */
export const useGraphQLQuery = <TQueryArgs extends GraphQLQueryArgs>({
  fields,
  dependencies = [],
  options = {
    enabled: true,
  },
}: UseGraphQLQueryParams<TQueryArgs>) => {
  const queryResult = useQuery({
    queryKey: ['graphql-query', fields, ...dependencies],
    queryFn: () => query(fields),
    ...options,
  })

  return queryResult
}
