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
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseGraphQLQueryReturnType = ReturnType<typeof useGraphQLQuery>

export const useGraphQLQuery = <T extends GraphQLQueryArgs>({
  fields,
  dependencies,
  options = {},
}: UseGraphQLQueryParams<T>) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: ['graphql-query', fields, ...(dependencies || [])],
    queryFn: () => inverter.data!.graphql.query(fields),
    enabled,
    ...options,
  })

  return query
}
