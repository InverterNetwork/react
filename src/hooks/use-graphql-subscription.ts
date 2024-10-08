import * as React from 'react'
import { useInverter } from './use-inverter'
import type {
  FormattedGraphQLParams,
  GQLBondingCurve,
  GQLLinearVesting,
  GQLStreamingPaymentProcessor,
  GQLSwap,
  GQLWorkflow,
  GQLWorkflowModule,
  GQLWorkflowModuleType,
} from '@inverter-network/sdk'

export type UseBondingCurveSubscriptionParams = {
  project: Array<keyof GQLBondingCurve>
  params?: FormattedGraphQLParams<GQLBondingCurve>
}

export type UseBondingCurveSubscriptionReturnType = ReturnType<
  typeof useBondingCurveSubscription
>

export const useBondingCurveSubscription = ({
  project,
  params,
}: UseBondingCurveSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data!.graphql.subscription.BondingCurveSubscription({
      project,
      params,
    })
  }, [inverter.data, project, params])

  return memo
}

export type UseLinearVestingSubscriptionParams = {
  project: Array<keyof GQLLinearVesting>
  params?: FormattedGraphQLParams<GQLLinearVesting>
}

export type UseLinearVestingSubscriptionReturnType = ReturnType<
  typeof useLinearVestingSubscription
>

export const useLinearVestingSubscription = ({
  project,
  params,
}: UseLinearVestingSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data.graphql.subscription.LinearVestingSubscription({
      project,
      params,
    })
  }, [inverter.data, project, params])

  return memo
}

export type UseStreamingPaymentProcessorSubscriptionParams = {
  project: Array<keyof GQLStreamingPaymentProcessor>
  params?: FormattedGraphQLParams<GQLStreamingPaymentProcessor>
}

export type UseStreamingPaymentProcessorSubscriptionReturnType = ReturnType<
  typeof useStreamingPaymentProcessorSubscription
>

export const useStreamingPaymentProcessorSubscription = ({
  project,
  params,
}: UseStreamingPaymentProcessorSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data.graphql.subscription.StreamingPaymentProcessorSubscription(
      {
        project,
        params,
      }
    )
  }, [!inverter.data, project, params])

  return memo
}

export type UseSwapSubscriptionParams = {
  project: Array<keyof GQLSwap>
  params?: FormattedGraphQLParams<GQLSwap>
}

export type UseSwapSubscriptionReturnType = ReturnType<
  typeof useSwapSubscription
>

export const useSwapSubscription = ({
  project,
  params,
}: UseSwapSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data.graphql.subscription.SwapSubscription({
      project,
      params,
    })
  }, [!inverter.data, project, params])

  return memo
}

export type UseWorkflowSubscriptionParams = {
  project: Array<keyof GQLWorkflow>
  params?: FormattedGraphQLParams<GQLWorkflow>
}

export type UseWorkflowSubscriptionReturnType = ReturnType<
  typeof useWorkflowSubscription
>

export const useWorkflowSubscription = ({
  project,
  params,
}: UseWorkflowSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data.graphql.subscription.WorkflowSubscription({
      project,
      params,
    })
  }, [!inverter.data, project, params])

  return memo
}

export type UseWorkflowModuleSubscriptionParams = {
  project: Array<keyof GQLWorkflowModule>
  params?: FormattedGraphQLParams<GQLWorkflowModule>
}

export type UseWorkflowModuleSubscriptionReturnType = ReturnType<
  typeof useWorkflowModuleSubscription
>

export const useWorkflowModuleSubscription = ({
  project,
  params,
}: UseWorkflowModuleSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data.graphql.subscription.WorkflowModuleSubscription({
      project,
      params,
    })
  }, [!inverter.data, project, params])

  return memo
}

export type UseWorkflowModuleTypeSubscriptionParams = {
  project: Array<keyof GQLWorkflowModuleType>
  params?: FormattedGraphQLParams<GQLWorkflowModuleType>
}

export type UseWorkflowModuleTypeSubscriptionReturnType = ReturnType<
  typeof useWorkflowModuleTypeSubscription
>

export const useWorkflowModuleTypeSubscription = ({
  project,
  params,
}: UseWorkflowModuleTypeSubscriptionParams) => {
  const inverter = useInverter()

  const memo = React.useMemo(() => {
    if (!inverter.data) return null
    return inverter.data.graphql.subscription.WorkflowModuleTypeSubscription({
      project,
      params,
    })
  }, [!inverter.data, project, params])

  return memo
}
