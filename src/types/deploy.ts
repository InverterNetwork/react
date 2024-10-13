export type UseDeployOnSuccess = ({
  contractAddress,
  transactionHash,
}: {
  contractAddress: `0x${string}` | null | undefined
  transactionHash: `0x${string}`
}) => void
