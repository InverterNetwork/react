import type { InputProps } from '@/components/ui/input'
import type {
  ExtendedAbiParameter,
  NonTupleExtendedAbiParameter,
  TupleExtendedAbiParameter,
} from '@inverter-network/sdk'

export type UpdateModuleArgValue = string | number | boolean | object | any[]

export type UpdateModuleMethodArg = (
  argIndex: number,
  argValue: UpdateModuleArgValue
) => void

export type ModuleInputBaseProps = {
  arg: any
  updateArg: UpdateModuleMethodArg
  argIndex: number
  inputProps?: InputProps
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export type NonTupleModuleInputProps = ModuleInputBaseProps & {
  input: NonTupleExtendedAbiParameter
}

export type NonTupleArrayModuleInputProps = ModuleInputBaseProps & {
  input: NonTupleExtendedAbiParameter
}

export type TupleModuleInputProps = ModuleInputBaseProps & {
  input: TupleExtendedAbiParameter
}

export type TupleModuleInputMapperProps = TupleModuleInputProps & {
  tupleIndex: number
}

export type ModuleInputProps = ModuleInputBaseProps & {
  input: ExtendedAbiParameter
}

// Store
import type { UserFacingModuleType } from '@inverter-network/abis'

export type SelectedModuleType =
  | UserFacingModuleType
  | 'fundingToken.module'
  | 'issuanceToken.module'

export type ModuleInteractionMode = 'read' | 'write'

export type UpdateModuleMethodBase = {
  moduleName: string
  methodName: string
}

export type UpdateModuleMethodArgParams = UpdateModuleMethodBase & {
  argIndex: number
  argValue: UpdateModuleArgValue
  argsLength: number
}

export type SetAccordionOpenParams = UpdateModuleMethodBase & {
  isOpen: boolean
}

export type UpdateModuleMethodResponseParams = UpdateModuleMethodBase & {
  response: any
}

export type ModuleInteractionMethodState = {
  isOpen?: boolean
  methodName?: string
  args?: any[]
  response?: any
}

export type ModuleInteractionState = ModuleInteractionMethodState[]

export type ModuleState = Record<string, ModuleInteractionState | undefined>

export interface ModuleInteractionStore {
  moduleInteractionState: ModuleState
  selectedModuleType: SelectedModuleType
  selectedOptionalModuleIndex: number
  moduleInteractionMode: ModuleInteractionMode
  setModuleInteractionMode: (mode: ModuleInteractionMode) => void
  setSelectedModuleType: (moduleType: SelectedModuleType) => void
  setSelectedOptionalModuleIndex: (index: number) => void
  updateModuleMethodArg: (params: UpdateModuleMethodArgParams) => void
  setModuleMethodIsOpen: (params: SetAccordionOpenParams) => void
  updateModuleMethodResponse: (params: UpdateModuleMethodResponseParams) => void
  resetModuleInteractionState: () => void
}
