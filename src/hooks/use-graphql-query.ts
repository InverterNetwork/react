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
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { type Except } from 'type-fest-4'

export type UseBondingCurveQueryParams = {
  project: Array<keyof GQLBondingCurve>
  params?: FormattedGraphQLParams<GQLBondingCurve>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<Record<string, GQLBondingCurve[]> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseBondingCurveQueryReturnType = ReturnType<
  typeof useBondingCurveQuery
>

export const useBondingCurveQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseBondingCurveQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: ['bonding-curve', project, params, ...(dependencies || [])],
    queryFn: () =>
      inverter.data!.graphql.query.BondingCurve({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}

export type UseLinearVestingQueryParams = {
  project: Array<keyof GQLLinearVesting>
  params?: FormattedGraphQLParams<GQLLinearVesting>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<Record<string, GQLLinearVesting[]> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseLinearVestingQueryReturnType = ReturnType<
  typeof useLinearVestingQuery
>

export const useLinearVestingQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseLinearVestingQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: ['linear-vesting', project, params, ...(dependencies || [])],
    queryFn: () =>
      inverter.data!.graphql.query.LinearVesting({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}

export type UseStreamingPaymentProcessorQueryParams = {
  project: Array<keyof GQLStreamingPaymentProcessor>
  params?: FormattedGraphQLParams<GQLStreamingPaymentProcessor>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<
      Record<string, GQLStreamingPaymentProcessor[]> | undefined,
      Error
    >,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseStreamingPaymentProcessorQueryReturnType = ReturnType<
  typeof useStreamingPaymentProcessorQuery
>

export const useStreamingPaymentProcessorQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseStreamingPaymentProcessorQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: [
      'streaming-payment-processor',
      project,
      params,
      ...(dependencies || []),
    ],
    queryFn: () =>
      inverter.data!.graphql.query.StreamingPaymentProcessor({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}

export type UseSwapQueryParams = {
  project: Array<keyof GQLSwap>
  params?: FormattedGraphQLParams<GQLSwap>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<Record<string, GQLSwap[]> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseSwapQueryReturnType = ReturnType<typeof useSwapQuery>

export const useSwapQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseSwapQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: ['swap', project, params, ...(dependencies || [])],
    queryFn: () =>
      inverter.data!.graphql.query.Swap({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}

export type UseWorkflowQueryParams = {
  project: Array<keyof GQLWorkflow>
  params?: FormattedGraphQLParams<GQLWorkflow>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<Record<string, GQLWorkflow[]> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseWorkflowQueryReturnType = ReturnType<typeof useWorkflowQuery>

export const useWorkflowQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseWorkflowQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: ['workflow', project, params, ...(dependencies || [])],
    queryFn: () =>
      inverter.data!.graphql.query.Workflow({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}

export type UseWorkflowModuleQueryParams = {
  project: Array<keyof GQLWorkflowModule>
  params?: FormattedGraphQLParams<GQLWorkflowModule>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<Record<string, GQLWorkflowModule[]> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseWorkflowModuleQueryReturnType = ReturnType<
  typeof useWorkflowModuleQuery
>

export const useWorkflowModuleQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseWorkflowModuleQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: ['workflow-module', project, params, ...(dependencies || [])],
    queryFn: () =>
      inverter.data!.graphql.query.WorkflowModule({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}

export type UseWorkflowModuleTypeQueryParams = {
  project: Array<keyof GQLWorkflowModuleType>
  params?: FormattedGraphQLParams<GQLWorkflowModuleType>
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<Record<string, GQLWorkflowModuleType[]> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseWorkflowModuleTypeQueryReturnType = ReturnType<
  typeof useWorkflowModuleTypeQuery
>

export const useWorkflowModuleTypeQuery = ({
  project,
  params,
  dependencies,
  options = {},
}: UseWorkflowModuleTypeQueryParams) => {
  const inverter = useInverter()

  const enabled = !!inverter.data

  const query = useQuery({
    queryKey: [
      'workflow-module-type',
      project,
      params,
      ...(dependencies || []),
    ],
    queryFn: () =>
      inverter.data!.graphql.query.WorkflowModuleType({
        project,
        params,
      }),
    enabled,
    ...options,
  })

  return query
}
