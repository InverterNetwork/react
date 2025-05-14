'use client'

import * as React from 'react'

/**
 * @description Use the container size hook to get the size of a container
 * @param ref - The ref of the container
 * @returns The size of the container
 */
export const useContainerSize = (
  ref: React.RefObject<HTMLDivElement | null>
) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    if (ref?.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return size
}
