import * as React from 'react'

import { cn } from '@/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
  ref,
  className,
  type,
  ...props
}: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <input
      type={type}
      className={cn(
        'in--flex in--h-10 in--w-full in--rounded-md in--border in--border-input in--bg-background hover:in--border-input-hover in--px-3 in--py-2 in--text-sm in--ring-offset-background file:in--border-0 file:in--bg-transparent file:in--text-sm file:in--font-medium file:in--text-foreground placeholder:in--text-muted-foreground focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 disabled:in--cursor-not-allowed disabled:in--opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
}
Input.displayName = 'Input'

export { Input }
