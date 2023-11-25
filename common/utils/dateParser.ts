export const dateParser = (str: number | string | 'UserModel' | null | undefined): string => {
  if (str === null || str === undefined) {
    return '-'
  }

  if (typeof str === 'number') {
    return str.toString()
  }

  if (str.includes(':')) {
    return new Date(str).toLocaleString().split(',')[0]
  }

  return str.toString()
}
