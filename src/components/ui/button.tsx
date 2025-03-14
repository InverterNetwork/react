import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { loaders } from './spinner'

const buttonVariants = cva(
  'in--animate-pop active:in--scale-95 in--inline-flex in--items-center in--justify-center in--rounded-md in--text-sm in--font-medium in--ring-offset-background in--transition-colors focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 disabled:in--pointer-events-none disabled:in--opacity-50',
  {
    variants: {
      variant: {
        default:
          'in--bg-primary in--text-primary-foreground hover:in--bg-primary-hover active:in--bg-primary-active',
        destructive:
          'in--bg-destructive in--text-destructive-foreground hover:in--bg-destructive-hover active:in--bg-destructive-active',
        outline:
          'in--border in--border-input in--bg-background hover:in--bg-secondary hover:in--text-secondary-foreground active:in--bg-secondary-active',
        secondary:
          'in--bg-secondary in--text-secondary-foreground hover:in--bg-secondary-hover active:in--bg-secondary-active',
        ghost: 'hover:in--bg-secondary hover:in--text-secondary-foreground',
        link: 'in--text-link in--underline-offset-4 hover:in--underline active:in--text-link-active',
      },
      size: {
        default: 'in--h-10 in--px-4 in--py-2',
        sm: 'in--h-9 in--rounded-md in--px-3',
        lg: 'in--h-11 in--rounded-md in--px-8',
        icon: 'in--h-10 in--w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loader?: keyof typeof loaders
}

const Button = ({
  ref,
  className,
  variant,
  size,
  asChild = false,
  loading,
  startIcon,
  endIcon,
  children,
  loader = 'PinWheel',
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const Comp = asChild ? Slot : 'button'
  const Loader = loaders[loader]

  let finalChildren = children

  if (startIcon || loading || endIcon) {
    const elements: React.ReactNode[] = []
    if (startIcon) {
      elements.push(
        <span key="start-icon" className={cn(!!children && 'in--mr-2')}>
          {startIcon}
        </span>
      )
    }
    if (loading) {
      elements.push(
        <Loader
          key="loader"
          className={cn(
            'in--h-4 in--w-4 in--animate-spin',
            !!children && 'in--mr-2'
          )}
        />
      )
    }
    if (children) {
      elements.push(<React.Fragment key="children">{children}</React.Fragment>)
    }
    if (endIcon) {
      elements.push(
        <span key="end-icon" className={cn(!!children && 'in--ml-2')}>
          {endIcon}
        </span>
      )
    }
    finalChildren = elements
  }

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {finalChildren}
    </Comp>
  )
}
Button.displayName = 'Button'

export { Button, buttonVariants }
