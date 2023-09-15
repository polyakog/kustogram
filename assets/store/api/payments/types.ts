export type StripeResponse = {
  url: string
}

export type PaypalResponse = StripeResponse

export type CommonType = {
  productId: string
  quantity: number
}

export type PaypalRequest = CommonType[]
export type StripeRequest = CommonType[]

export type AllSubscriptionsResponse = {
  idProduct: string
  nameSubscription: string
  price: number
}

export type CurrentSubscription = {
  expireAt: string
  userId: string
}

export type AllPaymentsResponse = {
  items: ItemsType[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type ItemsType = {
  dateOfPayments: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionType: string
}
