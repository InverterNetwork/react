'use client'

import { useInverter } from './use-inverter'
import { useQuery } from '@tanstack/react-query'

import type {
  GraphQLQueryArgs,
  GraphQLQueryResult,
} from '@inverter-network/sdk'
import type { UseQueryOptions } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

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
  const inverter = useInverter()

  const enabled = !!inverter.data && options.enabled

  const query = useQuery({
    queryKey: ['graphql-query', fields, ...dependencies],
    queryFn: () => inverter.data!.graphql.query(fields),
    ...options,
    enabled,
  })

  return query
}
