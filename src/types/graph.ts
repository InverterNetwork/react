import type { GraphQLQueryResult } from '@inverter-network/sdk'

export type Swap = NonNullable<
  GraphQLQueryResult<{
    Swap: {
      __args: {
        order_by: [{ blockTimestamp: 'desc' }]
        limit: 1
      }
      __scalar: 1
    }
  }>['Swap']
>[0]
