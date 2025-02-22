'use client'

import * as React from 'react'
import type { ISeriesApi, UTCTimestamp } from 'lightweight-charts'
import type { Swap } from '@inverter-network/graphql'
import type { ProcessedLiveChartItem } from '@/types/chart'

export type UseTvChartDataParams = Pick<Swap, 'timestamp' | 'priceCOL'>[]

export type UseTvChartDataReturnType = ReturnType<typeof useTvChartData>

export function useTvChartData(swaps: UseTvChartDataParams = []) {
  const chartItems = React.useRef<ProcessedLiveChartItem[]>(
    processAndSortSwaps(swaps)
  )
  const chartSeries = React.useRef<ISeriesApi<'Candlestick'>>(null)

  React.useEffect(() => {
    const newData = processAndSortSwaps(swaps)

    // Check if this is a completely different dataset
    const isNewDataset =
      newData.length !== chartItems.current.length ||
      newData[0]?.time !== chartItems.current[0]?.time ||
      newData[newData.length - 1]?.time !==
        chartItems.current[chartItems.current.length - 1]?.time

    if (isNewDataset) {
      // Reset the entire series with new data
      chartSeries.current?.setData(newData)
      chartItems.current = newData
      return
    }

    // Handle incremental updates as before
    const diff = newData.filter(
      (newSwap) =>
        !chartItems.current.some((item) => item.time === newSwap.time)
    )
    diff.forEach((swap) => chartSeries.current?.update(swap))
    chartItems.current = newData
  }, [swaps])

  return { chartItems, chartSeries }
}

export const processSingleSwapToData = (
  swap: Pick<Swap, 'timestamp' | 'priceCOL'>
): {
  time: UTCTimestamp
  price: number
} => {
  const { timestamp: t, priceCOL } = swap
  const timestamp = Number(t) as UTCTimestamp
  const price = parseFloat(priceCOL)
  return {
    time: timestamp,
    price,
  }
}

export const processAndSortSwaps = (
  swaps: Pick<Swap, 'timestamp' | 'priceCOL'>[] = []
): ProcessedLiveChartItem[] => {
  const processedData = swaps
    .map(processSingleSwapToData)
    .sort((a, b) => a.time - b.time)

  return processedData.map((data, index, array) => {
    const prevPrice = array[index - 1]?.price ?? data.price
    const nextPrice = array[index + 1]?.price ?? data.price

    const open = prevPrice
    const close = nextPrice

    return {
      time: data.time,
      low: open,
      open,
      close,
      high: close,
    }
  })
}
