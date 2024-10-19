'use client'

import * as React from 'react'

import { amountString, cn, prettyName } from '@/utils'
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
  containerProps,
}: NonTupleModuleInputProps & {
  pruneArrayName?: boolean
}) => {
  const jsType = getJsType(input)

  const prunedType = input.type.startsWith('address')
    ? input.type
    : (jsType ?? input.type)

  const required =
    inputProps?.required ?? !['any', 'boolean'].includes(getJsType(input)!)

  const label = prettyName(input.name)
  const description = input.description

  const defaultProps = {
    ...inputProps,
    placeholder: pruneArrayName ? prunedType.replace('[]', '') : prunedType,
    [input.type === 'bool' ? 'checked' : 'value']: arg,
    required,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      updateArg(
        argIndex,
        jsType === 'numberString'
          ? amountString(e.target.value)
          : e.target.value
      ),
  }

  React.useEffect(() => {
    if (defaultProps.placeholder === 'boolean' && arg === '')
      updateArg(argIndex, false)
  }, [])

  const switchProps = {
    disabled: defaultProps.disabled,
    className: defaultProps.className,
    checked: defaultProps.value as unknown as boolean,
    required: defaultProps.required,
    label,
    onCheckedChange: (e: boolean) => updateArg(argIndex, e),
  }

  const { className, ...rest } = containerProps ?? {}

  switch (jsType) {
    case 'boolean':
      return (
        <div
          {...rest}
          className={cn('in--grid in--items-center in--gap-1.5', className)}
        >
          <Label>{label}</Label>
          <Switch {...switchProps} />
          <Description>{description}</Description>
        </div>
      )
    case 'numberString':
    default:
      return (
        <div
          {...rest}
          className={cn('in--grid in--items-center in--gap-1.5', className)}
        >
          <Label>{label}</Label>
          <Input {...defaultProps} />
          <Description>{description}</Description>
        </div>
      )
  }
}
