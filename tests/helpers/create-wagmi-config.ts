import { createConfig } from 'wagmi'

import { publicClient } from './create-test-clients'
import { createTestConnector } from './create-test-connector'
import { chain } from './test-constants'

export const config = createConfig({
  chains: [chain],
  client: () => publicClient,
  connectors: [createTestConnector],
  ssr: false,
})
