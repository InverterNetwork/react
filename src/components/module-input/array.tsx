'use client'

import * as React from 'react'

import { ModuleInput, setInputPropsForForm } from '.'
import { remove } from 'lodash'
import Form from './form'
import type { NonTupleArrayModuleInputProps } from '@/types'

export const Array = ({
  argIndex,
  updateArg,
  inputProps,
  ...props
}: NonTupleArrayModuleInputProps) => {
  const [uids, setUids] = React.useState([
    (crypto.randomUUID() as string) ?? Math.floor(Math.random() * 10000),
  ])

  const handleRemove = (arrayIndex: number, uid: string) => {
    setUids(remove(uids, (u) => u !== uid))

    if (!props.arg?.length) return

    const newArg = (props.arg as any[]).filter((_, i) => i !== arrayIndex)

    updateArg(argIndex, newArg)
  }

  const handleChange = (arrayIndex: number, value: any) => {
    const newArg = [...(props.arg ?? [])]
    newArg[arrayIndex] = value

    updateArg(argIndex, newArg)
  }

  inputProps = setInputPropsForForm(inputProps)

  return (
    <Form
      isArray
      uids={uids}
      setUids={setUids}
      name={props.input.name}
      description={props.input.description}
      arg={props.arg}
    >
      {uids.map((uid, arrayIndex) => (
        <div key={uid} className="in--flex in--flex-col in--gap-3 in--relative">
          <Form.ArrayItemHeader
            index={arrayIndex}
            onRemove={() => handleRemove(arrayIndex, uid)}
            name={props.input.name}
          />
          <ModuleInput.Basic
            inputProps={inputProps}
            pruneArrayName
            input={props.input}
            arg={props.arg?.[arrayIndex]}
            argIndex={arrayIndex}
            updateArg={handleChange}
          />
        </div>
      ))}
    </Form>
  )
}
