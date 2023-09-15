export const dateParser = (str: string): string => {
  const date = new Date(str)

  return date.toLocaleString().split(',')[0]
}
