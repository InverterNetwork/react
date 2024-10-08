'use client'

import * as React from 'react'

import { remove } from 'lodash'
import { Mapper } from './mapper'
import Form from '../form'
import type { TupleModuleInputProps } from '@/types'

export const Tuple = ({
  input,
  argIndex,
  updateArg,
  arg,
  inputProps,
  containerProps,
}: TupleModuleInputProps) => {
  const [uids, setUids] = React.useState([
    (crypto.randomUUID() as string) ?? Math.floor(Math.random() * 10000),
  ])

  const handleRemove = (tupleIndex: number, uid: string) => {
    setUids(remove(uids, (u: any) => u !== uid))
    if (!arg?.length) return
    updateArg(
      argIndex,
      (arg as any[]).filter((_, i) => i !== tupleIndex)
    )
  }

  const isArray = input.type === 'tuple[]'

  return (
    <Form
      name={input.name}
      description={input.description}
      arg={arg}
      isArray={isArray}
      uids={uids}
      setUids={setUids}
    >
      {uids.map((uid, tupleIndex) => (
        <div key={uid} className="in--flex in--flex-col in--gap-3 in--relative">
          {isArray && (
            <Form.ArrayItemHeader
              name={input.name}
              index={tupleIndex}
              onRemove={() => handleRemove(tupleIndex, uid)}
            />
          )}
          {/* Run the Mapper for each member */}
          <Mapper
            containerProps={containerProps}
            inputProps={inputProps}
            tupleIndex={tupleIndex}
            updateArg={updateArg}
            argIndex={argIndex}
            arg={arg}
            input={input}
          />
        </div>
      ))}
    </Form>
  )
}
