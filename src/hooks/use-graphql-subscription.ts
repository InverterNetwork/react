'use client'

import * as React from 'react'
import { subscription } from '@inverter-network/graphql'
import type {
  GraphQLSubscriptionArgs,
  SubscriptionResult,
} from '@inverter-network/graphql'
import d from 'debug'

const debug = d('inverter:use-graphql-subscription')

/**
 * @description The parameters for the use graphql subscription hook
 * @template TSubscriptionArgs - The subscription args
 * @param params - The parameters for the use graphql subscription hook
 * @returns The use graphql subscription hook
 */
export type UseGraphQLSubscriptionParams<
  TSubscriptionArgs extends GraphQLSubscriptionArgs,
> = {
  fields: TSubscriptionArgs
  enabled?: boolean
}

/**
 * @description The return type of the use graphql subscription hook
 * @template TSubscriptionArgs - The subscription args
 * @returns The use graphql subscription hook
 */
export type UseGraphQLSubscriptionResult<
  TSubscriptionArgs extends GraphQLSubscriptionArgs,
> = {
  data: SubscriptionResult<TSubscriptionArgs> | null
  error: string | null
  isLoading: boolean
}

/**
 * @description The use graphql subscription hook
 * @template TSubscriptionArgs - The subscription args
 * @param params - The parameters for the use graphql subscription hook
 * @returns The use graphql subscription hook query
 */
export const useGraphQLSubscription = <
  TSubscriptionArgs extends GraphQLSubscriptionArgs,
>({
  fields,
  enabled = true,
}: UseGraphQLSubscriptionParams<TSubscriptionArgs>): UseGraphQLSubscriptionResult<TSubscriptionArgs> => {
  const [data, setData] =
    React.useState<SubscriptionResult<TSubscriptionArgs> | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!enabled) {
      setData(null) // Clear data if disabled
      setError(null) // Clear error if disabled
      return () => {} // Return empty cleanup function
    }

    // If enabled, (re)start subscription.
    // Clear previous data/error to signify loading for the new/re-enabled subscription.
    setData(null)
    setError(null)

    try {
      const sub = subscription(fields)
      let callbackId: string | null = null

      callbackId = sub.addCallback(setData)

      // Return cleanup function
      return () => {
        sub.removeCallback(callbackId)
      }
    } catch (err: any) {
      const errorMessage = err?.message ?? err?.cause ?? err

      console.error('Error subscribing to fields', errorMessage)
      debug('[FULL ERROR]', err)

      setError(errorMessage)

      return () => {} // Add return for catch block
    }
  }, [JSON.stringify(fields), enabled])

  return { data, error, isLoading: enabled && !data && !error }
}
