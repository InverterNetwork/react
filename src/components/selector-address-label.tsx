'use client'

import * as React from 'react'

import { Button, cn } from '@/index'
import type { SelectorStoreAddressItem } from '@/types'

import {
  compressAddress,
  dateToDisplay,
  firstLetterToUpperCase,
  getChainName,
} from '@inverter-network/sdk'

import { Menu } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/client'

import { SelectorAddressDialog } from './selector-address-dialog'

import type { OnSelectorAddressLabelSave } from './selector-address-dialog'

export type SelectorAddressLabelProps = {
  selectorItem: SelectorStoreAddressItem
  className?: string
  onSave?: OnSelectorAddressLabelSave
  onSelect?: (selectorItem: SelectorStoreAddressItem) => void
  onRemove?: (selectorItem: SelectorStoreAddressItem) => void
  HrefElement?: React.ElementType
  href?: string
  exclude?: ('open' | 'edit' | 'remove')[]
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>

export function SelectorAddressLabel({
  selectorItem,
  className,
  onSave,
  HrefElement,
  onSelect,
  exclude = [],
  href,
  onRemove,
}: SelectorAddressLabelProps) {
  const compressedAddress = compressAddress(selectorItem?.address)
  const title = selectorItem?.title ?? '...'
  const [date, time] = dateToDisplay(selectorItem.date).split(',')
  const chainId = selectorItem?.chainId ?? '...'
  const chainName = chainId === '...' ? '...' : getChainName(chainId)

  return (
    <div
      className={cn(
        'in--grid in--gap-2 in--border in--border-border in--rounded-lg in--px-5 in--py-2',
        // Mobile styles
        'in--grid-cols-2 in--grid-rows-2',
        // Desktop styles
        'sm:in--grid-cols-6 sm:in--grid-rows-1',
        className
      )}
    >
      <div className="in--col-span-1 sm:in--col-span-3 in--grid in--grid-rows-2 sm:in--col-start-1">
        <p>{title}</p>
        <p className="in--text-muted-foreground">{compressedAddress}</p>
      </div>

      <div className="in--col-span-1 in--grid in--grid-rows-2 sm:in--col-start-4">
        <p>{chainName}</p>
        <p className="in--text-muted-foreground">{chainId}</p>
      </div>

      <div className="in--col-span-1 in--row-start-2 sm:in--row-start-1 in--grid in--grid-rows-2 sm:in--col-start-5">
        <p>{date}</p>
        <p className="in--text-muted-foreground">{time}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="in--m-0 sm:in--m-auto in--col-span-1 in--row-start-2 sm:in--row-start-1 sm:in--col-start-6"
        >
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {firstLetterToUpperCase(selectorItem.type)}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {(() => {
              if (exclude.includes('open')) return null

              if (!!HrefElement)
                return (
                  <DropdownMenuItem
                    asChild
                    className="in--w-full"
                    onClick={() => onSelect?.(selectorItem)}
                  >
                    <HrefElement href={href ?? '/'}>
                      <span>Select</span>
                    </HrefElement>
                  </DropdownMenuItem>
                )

              return (
                <DropdownMenuItem
                  className="in--w-full"
                  onClick={() => onSelect?.(selectorItem)}
                >
                  <span>Select</span>
                </DropdownMenuItem>
              )
            })()}

            {!exclude.includes('edit') && (
              <SelectorAddressDialog
                title={`Edit ${firstLetterToUpperCase(selectorItem.type)}`}
                triggerLabel="Edit"
                closeLabel="Save changes"
                selectorItem={selectorItem}
                onSave={onSave}
                isDropdownItem
              ></SelectorAddressDialog>
            )}

            {!exclude.includes('remove') && (
              <DropdownMenuItem
                className="in--w-full"
                onClick={() => {
                  if (
                    window.confirm('Are you sure you want to remove this item?')
                  ) {
                    onRemove?.(selectorItem)
                  }
                }}
              >
                <span>Remove</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
