import type {
  DeployBytecodeReturnType,
  GetDeployWorkflowArgs,
  GetSimulatedWorkflowReturnType,
  MixedRequestedModules,
  TagConfig,
} from '@inverter-network/sdk'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

import { getRequestedModulesString } from '@/utils/helpers'
import { useInverter } from '@/hooks/use-inverter'

/**
 * @description The parameters for the use get simulated workflow hook
 * @template TRequestedModules - The requested modules
 * @template TDeployWorkflowArgs - The arguments for the workflow deployment
 * @template TTokenBytecode - The bytecode of the token
 * @param params - The parameters for the use get simulated workflow hook
 */
export type UseGetSimulatedWorkflowParams<
  TRequestedModules extends MixedRequestedModules,
  TDeployWorkflowArgs extends GetDeployWorkflowArgs<TRequestedModules>,
  TTokenBytecode extends DeployBytecodeReturnType | undefined = undefined,
> = {
  requestedModules: TRequestedModules
  args: TDeployWorkflowArgs
  tagConfig?: TagConfig
  tokenBytecode?: TTokenBytecode
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<GetSimulatedWorkflowReturnType | undefined, Error>,
    'queryKey' | 'queryFn'
  >
}

/**
 * @description The return type of the use get simulated workflow hook
 * @template TRequestedModules - The requested modules
 * @template TDeployWorkflowArgs - The arguments for the workflow deployment
 * @template TTokenBytecode - The bytecode of the token
 * @returns The use get simulated workflow hook type
 */
export type UseGetSimulatedWorkflowReturnType = UseQueryResult<
  GetSimulatedWorkflowReturnType | undefined,
  Error
>

/**
 * @description The use get simulated workflow hook
 * @template TRequestedModules - The requested modules
 * @template TDeployWorkflowArgs - The arguments for the workflow deployment
 * @template TTokenBytecode - The bytecode of the token
 * @param params - The parameters for the use get simulated workflow hook
 * @returns The use get simulated workflow query result
 */
export function useGetSimulatedWorkflow<
  TRequestedModules extends MixedRequestedModules,
  TDeployWorkflowArgs extends GetDeployWorkflowArgs<TRequestedModules>,
  TTokenBytecode extends DeployBytecodeReturnType | undefined = undefined,
>({
  requestedModules,
  args,
  tagConfig,
  tokenBytecode,
  options = {
    enabled: true,
    refetchOnWindowFocus: false,
  },
  dependencies = [],
}: UseGetSimulatedWorkflowParams<
  TRequestedModules,
  TDeployWorkflowArgs,
  TTokenBytecode
>): UseGetSimulatedWorkflowReturnType {
  const inverter = useInverter()

  const enabled = !!inverter.data && options.enabled

  const requestedModulesDependencies =
    getRequestedModulesString(requestedModules)

  const query = useQuery({
    queryKey: [
      'simulated-workflow',
      inverter.dataUpdatedAt,
      requestedModulesDependencies,
      args,
      tokenBytecode?.contractAddress,
      ...dependencies,
    ],
    queryFn: () =>
      inverter.data!.getSimulatedWorkflow({
        requestedModules,
        args,
        tagConfig,
        tokenBytecode,
      }),

    ...options,
    enabled,
  })

  return query
}
