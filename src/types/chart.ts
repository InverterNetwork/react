import type { UTCTimestamp } from 'lightweight-charts'

export type ProcessedLiveChartItem = {
  time: UTCTimestamp
  open: number
  close: number
  high: number
  low: number
}
