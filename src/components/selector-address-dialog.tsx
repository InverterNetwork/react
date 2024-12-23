'use client'

import * as React from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/client'

import { Button, cn, FloatingLabelInput } from '@/index'
import type { ButtonProps } from '@/index'

import { chainNames, getChainName } from '@inverter-network/sdk'

import { Check, ChevronsUpDown } from 'lucide-react'
import type { SelectorStoreAddressItem } from '@/types'

export type OnSelectorAddressLabelDone = (
  selectorItem: Pick<
    SelectorStoreAddressItem,
    'type' | 'title' | 'address' | 'chainId'
  >
) => void

export type SelectorAddressDialogProps = {
  selectorItem: Partial<SelectorStoreAddressItem> &
    Pick<SelectorStoreAddressItem, 'type'>
  title: string
  triggerLabel: string
  closeLabel: string
  isDropdownItem?: boolean
  onDone?: OnSelectorAddressLabelDone
  className?: string
  buttonProps?: ButtonProps
}

export function SelectorAddressDialog({
  selectorItem,
  title,
  triggerLabel,
  closeLabel,
  className,
  onDone,
  isDropdownItem = false,
  buttonProps,
}: SelectorAddressDialogProps) {
  const [isChainSelectOpen, setIsChainSelectOpen] = React.useState(false)

  const [internalTitle, setInternalTitle] = React.useState(
    selectorItem?.title ?? ''
  )
  const [internalAddress, setInternalAddress] = React.useState(
    (selectorItem?.address ?? '') as `0x${string}`
  )
  const [internalChainId, setInternalChainId] = React.useState(
    String(selectorItem?.chainId ?? '')
  )

  const { className: buttonClassName, ...buttonPropsRest } = buttonProps || {}

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className={cn(className, isDropdownItem && 'in--w-full')}
      >
        {isDropdownItem ? (
          <DropdownMenuItem
            className="in--w-full"
            onSelect={(e) => e.preventDefault()}
          >
            <span>{triggerLabel}</span>
          </DropdownMenuItem>
        ) : (
          <Button
            {...buttonPropsRest}
            className={cn('in--!my-auto', buttonClassName)}
          >
            {triggerLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:in--max-w-[425px] in--max-h-[80vh] in--overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <FloatingLabelInput
          label="Title"
          value={internalTitle}
          onChange={(e) => setInternalTitle(e.target.value)}
        />

        <FloatingLabelInput
          label="Address"
          value={internalAddress}
          onChange={(e) => setInternalAddress(e.target.value as `0x${string}`)}
        />

        <Popover open={isChainSelectOpen} onOpenChange={setIsChainSelectOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isChainSelectOpen}
            >
              {internalChainId
                ? getChainName(Number(internalChainId) ?? 'Unknown chain...')
                : 'Select chain...'}
              <ChevronsUpDown className="in--ml-2 in--h-4 in--w-4 in--shrink-0 in--opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="in--w-[200px] in--p-0">
            <Command>
              <CommandInput placeholder="Search chain..." />
              <CommandList>
                <CommandEmpty>No chain found.</CommandEmpty>
                <CommandGroup>
                  {chainNames.map((chain) => (
                    <CommandItem
                      key={`${chain.id}:${chain.name}`}
                      value={`${chain.id}:${chain.name}`}
                      onSelect={(currentValue) => {
                        const [id] = currentValue.split(':')
                        setInternalChainId(id)
                        setIsChainSelectOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'in--mr-2 in--h-4 in--w-4',
                          internalChainId === String(chain.id)
                            ? 'in--opacity-100'
                            : 'in--opacity-0'
                        )}
                      />
                      {chain.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onDone?.({
                  type: selectorItem.type,
                  title: internalTitle,
                  address: internalAddress,
                  chainId: Number(internalChainId),
                })
              }}
            >
              {closeLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
