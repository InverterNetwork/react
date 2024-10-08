'use client'

import * as React from 'react'
import { useAccount, useChains } from 'wagmi'

export const getIconSrc = (chainId?: number) => {
  const fallback = 'https://chainlist.org/unknown-logo.png'

  if (!chainId) return fallback

  const available = {
    1: 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg',
    137: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    80_002: 'https://icons.llamao.fi/icons/chains/rsz_polygon.jpg',
    10: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
    250: 'https://icons.llamao.fi/icons/chains/rsz_fantom.jpg',
    43114: 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg',
    8453: 'https://icons.llamao.fi/icons/chains/rsz_base.jpg',
    59144: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
    100: 'https://icons.llamao.fi/icons/chains/rsz_xdai.jpg',
    42220: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
    11155420: 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg',
  } as Record<number, string>

  if (available[chainId]) return available[chainId]

  return fallback
}

export type UseChainSpecsReturnType = ReturnType<typeof useChainSpecs>

export const useChainSpecs = () => {
  const { address, isConnected, chain } = useAccount() // Wagmi's useAccount for wallet address and connection status
  const chains = useChains() // Wagmi's useNetwork for network details

  // The currently connected chainId and corresponding EVM network
  const chainId = chain?.id
  const evmNetwork = chains.find(({ id }) => id === chainId)

  // Icon URL for the current chain
  const iconSrc = getIconSrc(chainId)

  // Determine if the chain is unsupported
  const isUnsupportedChain = !!isConnected && !evmNetwork

  // Show wallet widget based on chain status
  const showWalletWidget = !isConnected || isUnsupportedChain

  // Ref to store the previous chainId
  const prevChainId = React.useRef(chainId)
  const didChainIdChange =
    chainId !== undefined &&
    prevChainId.current !== undefined &&
    prevChainId.current !== chainId

  // Block explorer URL for the current chain
  const explorerUrl = evmNetwork?.blockExplorers?.[0]?.url

  // Update the previous chainId when the chainId changes
  React.useEffect(() => {
    if (didChainIdChange) prevChainId.current = chainId
  }, [chainId])

  return {
    chainId,
    isConnected,
    address: address as `0x${string}` | undefined,
    networkConfigurations: chains, // List of available networks
    iconSrc,
    didChainIdChange,
    showWalletWidget,
    isUnsupportedChain,
    explorerUrl,
    prevChainId: prevChainId.current,
  }
}
