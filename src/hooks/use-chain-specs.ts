'use client'

import * as React from 'react'
import { getChainIconSrc } from '@/utils'
import { useAccount, useChains } from 'wagmi'

export type UseChainSpecsReturnType = ReturnType<typeof useChainSpecs>

/**
 * @description Use the chain specs hook to get the chain specs
 * @returns The chain specs
 */
export const useChainSpecs = () => {
  const { address, isConnected, chain } = useAccount() // Wagmi's useAccount for wallet address and connection status
  const chains = useChains() // Wagmi's useNetwork for network details

  // The currently connected chainId and corresponding EVM network
  const chainId = chain?.id
  const evmNetwork = chains.find(({ id }) => id === chainId)

  // Icon URL for the current chain
  const iconSrc = getChainIconSrc(chainId)

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
