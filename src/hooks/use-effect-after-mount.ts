'use client'

import * as React from 'react'

export const useEffectAfterMount = (
  cb: React.EffectCallback,
  dependencies: React.DependencyList | undefined
) => {
  const mounted = React.useRef(true)

  React.useEffect(() => {
    if (!mounted.current) {
      return cb()
    }
    mounted.current = false
  }, dependencies)
}
