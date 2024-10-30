'use client'

import * as React from 'react'
import type { GraphQLSubscriptionArgs } from '@inverter-network/sdk'
import type { Swap } from '@/types'
import { useGraphQLSubscription } from './use-graphql-subscription'

type BondingCurveId = string | undefined

const getSwapSubscriptionFields = (bondingCurveId: BondingCurveId) => {
  return {
    Swap: {
      __args: {
        where: {
          bondingCurve_id: { _eq: bondingCurveId },
        },
        order_by: [{ blockTimestamp: 'desc' }],
        limit: 1,
      },
      __scalar: 1,
    },
  } as const satisfies GraphQLSubscriptionArgs
}

export type UseSwapSubscriptionProps = {
  bondingCurveId: BondingCurveId
  setSwaps: React.Dispatch<React.SetStateAction<Swap[]>>
  enabled?: boolean
}

export type UseSwapSubscriptionReturnType = ReturnType<
  typeof useSwapSubscription
>

export function useSwapSubscription({
  bondingCurveId,
  setSwaps,
  enabled = true,
}: UseSwapSubscriptionProps) {
  const swapsSubscription = useGraphQLSubscription({
    fields: getSwapSubscriptionFields(bondingCurveId),
    enabled: !!bondingCurveId && enabled,
  })

  React.useEffect(() => {
    let isInitialCallback = true
    const callbackId = swapsSubscription?.addCallback((data) => {
      const swap = data?.Swap?.[0]
      if (isInitialCallback) {
        isInitialCallback = false
        return
      }
      if (!swap) return
      setSwaps((prev) => {
        if (prev.some((s) => s.id === swap?.id)) return prev
        return [swap, ...prev]
      })
    })

    return () => {
      callbackId && swapsSubscription?.removeCallback(callbackId)
    }
  }, [bondingCurveId, swapsSubscription, setSwaps])
}
