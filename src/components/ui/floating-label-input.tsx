import * as React from 'react'

import { cn } from '@/utils'
import { Input } from '@/components/ui/input'
import type { InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn('in--peer', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

const FloatingLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        'peer-focus:in--secondary peer-focus:dark:in--secondary in--absolute in--start-2 in--top-2 in--z-10 in--origin-[0] in---translate-y-4 in--scale-75 in--transform in--bg-background in--px-2 in--text-sm in--text-gray-500 in--duration-300 peer-placeholder-shown:in--top-1/2 peer-placeholder-shown:in---translate-y-1/2 peer-placeholder-shown:in--scale-100 peer-focus:in--top-2 peer-focus:in---translate-y-4 peer-focus:in--scale-75 peer-focus:in--px-2 dark:in--bg-background rtl:peer-focus:in--left-auto rtl:peer-focus:in--translate-x-1/4',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
FloatingLabel.displayName = 'FloatingLabel'

type FloatingLabelInputProps = InputProps & { label?: string }

const FloatingLabelInput = React.forwardRef<
  React.ComponentRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {
  return (
    <div className="in--relative">
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  )
})
FloatingLabelInput.displayName = 'FloatingLabelInput'

export { FloatingInput, FloatingLabel, FloatingLabelInput }
