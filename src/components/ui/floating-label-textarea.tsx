import * as React from 'react'

import { cn } from '@/utils'
import { Textarea } from '@/components/ui/textarea'
import type { TextareaProps } from '@/components/ui/textarea'
import { FloatingLabel } from './floating-label-input'

const FloatingTextarea = ({
  ref,
  className,
  ...props
}: TextareaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => {
  return (
    <Textarea
      placeholder=" "
      className={cn('in--peer', className)}
      ref={ref}
      {...props}
    />
  )
}
FloatingTextarea.displayName = 'FloatingTextarea'

type FloatingLabelTextareaProps = TextareaProps & { label?: string }

const FloatingLabelTextarea = ({
  ref,
  id,
  label,
  ...props
}: React.PropsWithoutRef<FloatingLabelTextareaProps> & {
  ref?: React.RefObject<React.ElementRef<typeof FloatingTextarea> | null>
}) => {
  return (
    <div className="in--relative">
      <FloatingTextarea ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
    </div>
  )
}
FloatingLabelTextarea.displayName = 'FloatingLabelTextarea'

export { FloatingTextarea, FloatingLabelTextarea }
