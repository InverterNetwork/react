import * as React from 'react'
import { Copy as CopyIcon } from 'lucide-react'
import { Button } from './button'
import type { ButtonProps } from './button'

export function Copy({
  data,
  color = 'primary',
  variant = 'outline',
  size = 'sm',
  onClick,
  ...rest
}: { data: any } & ButtonProps) {
  return (
    <Button
      {...{ ...rest, color, variant, size }}
      type="button"
      onClick={(e) => {
        navigator.clipboard.writeText(data)
        onClick?.(e)
      }}
    >
      <CopyIcon />
    </Button>
  )
}
