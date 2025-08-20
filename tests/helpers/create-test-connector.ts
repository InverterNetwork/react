import type { CreateConnectorFn } from 'wagmi'

import { walletClient } from './create-test-clients'
import { account, chain } from './test-constants'

// Create a custom connector function that properly provides our wallet client
export const createTestConnector: CreateConnectorFn = () => ({
  id: 'test',
  name: 'Test Connector',
  type: 'test',
  async connect() {
    return {
      accounts: [account.address],
      chainId: chain.id,
    }
  },
  async disconnect() {},
  async getAccounts() {
    return [account.address]
  },
  async getChainId() {
    return chain.id
  },
  async getProvider() {
    return walletClient
  },
  async isAuthorized() {
    return true
  },
  onAccountsChanged() {},
  onChainChanged() {},
  onConnect() {},
  onDisconnect() {},
})
