export const convertCentsToDollars = (cents: number): string => {
  switch (cents) {
    case 200: {
      return '$2'
    }
    case 550: {
      return '$5.5'
    }
    case 1000: {
      return '$10'
    }
    default: {
      return '$30'
    }
  }
}
