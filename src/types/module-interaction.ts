import type { InputProps } from '@/components/ui/input'
import type {
  ExtendedAbiParameter,
  NonTupleExtendedAbiParameter,
  TupleExtendedAbiParameter,
} from '@inverter-network/sdk'

export type UpdateModuleArgValue = string | number | boolean | object | any[]

export type UpdateModuleArg = (
  argIndex: number,
  argValue: UpdateModuleArgValue
) => void

export type BaseProps = {
  arg: any
  updateArg: UpdateModuleArg
  argIndex: number
  inputProps?: InputProps
}

export type NonTupleModuleInputProps = BaseProps & {
  input: NonTupleExtendedAbiParameter
}

export type NonTupleArrayModuleInputProps = BaseProps & {
  input: NonTupleExtendedAbiParameter
}

export type TupleModuleInputProps = BaseProps & {
  input: TupleExtendedAbiParameter
}

export type TupleModuleInputMapperProps = TupleModuleInputProps & {
  tupleIndex: number
}

export type ModuleInputProps = BaseProps & {
  input: ExtendedAbiParameter
}
