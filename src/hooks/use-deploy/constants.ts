import {
  GET_HUMAN_READABLE_UINT_MAX_SUPPLY,
  UINT_MAX_SUPPLY,
} from '@inverter-network/sdk'

export const getInitialStates = <T extends boolean>(useTags: T) =>
  ({
    ERC20Issuance_v1: {
      decimals: 18,
      maxSupply: useTags
        ? GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18)
        : UINT_MAX_SUPPLY,
    },
    ERC20Issuance_Blacklist_v1: {
      decimals: 18,
      maxSupply: useTags
        ? GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18)
        : UINT_MAX_SUPPLY,
    },
    ERC20IssuanceUpgradeable_v1: {
      decimals: 18,
      maxSupply: useTags
        ? GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18)
        : UINT_MAX_SUPPLY,
    },
    ERC20IssuanceUpgradeable_Blacklist_v1: {
      decimals: 18,
      maxSupply: useTags
        ? GET_HUMAN_READABLE_UINT_MAX_SUPPLY(18)
        : UINT_MAX_SUPPLY,
    },
  }) as const
