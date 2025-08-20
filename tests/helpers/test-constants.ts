import type { RequestedModules } from '@inverter-network/sdk'
import { getChainById } from '@inverter-network/sdk'
import { privateKeyToAccount } from 'viem/accounts'

// Test constants from environment variables with fallbacks
export const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY as `0x${string}`
export const TEST_ERC20_MOCK_ADDRESS = process.env
  .TEST_ERC20_MOCK_ADDRESS as `0x${string}`
export const TEST_BANCOR_FORMULA_ADDRESS = process.env
  .TEST_BANCOR_FORMULA_ADDRESS as `0x${string}`

// Test setup
export const chain = getChainById(31_337)
export const account = privateKeyToAccount(TEST_PRIVATE_KEY)
export const deployer = account.address

export const requestedModules = {
  authorizer: 'AUT_Roles_v1',
  fundingManager: 'FM_BC_Bancor_Redeeming_VirtualSupply_v1',
  paymentProcessor: 'PP_Simple_v1',
} as const satisfies RequestedModules

export const testAddresses = {
  bancorFormula: TEST_BANCOR_FORMULA_ADDRESS,
  erc20Mock: TEST_ERC20_MOCK_ADDRESS,
}
