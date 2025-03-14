import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { Card, CardContent } from './card'
import { cn } from '@/utils'
import { toCompactNumber } from '@inverter-network/sdk'

const marketStatVariants = cva('in--overflow-hidden', {
  variants: {
    size: {
      sm: 'in--p-2 in--min-h-[80px]',
      md: 'in--p-4 in--min-h-[100px]',
      lg: 'in--p-6 in--min-h-[120px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const titleVariants = cva(
  'in--font-medium in--text-muted-foreground in--truncate',
  {
    variants: {
      size: {
        sm: 'in--text-xs',
        md: 'in--text-sm',
        lg: 'in--text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const valueVariants = cva('in--font-bold in--truncate in--mb-2', {
  variants: {
    size: {
      sm: 'in--text-lg',
      md: 'in--text-2xl',
      lg: 'in--text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const iconVariants = cva('in--text-muted-foreground', {
  variants: {
    size: {
      sm: 'in--h-4 in--w-4',
      md: 'in--h-5 in--w-5',
      lg: 'in--h-6 in--w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface MarketStatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marketStatVariants> {
  title?: string
  value?: string | number
  change?: number
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
}

const MarketStat = ({
  ref,
  title,
  value,
  change,
  icon,
  className,
  prefix,
  suffix,
  size,
  ...props
}: MarketStatProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Card
      // @ts-ignore
      ref={ref}
      className={cn(
        'in--bg-background in--border in--border-border',
        className
      )}
      {...props}
    >
      <CardContent className={marketStatVariants({ size })}>
        <div className="in--flex in--justify-between in--items-center in--mb-2">
          <span className={titleVariants({ size })}>{title}</span>
          {icon && <span className={iconVariants({ size })}>{icon}</span>}
        </div>
        <div className={valueVariants({ size })}>
          {prefix && (
            <span className="in--text-muted-foreground in--mr-1">{prefix}</span>
          )}
          {typeof value === 'number'
            ? value.toLocaleString()
            : toCompactNumber(value)}
          {suffix && (
            <span className="in--text-muted-foreground in--ml-1">{suffix}</span>
          )}
        </div>
        {change !== undefined && (
          <div className="in--flex in--items-center in--text-xs">
            <span
              className={cn(
                'in--flex in--items-center in--rounded-full in--px-1.5 in--py-0.5',
                change >= 0
                  ? 'in--bg-green-500/20 in--text-green-500'
                  : 'in--bg-red-500/20 in--text-red-500'
              )}
            >
              {change >= 0 ? (
                <ArrowUpIcon className="in--h-3 in--w-3 in--mr-0.5" />
              ) : (
                <ArrowDownIcon className="in--h-3 in--w-3 in--mr-0.5" />
              )}
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

MarketStat.displayName = 'MarketStat'

export { MarketStat }
