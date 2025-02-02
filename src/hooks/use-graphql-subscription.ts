'use client'

import * as React from 'react'
import { subscription } from '@inverter-network/graphql'
import type {
  GraphQLSubscriptionArgs,
  GraphQLSubscriptionResult,
} from '@inverter-network/graphql'

export type UseGraphQLSubscriptionParams<T extends GraphQLSubscriptionArgs> = {
  fields: T
  enabled?: boolean
}

export const useGraphQLSubscription = <T extends GraphQLSubscriptionArgs>({
  fields,
  enabled = true,
}: UseGraphQLSubscriptionParams<T>): GraphQLSubscriptionResult<T> | null => {
  const memo = React.useMemo(() => {
    return subscription(fields)
  }, [fields])

  const [data, setData] = React.useState<Awaited<typeof memo> | null>(null)

  React.useEffect(() => {
    if (!memo || !enabled) return

    const fetchData = async () => {
      try {
        const result = memo
        setData(result)
      } catch (error) {
        console.error('Error in GraphQL subscription:', error)
      }
    }

    fetchData()
  }, [memo, enabled])

  return data
}
