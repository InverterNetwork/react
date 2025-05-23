import type {
  MethodOptions,
  ModuleMulticallCall,
  ModuleMulticallSimulateReturnType,
  ModuleMulticallWriteReturnType,
} from '@inverter-network/sdk'
import type {
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

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
  options?: Except<
    UseMutationOptions<
      | {
          write: ModuleMulticallWriteReturnType
          simulate: ModuleMulticallSimulateReturnType
        }[TMethodKind]
      | undefined,
      Error,
      TMethodKind extends 'write'
        ? [call: ModuleMulticallCall, options?: MethodOptions]
        : [call: ModuleMulticallCall]
    >,
    'mutationFn' | 'mutationKey'
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
> = Omit<
  UseMutationResult<
    | {
        write: ModuleMulticallWriteReturnType
        simulate: ModuleMulticallSimulateReturnType
      }[TMethodKind]
    | undefined,
    Error,
    TMethodKind extends 'write'
      ? [call: ModuleMulticallCall, options?: MethodOptions]
      : [call: ModuleMulticallCall],
    unknown
  >,
  'mutate' | 'mutateAsync'
> & {
  mutate: TMethodKind extends 'write'
    ? (call: ModuleMulticallCall, options?: MethodOptions) => void
    : (call: ModuleMulticallCall) => void
  mutateAsync: TMethodKind extends 'write'
    ? (
        call: ModuleMulticallCall,
        options?: MethodOptions
      ) => Promise<
        | {
            write: ModuleMulticallWriteReturnType
            simulate: ModuleMulticallSimulateReturnType
          }[TMethodKind]
        | undefined
      >
    : (call: ModuleMulticallCall) => Promise<
        | {
            write: ModuleMulticallWriteReturnType
            simulate: ModuleMulticallSimulateReturnType
          }[TMethodKind]
        | undefined
      >
}

/**
 * @description The use module multicall hook, which allows you to make a write or simulate a multicall using inverter module methods
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

  const query = useMutation({
    mutationKey: [
      'module-multicall',
      inverter.dataUpdatedAt,
      kind,
      upstreamAddress,
      ...dependencies,
    ],
    mutationFn: async (
      params: TMethodKind extends 'write'
        ? [call: ModuleMulticallCall, options?: MethodOptions]
        : [call: ModuleMulticallCall]
    ) => {
      if (!inverter.data) throw new Error('Inverter sdk not initialized')

      const actions = {
        write: async () => {
          const [call, options] = params as [
            ModuleMulticallCall,
            MethodOptions?,
          ]
          return await inverter.data!.moduleMulticall.write(
            {
              ...rest,
              call,
            },
            options
          )
        },
        simulate: async () => {
          const [call] = params as [ModuleMulticallCall]
          return await inverter.data!.moduleMulticall.simulate({
            ...rest,
            call,
          })
        },
      }

      return (await actions[kind]()) as {
        write: ModuleMulticallWriteReturnType
        simulate: ModuleMulticallSimulateReturnType
      }[TMethodKind]
    },

    ...options,
  })

  // Create wrapped mutate functions that accept spread parameters
  const wrappedMutate =
    kind === 'write'
      ? (call: ModuleMulticallCall, options?: MethodOptions) => {
          query.mutate([call, options] as any)
        }
      : (call: ModuleMulticallCall) => {
          query.mutate([call] as any)
        }

  const wrappedMutateAsync =
    kind === 'write'
      ? async (call: ModuleMulticallCall, options?: MethodOptions) => {
          return await query.mutateAsync([call, options] as any)
        }
      : async (call: ModuleMulticallCall) => {
          return await query.mutateAsync([call] as any)
        }

  return {
    ...query,
    mutate: wrappedMutate,
    mutateAsync: wrappedMutateAsync,
  } as UseModuleMulticallReturnType<TMethodKind>
}
