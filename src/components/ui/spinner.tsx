import * as React from 'react'
import { cn } from '@/utils'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import * as lucidReact from 'lucide-react'

export const loaders = {
  Loader: lucidReact.Loader,
  Loader2: lucidReact.Loader2,
  PinWheel: lucidReact.LoaderPinwheel,
  Lucide: lucidReact.LucideLoader,
  Icon: lucidReact.LoaderIcon,
}

const spinnerVariants = cva(
  'in--flex-col in--items-center in--justify-center',
  {
    variants: {
      show: {
        true: 'in--flex',
        false: 'in--hidden',
      },
    },
    defaultVariants: {
      show: true,
    },
  }
)

const loaderVariants = cva('in--animate-spin in--text-primary', {
  variants: {
    size: {
      small: 'in--size-6',
      medium: 'in--size-8',
      large: 'in--size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string
  children?: React.ReactNode
  loader?: keyof typeof loaders
}

export function Spinner({
  size,
  show,
  children,
  className,
  loader = 'PinWheel',
}: SpinnerContentProps) {
  const Loader = loaders[loader]
  return (
    <span className={spinnerVariants({ show })}>
      <Loader className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  )
}
