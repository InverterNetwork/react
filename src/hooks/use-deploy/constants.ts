import { GET_HUMAN_READABLE_UINT_MAX_SUPPLY } from '@inverter-network/sdk'

export const initialStates = {
  ERC20Issuance_v1: {
    decimals: 18,
    maxSupply: GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18),
  },
  ERC20Issuance_Blacklist_v1: {
    decimals: 18,
    maxSupply: GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18),
  },
  ERC20IssuanceUpgradeable_v1: {
    decimals: 18,
    maxSupply: GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18),
  },
  ERC20IssuanceUpgradeable_Blacklist_v1: {
    decimals: 18,
    maxSupply: GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18),
  },
} as const
