'use client'

import * as React from 'react'
import { useInverter } from './use-inverter'
import type {
  GraphQLSubscriptionArgs,
  GraphQLSubscriptionResult,
} from '@inverter-network/sdk'

export type UseGraphQLSubscriptionParams<T extends GraphQLSubscriptionArgs> = {
  fields: T
  enabled?: boolean
}

export const useGraphQLSubscription = <T extends GraphQLSubscriptionArgs>({
  fields,
  enabled = true,
}: UseGraphQLSubscriptionParams<T>): GraphQLSubscriptionResult<T> | null => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data!.graphql.subscription(fields)
  }, [inverter.data, fields])

  const [data, setData] = React.useState<Awaited<typeof memo> | null>(null)

  React.useEffect(() => {
    if (!memo || !enabled) return

    const fetchData = async () => {
      try {
        const result = await memo
        setData(result)
      } catch (error) {
        console.error('Error in GraphQL subscription:', error)
      }
    }

    fetchData()
  }, [memo, enabled])

  return data
}
