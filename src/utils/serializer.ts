/**
 * Utility functions for serializing and deserializing data in React Query
 * This helps handle BigInt values and other non-JSON-serializable types in query keys
 */

/**
 * Converts BigInt values to strings for serialization
 * This is essential for React Query query keys which must be JSON serializable
 * @param value - The value to serialize
 * @returns The serialized value with BigInt converted to strings
 */
export function serializeBigInt<T>(value: T): T {
  if (typeof value === 'bigint') {
    return value.toString() as T
  }

  if (Array.isArray(value)) {
    return value.map(serializeBigInt) as T
  }

  if (value !== null && typeof value === 'object') {
    const result = {} as T
    for (const [key, val] of Object.entries(value)) {
      ;(result as any)[key] = serializeBigInt(val)
    }
    return result
  }

  return value
}

/**
 * Converts string values back to BigInt where appropriate
 * This is useful when deserializing data that was previously serialized
 * @param value - The value to deserialize
 * @param bigIntFields - Array of field names that should be converted to BigInt
 * @returns The deserialized value with strings converted back to BigInt
 */
export function deserializeBigInt<T>(value: T, bigIntFields: string[] = []): T {
  if (Array.isArray(value)) {
    return value.map((v) => deserializeBigInt(v, bigIntFields)) as T
  }

  if (value !== null && typeof value === 'object') {
    const result = {} as T
    for (const [key, val] of Object.entries(value)) {
      if (bigIntFields.includes(key) && typeof val === 'string') {
        ;(result as any)[key] = BigInt(val)
      } else {
        ;(result as any)[key] = deserializeBigInt(val, bigIntFields)
      }
    }
    return result
  }

  return value
}

/**
 * Formats units to a string representation (similar to viem's parseUnits but returns string)
 * @param value - The value to format
 * @param decimals - Number of decimals
 * @returns String representation of the value with decimals
 */
export function formatUnitsToString(value: string, decimals: number): string {
  const factor = Math.pow(10, decimals)
  const numericValue = parseFloat(value)
  return (numericValue * factor).toString()
}

/**
 * Creates a serializable query key for React Query
 * This ensures that complex objects with BigInt values can be used as query keys
 * @param key - The base query key
 * @param data - Additional data to include in the key
 * @returns A serializable query key array
 */
export function createSerializableQueryKey(
  key: string,
  data?: Record<string, any>
): readonly unknown[] {
  if (!data) {
    return [key] as const
  }

  return [key, serializeBigInt(data)] as const
}

/**
 * Serializes any arguments object to ensure compatibility with React Query
 * This handles BigInt values and other non-serializable types
 * @param args - Any arguments object that needs serialization
 * @returns Serialized arguments object
 */
export function serializeArgs<T>(args: T): T {
  return serializeBigInt(args)
}

/**
 * Creates a safe arguments object by serializing all values
 * Useful for ensuring arguments are safe to use in React Query keys and mutations
 * @param args - The arguments object to make safe
 * @returns A serialized version of the arguments
 */
export function createSafeArgs<T extends Record<string, any>>(args: T): T {
  return serializeArgs(args)
}

/**
 * Utility to handle conversion between tagged and untagged values
 * @param value - The base value
 * @param useTags - Whether to use string tags or keep original type
 * @param converter - Optional converter function for non-tagged values
 * @returns The value in the appropriate format
 */
export function handleTaggedValue<T, U = T>(
  value: T,
  useTags: boolean,
  converter?: (val: T) => U
): T | U | string {
  if (useTags) {
    // For tagged values, convert to string if it's a BigInt
    if (typeof value === 'bigint') {
      return value.toString()
    }
    return value
  }

  // For untagged values, use converter if provided, otherwise return as-is
  return converter ? converter(value) : value
}
