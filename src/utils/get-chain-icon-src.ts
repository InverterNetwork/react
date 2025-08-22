let chainLogoFunction: ((id: string, light?: boolean) => string | null) | null =
  null

if (process.env.NODE_ENV !== 'test') {
  import('@api3/logos')
    .then((module) => {
      chainLogoFunction = module.ChainLogo
    })
    .catch(() => {
      // Handle import failure gracefully
      chainLogoFunction = null
    })
}

// Chain ID to icon mapping for common chains
const ETH_SRC = 'https://etherscan.io/images/svg/brands/ethereum-original.svg'

// Environment-aware ChainLogo usage
const getChainLogoSafely = (chainId: string): string | null => {
  // In test environment, avoid using ChainLogo to prevent SVG parsing issues
  if (!chainLogoFunction) {
    return null
  }

  // In development/production, try to use ChainLogo
  try {
    const result = chainLogoFunction(chainId)

    // Handle different return types from ChainLogo
    if (typeof result === 'object' && result && 'src' in result) {
      return (result as any).src
    }

    if (typeof result === 'string') {
      if (result.trim().startsWith('<svg')) {
        // Convert SVG to data URI
        try {
          return `data:image/svg+xml;base64,${Buffer.from(result).toString('base64')}`
        } catch {
          return null
        }
      }
      return result
    }

    return null
  } catch {
    return null
  }
}

export const getChainIconSrc = (chainId?: number): string => {
  if (!chainId) {
    // Try ChainLogo first, then fallback
    const chainLogoResult = getChainLogoSafely('1')
    return chainLogoResult || ETH_SRC
  }

  const chainIdStr = chainId.toString()

  // Try ChainLogo first
  const chainLogoResult = getChainLogoSafely(chainIdStr)
  if (chainLogoResult) {
    return chainLogoResult
  }

  // Fallback to predefined icons
  return ETH_SRC
}
