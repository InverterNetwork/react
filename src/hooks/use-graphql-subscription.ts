'use client'

import * as React from 'react'
import { useInverter } from './use-inverter'
import type { GraphQLSubscriptionArgs } from '@inverter-network/sdk'

export type UseGraphQLSubscriptionParams = {
  fields: GraphQLSubscriptionArgs
}

export type UseBondingCurveSubscriptionReturnType = ReturnType<
  typeof useGraphQLSubscription
>

export const useGraphQLSubscription = ({
  fields,
}: UseGraphQLSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data!.graphql.subscription(fields)
  }, [inverter.data, fields])

  return memo
}
