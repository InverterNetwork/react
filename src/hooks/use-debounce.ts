'use client'

import * as React from 'react'

// see https://github.com/tannerlinsley/react-query/issues/293
// see https://usehooks.com/useDebounce/
export function useDebounce<T>({
  value,
  delay,
  enabled = true,
}: UseDebounceProps<T>): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  const stringifiedValue = JSON.stringify(value)

  React.useEffect(
    () => {
      // If returnWithoutDelay is true, update debounced value immediately
      if (!enabled) {
        setDebouncedValue(value)
        return
      }

      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [stringifiedValue, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

export type UseDebounceProps<T> = {
  value: T
  delay: number
  enabled?: boolean
}

export type UseDebounceReturnType<T> = T
