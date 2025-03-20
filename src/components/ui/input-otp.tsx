'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { Dot } from 'lucide-react'

import { cn } from '@/utils'

const InputOTP = ({
  ref,
  className,
  containerClassName,
  ...props
}: React.ComponentPropsWithoutRef<typeof OTPInput> & {
  ref?: React.RefObject<React.ElementRef<typeof OTPInput> | null>
}) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'in--flex in--items-center in--gap-2 has-[:disabled]:in--opacity-50',
      containerClassName
    )}
    className={cn('disabled:in--cursor-not-allowed', className)}
    {...props}
  />
)
InputOTP.displayName = 'InputOTP'

const InputOTPGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  ref?: React.RefObject<React.ElementRef<'div'> | null>
}) => (
  <div
    ref={ref}
    className={cn('in--flex in--items-center', className)}
    {...props}
  />
)
InputOTPGroup.displayName = 'InputOTPGroup'

const InputOTPSlot = ({
  ref,
  index,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { index: number } & {
  ref?: React.RefObject<React.ElementRef<'div'> | null>
}) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        'in--relative in--flex in--h-10 in--w-10 in--items-center in--justify-center in--border-y in--border-r in--border-input in--text-sm in--transition-all first:in--rounded-l-md first:in--border-l last:in--rounded-r-md',
        isActive &&
          'in--z-10 in--ring-2 in--ring-ring in--ring-offset-background',
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="in--pointer-events-none in--absolute in--inset-0 in--flex in--items-center in--justify-center">
          {/* in--animate-caret-blink - is not found TODO: add it */}
          <div className="in--h-4 in--w-px in--bg-foreground in--duration-1000" />
        </div>
      )}
    </div>
  )
}
InputOTPSlot.displayName = 'InputOTPSlot'

const InputOTPSeparator = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  ref?: React.RefObject<React.ElementRef<'div'> | null>
}) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
)
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
