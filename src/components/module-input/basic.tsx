'use client'

import * as React from 'react'

import { amountString, prettyName } from '@/utils'
import { getJsType } from '@inverter-network/sdk'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Description } from '@/components/ui/description'
import type { NonTupleModuleInputProps } from '@/types'

export const Basic = ({
  input,
  updateArg,
  arg,
  argIndex,
  pruneArrayName,
  inputProps,
}: NonTupleModuleInputProps & {
  pruneArrayName?: boolean
}) => {
  const prunedType = input.type.startsWith('address')
    ? input.type
    : (getJsType(input) ?? input.type)

  const required =
    inputProps?.required ?? !['any', 'boolean'].includes(getJsType(input)!)

  const jsType = getJsType(input)

  const label = prettyName(input.name)
  const description = input.description

  const defaultProps = {
    ...inputProps,
    placeholder: pruneArrayName ? prunedType.replace('[]', '') : prunedType,
    [input.type === 'bool' ? 'checked' : 'value']: arg,
    required,
    onChange: (v: any) =>
      updateArg(argIndex, jsType === 'numberString' ? amountString(v) : v),
  }

  React.useEffect(() => {
    if (defaultProps.placeholder === 'boolean' && arg === '')
      defaultProps.onChange(false)
  }, [])

  const switchProps = {
    disabled: defaultProps.disabled,
    className: defaultProps.className,
    checked: defaultProps.value as unknown as boolean,
    required: defaultProps.required,
    label,
    onCheckedChange: defaultProps.onChange,
  }

  switch (jsType) {
    case 'boolean':
      return (
        <div className="in--grid in--w-full in--max-w-sm in--items-center in--gap-1.5">
          <Switch {...switchProps} />
          <Description>{description}</Description>
        </div>
      )
    case 'numberString':
    default:
      return (
        <div className="in--grid in--w-full in--max-w-sm in--items-center in--gap-1.5">
          <Label>{label}</Label>
          <Input {...defaultProps} />
          <Description>{description}</Description>
        </div>
      )
  }
}
