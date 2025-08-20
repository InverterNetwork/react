import type { ReactNode } from 'react'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { config } from './create-wagmi-config'
import { account, chain } from './test-constants'

// Test wrapper component with proper wallet connection
export const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: ReactNode }) =>
    React.createElement(
      WagmiProvider,
      {
        config,
        initialState: {
          chainId: chain.id,
          connections: new Map([
            [
              'test',
              {
                accounts: [account.address] as readonly [
                  `0x${string}`,
                  ...`0x${string}`[],
                ],
                chainId: chain.id,
                connector: config.connectors[0],
              },
            ],
          ]),
          current: 'test',
          status: 'connected' as const,
        },
      },
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children
      )
    )
}
