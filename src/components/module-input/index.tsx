import * as React from 'react'

import { Basic } from './basic'
import { Tuple } from './tuple'
import { Array } from './array'
import type { ModuleInputProps } from '@/types'

const Base = ({
  input,
  arg,
  updateArg,
  argIndex,
  inputProps,
  containerProps,
}: ModuleInputProps) => {
  if ('components' in input)
    return (
      <Tuple
        containerProps={containerProps}
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
        containerProps={containerProps}
        inputProps={inputProps}
        input={input}
        arg={arg}
        updateArg={updateArg}
        argIndex={argIndex}
      />
    )

  return (
    <Basic
      containerProps={containerProps}
      inputProps={inputProps}
      input={input}
      updateArg={updateArg}
      argIndex={argIndex}
      arg={arg ?? ''}
    />
  )
}

export const ModuleInput = Object.assign(Base, {
  Basic,
  Tuple,
  Array,
})
