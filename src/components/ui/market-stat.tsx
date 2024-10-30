import * as React from 'react'

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { Card, CardContent } from './card'
import { cn, toCompactNumber } from '@/utils'

export interface MarketStatProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  value?: string | number
  change?: number
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
  size?: 'sm' | 'md' | 'lg'
}

const MarketStat = React.forwardRef<HTMLDivElement, MarketStatProps>(
  (
    {
      title,
      value,
      change,
      icon,
      className,
      prefix,
      suffix,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'p-2 min-h-[80px]',
      md: 'p-4 min-h-[100px]',
      lg: 'p-6 min-h-[120px]',
    }

    const titleClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    const valueClasses = {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-3xl',
    }

    const iconClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    return (
      <Card
        ref={ref}
        className={cn(
          'in--bg-background in--border in--border-border',
          className
        )}
        {...props}
      >
        <CardContent className={cn('in--overflow-hidden', sizeClasses[size])}>
          <div className="in--flex in--justify-between in--items-center in--mb-2">
            <span
              className={cn(
                'in--font-medium in--text-muted-foreground in--truncate',
                titleClasses[size]
              )}
            >
              {title}
            </span>
            {icon && (
              <span
                className={cn('in--text-muted-foreground', iconClasses[size])}
              >
                {icon}
              </span>
            )}
          </div>
          <div
            className={cn(
              'in--font-bold in--truncate in--mb-2',
              valueClasses[size]
            )}
          >
            {prefix && (
              <span className="in--text-muted-foreground in--mr-1">
                {prefix}
              </span>
            )}
            {typeof value === 'number'
              ? value.toLocaleString()
              : toCompactNumber(value)}
            {suffix && (
              <span className="in--text-muted-foreground in--ml-1">
                {suffix}
              </span>
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
)

MarketStat.displayName = 'MarketStat'

export { MarketStat }
