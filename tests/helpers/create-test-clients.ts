import { createPublicClient, createWalletClient, http } from 'viem'
import { account, chain } from './test-constants'

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})

export const walletClient = createWalletClient({
  account,
  chain,
  transport: http(),
})
