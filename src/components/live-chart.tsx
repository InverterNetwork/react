'use client'

import * as React from 'react'

import type { ISeriesApi } from 'lightweight-charts'
import type { ProcessedLiveChartItem } from '@/types'

import { CrosshairMode } from 'lightweight-charts'
import { Chart, CandlestickSeries } from 'lightweight-charts-react-wrapper'
import { useContainerSize } from '@/hooks/use-container-size'
import { NoData } from './ui/no-data'
import { cn } from '@/utils'
import { Skeleton } from './ui/skeleton'

export type LiveChartProps = {
  chartItems: React.MutableRefObject<ProcessedLiveChartItem[]>
  chartSeries: React.MutableRefObject<ISeriesApi<'Candlestick'> | null>
  theme?: 'dark' | 'light'
  color?: {
    darkBackground?: string
    lightBackground?: string
    darkText?: string
    lightText?: string
  }
  showNoData?: boolean
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>

export function LiveChart({
  chartItems,
  chartSeries,
  className,
  theme = 'light',
  color = {
    darkBackground: '#0a0a0a',
    lightBackground: '#ffffff',
    darkText: '#fafafa',
    lightText: '#0a0a0a',
  },
  showNoData = false,
  ...rest
}: LiveChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const size = useContainerSize(containerRef)

  return (
    <>
      <div
        ref={containerRef}
        className={cn('in--w-full in--flex-grow', className)}
        {...rest}
      >
        {(() => {
          if (!chartItems.current.length)
            return (
              <div className="in--w-full in--h-full in--flex-grow in--border in--border-border in--relative in--rounded-lg">
                {!!showNoData && (
                  <NoData className="in--absolute in--top-1/2 in--left-1/2 -in--translate-x-1/2 -in--translate-y-1/2 in--z-10" />
                )}
                <Skeleton className="in--w-full in--h-full" />
              </div>
            )

          return (
            <Chart
              layout={{
                background: {
                  color:
                    theme === 'dark'
                      ? color.darkBackground
                      : color.lightBackground,
                },
                textColor: theme === 'dark' ? color.darkText : color.lightText,
              }}
              width={size.width}
              height={size.height}
              crosshair={{ mode: CrosshairMode.Normal }}
              grid={{
                horzLines: { visible: false },
                vertLines: { visible: false },
              }}
              timeScale={{
                secondsVisible: true,
                timeVisible: true,
              }}
            >
              <CandlestickSeries
                ref={chartSeries}
                data={chartItems.current}
                reactive={true}
              />
            </Chart>
          )
        })()}
      </div>
    </>
  )
}
