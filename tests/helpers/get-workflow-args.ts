import type { GetDeployWorkflowArgs } from '@inverter-network/sdk'
import { parseUnits } from 'viem'

import { createSafeArgs } from '../../src/utils'
import { deployer, requestedModules, testAddresses } from './test-constants'

export const getWorkflowArgs = <TUseTags extends boolean>(
  issuanceTokenAddress: `0x${string}`,
  useTags: TUseTags
) => {
  const baseArgs = {
    authorizer: {
      initialAdmin: deployer,
    },
    fundingManager: {
      bondingCurveParams: {
        buyFee: useTags ? '0' : 0n,
        sellFee: useTags ? '0' : 0n,
        formula: testAddresses.bancorFormula,
        reserveRatioForBuying: 333_333,
        reserveRatioForSelling: 333_333,
        buyIsOpen: true,
        sellIsOpen: true,
        initialIssuanceSupply: useTags ? '200002' : parseUnits('200002', 18),
        initialCollateralSupply: useTags ? '296' : parseUnits('296', 18),
      },
      issuanceToken: issuanceTokenAddress,
      collateralToken: testAddresses.erc20Mock,
    },
    orchestrator: {
      independentUpdates: false as const,
      independentUpdateAdmin:
        '0x0000000000000000000000000000000000000000' as const,
    },
  }

  return createSafeArgs(baseArgs) as GetDeployWorkflowArgs<
    typeof requestedModules,
    TUseTags
  >
}
