'use client'

import * as React from 'react'
import type { ISeriesApi, UTCTimestamp } from 'lightweight-charts'
import type { ProcessedLiveChartItem } from '@/types'
import type {
  CurveHourData,
  CurveDayData,
  IssuanceTokenDayData,
  IssuanceTokenHourData,
} from '@inverter-network/graphql'

export type UseLiveChartDataParams = Array<
  CurveHourData | CurveDayData | IssuanceTokenDayData | IssuanceTokenHourData
>

export type UseLiveChartDataReturnType = ReturnType<typeof useLiveChartData>

export type UseLiveChartDataOptions = {
  enforce?: 'USD' | 'COL'
}

export function useLiveChartData(
  data: UseLiveChartDataParams,
  options: UseLiveChartDataOptions = {}
) {
  const chartItems = React.useRef<ProcessedLiveChartItem[]>(
    processAndSortSwaps(data, options)
  )
  const chartSeries = React.useRef<ISeriesApi<'Candlestick'>>(null)

  React.useEffect(() => {
    const newData = processAndSortSwaps(data, options)

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
  }, [data, options])

  return { chartItems, chartSeries }
}

export const processSingleSwapToData = (
  data: UseLiveChartDataParams[number],
  options: UseLiveChartDataOptions = {}
): ProcessedLiveChartItem => {
  let open = 0
  let high = 0
  let low = 0
  let close = 0
  let time = 0 as UTCTimestamp

  if ('date' in data) {
    time = Number(data.date) as UTCTimestamp
  }

  if ('periodStartUnix' in data) {
    time = Number(data.periodStartUnix) as UTCTimestamp
  }

  if ('priceCOL' in data && options.enforce !== 'USD') {
    open = parseFloat(data.openCOL)
    high = parseFloat(data.highCOL)
    low = parseFloat(data.lowCOL)
    close = parseFloat(data.closeCOL)
  }

  if (data.priceUSD > 0 && options.enforce !== 'COL') {
    open = parseFloat(data.openUSD)
    high = parseFloat(data.highUSD)
    low = parseFloat(data.lowUSD)
    close = parseFloat(data.closeUSD)
  }

  return { time, open, high, low, close }
}

export const processAndSortSwaps = (
  data: UseLiveChartDataParams,
  options: UseLiveChartDataOptions = {}
): ProcessedLiveChartItem[] => {
  return data
    .map((data) => processSingleSwapToData(data, options))
    .sort((a, b) => a.time - b.time)
}
