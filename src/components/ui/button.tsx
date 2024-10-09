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
          'in--bg-primary in--text-primary-foreground hover:in--bg-primary/90',
        destructive:
          'in--bg-destructive in--text-destructive-foreground hover:in--bg-destructive/90',
        outline:
          'in--border in--border-input in--bg-background hover:in--bg-accent hover:in--text-accent-foreground',
        secondary:
          'in--bg-secondary in--text-secondary-foreground hover:in--bg-secondary/80',
        ghost: 'hover:in--bg-accent hover:in--text-accent-foreground',
        link: 'in--text-primary in--underline-offset-4 hover:in--underline',
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const Loader = loaders[loader]

    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <>
            {React.Children.map(
              children as React.ReactElement,
              (child: React.ReactElement) => {
                return React.cloneElement(child, {
                  className: cn(buttonVariants({ variant, size }), className),
                  children: (
                    <>
                      {startIcon && (
                        <span className={cn(!!children && 'in--mr-2')}>
                          {startIcon}
                        </span>
                      )}
                      {loading && (
                        <Loader
                          className={cn(
                            'in--h-4 in--w-4 in--animate-spin',
                            !!children && 'in--mr-2'
                          )}
                        />
                      )}
                      {child.props.children}
                      {endIcon && (
                        <span className={cn(!!children && 'in--ml-2')}>
                          {endIcon}
                        </span>
                      )}
                    </>
                  ),
                })
              }
            )}
          </>
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        <>
          {startIcon && (
            <span className={cn(!!children && 'in--mr-2')}>{startIcon}</span>
          )}
          {loading && (
            <Loader
              className={cn(
                'in--h-4 in--w-4 in--animate-spin',
                !!children && 'in--mr-2'
              )}
            />
          )}
          {children}
          {endIcon && (
            <span className={cn(!!children && 'in--ml-2')}>{endIcon}</span>
          )}
        </>
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
