import { ChainLogo } from '@api3/logos'

export const getChainIconSrc = (chainId?: number): string => {
  const fallback = (ChainLogo('1') as any)?.src || ChainLogo('1')

  if (!chainId) return fallback

  const available =
    (ChainLogo(chainId.toString()) as any)?.src || ChainLogo(chainId.toString())

  if (available) return available

  return fallback
}
