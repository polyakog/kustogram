export const getSubscriptionType = (price: number, language: string): string => {
  switch (price) {
    case 200: {
      return language === 'en' ? '1 Day' : '1 День'
    }
    case 550: {
      return language === 'en' ? '3 Days' : '3 Дня'
    }
    case 1000: {
      return language === 'en' ? '7 Days' : '7 Дней'
    }
    default: {
      return language === 'en' ? '1 Month' : '1 Месяц'
    }
  }
}
