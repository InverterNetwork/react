import type {
  MethodOptions,
  ModuleMulticallSimulateReturnType,
  ModuleMulticallWriteReturnType,
  SingleModuleCall,
} from '@inverter-network/sdk'
import type {
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { useInverter } from '@/hooks/use-inverter'

/**
 * @description The parameters for the use module multicall hook
 * @template TMethodKind - The method kind
 * @param params.kind - The method kind
 * @param params.dependencies - The dependencies for the hook
 * @param params.options - The options for the hook
 * @param params.trustedForwarderAddress - The trusted forwarder address ( either this or orchestratorAddress is required )
 * @param params.orchestratorAddress - The orchestrator address ( either this or trustedForwarderAddress is required )
 */
export type UseModuleMulticallParams<
  TMethodKind extends 'write' | 'simulate' = 'write',
> = {
  kind: TMethodKind
  dependencies?: any[]
  options?: UseMutationOptions<
    | {
        write: ModuleMulticallWriteReturnType
        simulate: ModuleMulticallSimulateReturnType
      }[TMethodKind]
    | undefined,
    Error,
    {
      write: { calls: SingleModuleCall[]; options?: MethodOptions }
      simulate: { calls: SingleModuleCall[] }
    }[TMethodKind]
  >
} & (
  | {
      trustedForwarderAddress: `0x${string}`
    }
  | {
      orchestratorAddress: `0x${string}`
    }
)

/**
 * @description The return type of the use module multicall hook
 * @template TMethodKind - The method kind
 * @returns The use module multicall hook query result
 */
export type UseModuleMulticallReturnType<
  TMethodKind extends 'write' | 'simulate' = 'write',
> = UseMutationResult<
  | {
      write: ModuleMulticallWriteReturnType
      simulate: ModuleMulticallSimulateReturnType
    }[TMethodKind]
  | undefined,
  Error,
  {
    write: { calls: SingleModuleCall[]; options?: MethodOptions }
    simulate: { calls: SingleModuleCall[] }
  }[TMethodKind]
>

/**
 * @description The use module multicall hook, which allows you to make a write or simulate a multicall using inverter module methods
 * @template TMethodKind - The method kind
 * @param params.kind - The method kind
 * @param params.dependencies - The dependencies for the hook
 * @param params.options - The options for the hook
 * @param params.trustedForwarderAddress - The trusted forwarder address ( either this or orchestratorAddress is required )
 * @param params.orchestratorAddress - The orchestrator address ( either this or trustedForwarderAddress is required )
 * @returns The use module multicall mutation hook
 */
export function useModuleMulticall<
  TMethodKind extends 'write' | 'simulate' = 'write',
>({
  kind = 'write' as TMethodKind,
  options,
  dependencies = [],
  ...rest
}: UseModuleMulticallParams<TMethodKind>): UseModuleMulticallReturnType<TMethodKind> {
  const inverter = useInverter()

  const upstreamAddress =
    'trustedForwarderAddress' in rest
      ? rest.trustedForwarderAddress
      : rest.orchestratorAddress

  const mutation = useMutation({
    mutationKey: [
      'module-multicall',
      inverter.dataUpdatedAt,
      kind,
      upstreamAddress,
      ...dependencies,
    ],
    mutationFn: async (params) => {
      if (!inverter.data) throw new Error('Inverter sdk not initialized')

      return (await inverter.data!.moduleMulticall[kind](
        {
          ...rest,
          calls: params.calls,
        },
        ...('options' in params ? [params.options] : [])
      )) as {
        write: ModuleMulticallWriteReturnType
        simulate: ModuleMulticallSimulateReturnType
      }[TMethodKind]
    },

    ...options,
  })

  return mutation
}
