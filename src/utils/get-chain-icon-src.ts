// Chain ID to icon mapping for common chains
const CHAIN_ICONS: Record<string, string> = {
  '1': 'https://etherscan.io/images/svg/brands/ethereum-original.svg',
  '5': 'https://etherscan.io/images/svg/brands/ethereum-original.svg',
  '11155111': 'https://etherscan.io/images/svg/brands/ethereum-original.svg',
  '137': 'https://etherscan.io/images/svg/brands/polygon.svg',
  '80001': 'https://etherscan.io/images/svg/brands/polygon.svg',
  '56': 'https://etherscan.io/images/svg/brands/bnb.svg',
  '97': 'https://etherscan.io/images/svg/brands/bnb.svg',
  '43114': 'https://etherscan.io/images/svg/brands/avalanche.svg',
  '43113': 'https://etherscan.io/images/svg/brands/avalanche.svg',
  '42161': 'https://etherscan.io/images/svg/brands/arbitrum.svg',
  '42170': 'https://etherscan.io/images/svg/brands/arbitrum.svg',
  '10': 'https://etherscan.io/images/svg/brands/optimism.svg',
  '420': 'https://etherscan.io/images/svg/brands/optimism.svg',
  '8453': 'https://etherscan.io/images/svg/brands/base.svg',
  '84532': 'https://etherscan.io/images/svg/brands/base.svg',
}

// Environment-aware ChainLogo usage
const getChainLogoSafely = (chainId: string): string | null => {
  // In test environment, avoid using ChainLogo to prevent SVG parsing issues
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
    return null
  }

  // In development/production, try to use ChainLogo
  try {
    const { ChainLogo } = require('@api3/logos')
    const result = ChainLogo(chainId)

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
    return chainLogoResult || CHAIN_ICONS['1']
  }

  const chainIdStr = chainId.toString()

  // Try ChainLogo first
  const chainLogoResult = getChainLogoSafely(chainIdStr)
  if (chainLogoResult) {
    return chainLogoResult
  }

  // Fallback to predefined icons
  return CHAIN_ICONS[chainIdStr] || CHAIN_ICONS['1']
}
