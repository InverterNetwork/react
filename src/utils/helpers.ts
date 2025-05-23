import type { MixedRequestedModules } from '@inverter-network/sdk'

/**
 * @description Get the string representation of the requested modules
 * @param requestedModules - The requested modules
 * @returns The string representation of the requested modules
 */
export const getRequestedModulesString = (
  requestedModules: MixedRequestedModules
) => {
  const result: string[] = []

  Object.keys(requestedModules).map((key) => {
    const value = requestedModules[key as keyof MixedRequestedModules]
    if (typeof value === 'string') {
      result.push(value)
    } else if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'object') {
          result.push(v.name)
        } else {
          result.push(v)
        }
      })
    } else if (typeof value === 'object') {
      result.push(value.name)
    }
  })

  return result.join(',')
}
