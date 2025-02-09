'use client'

import * as React from 'react'
import { subscription } from '@inverter-network/graphql'
import type {
  GraphQLSubscriptionArgs,
  SubscriptionResult,
} from '@inverter-network/graphql'

export type UseGraphQLSubscriptionParams<T extends GraphQLSubscriptionArgs> = {
  fields: T
  enabled?: boolean
}

export type UseGraphQLSubscriptionResult<T extends GraphQLSubscriptionArgs> = {
  data: SubscriptionResult<T> | null
  error: string | null
  isLoading: boolean
}

export const useGraphQLSubscription = <T extends GraphQLSubscriptionArgs>({
  fields,
  enabled = true,
}: UseGraphQLSubscriptionParams<T>): UseGraphQLSubscriptionResult<T> => {
  const [data, setData] = React.useState<SubscriptionResult<T> | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!enabled) return () => {} // Return empty cleanup function

    try {
      const sub = subscription(fields)
      let callbackId: string | null = null

      callbackId = sub.addCallback(setData)

      // Return cleanup function
      return () => {
        sub.removeCallback(callbackId)
      }
    } catch (error: any) {
      console.error(
        'Error subscribing to fields',
        error?.message ?? error?.cause ?? error
      )
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setError(error?.message ?? error?.cause ?? 'Unknown error')
      return () => {} // Add return for catch block
    }
  }, [JSON.stringify(fields), enabled])

  return { data, error, isLoading: !data }
}
