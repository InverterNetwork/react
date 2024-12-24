'use client'

import * as React from 'react'
import { data } from '@inverter-network/abis'
import { getPrettyModuleName } from '@inverter-network/sdk'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/client'
import { Button, cn } from '@/index'
import { Check, ChevronsUpDown } from 'lucide-react'

export const AbiSelector = ({
  setName,
  name,
  className,
}: {
  setName: (name: any) => void
  name: string
  className?: string
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn('in--justify-between', className)}
        >
          {getPrettyModuleName(name) || 'Select a module...'}
          <ChevronsUpDown className="in--ml-2 in--h-4 in--w-4 in--shrink-0 in--opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="in--w-[200px] in--p-0">
        <Command>
          <CommandInput placeholder="Search module..." />
          <CommandList>
            <CommandEmpty>No module found.</CommandEmpty>
            <CommandGroup>
              {data.map((module) => (
                <CommandItem
                  key={module.name}
                  value={module.name}
                  onSelect={(value) => {
                    setName(value)
                    setIsOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'in--mr-2 in--h-4 in--w-4',
                      name === module.name ? 'in--opacity-100' : 'in--opacity-0'
                    )}
                  />
                  {getPrettyModuleName(module.name)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
