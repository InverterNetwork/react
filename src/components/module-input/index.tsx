import * as React from 'react'

import { Basic } from './basic'
import { Tuple } from './tuple'
import { Array } from './array'
import type { InputProps } from '../ui/input'
import type { ModuleInputProps } from '@/types'

const Base = ({
  input,
  arg,
  updateArg,
  argIndex,
  inputProps,
}: ModuleInputProps) => {
  if ('components' in input)
    return (
      <Tuple
        inputProps={inputProps}
        input={input}
        arg={arg}
        updateArg={updateArg}
        argIndex={argIndex}
      />
    )

  if (input.type.includes('[]'))
    return (
      <Array
        inputProps={inputProps}
        input={input}
        arg={arg}
        updateArg={updateArg}
        argIndex={argIndex}
      />
    )

  return (
    <Basic
      inputProps={inputProps}
      input={input}
      updateArg={updateArg}
      argIndex={argIndex}
      arg={arg ?? ''}
    />
  )
}

export const setInputPropsForForm = (props?: InputProps) => {
  let newProps: InputProps | undefined

  if (!!props) {
    const { className, ...restInputProps } = props

    const newClassName = className?.replace(/bg-\w+-\d+/g, '!bg-base-100')

    newProps = {
      className: newClassName,
      ...restInputProps,
    }
  }

  return newProps
}

export const ModuleInput = Object.assign(Base, {
  Basic,
  Tuple,
  Array,
})
