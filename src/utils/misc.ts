/**
 *
 * @param seconds Time to wait in seconds
 * @returns Promise that resolves after the specified time
 */
export const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

/**
 * @param date Optional date to convert to unix time
 * @returns Compact Unix time ( devided by 1000 ) in seconds
 * */
export const dateToUnixTime = (date?: Date) =>
  Math.floor((date ?? new Date()).getTime() / 1000)

export const getTimeDiff = (dateInput?: Date | string) => {
  if (!dateInput) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const itemDate =
    typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  const now = new Date()
  const diffInSeconds = (now.getTime() - itemDate.getTime()) / 1000
  const seconds = diffInSeconds % 60
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const minutes = diffInMinutes % 60
  const diffInHours = Math.floor(diffInMinutes / 60)
  const hours = diffInHours % 24
  const days = Math.floor(diffInHours / 24)

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}
