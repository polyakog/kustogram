export type TableHeaderType = {
  avatar?: string
  back: string
  sort: boolean
  tableTitle: string
  text?: string
}

export type FormatDataTablePropsType = {
  formatTableData: FormatDataTableType[] | undefined
  selectedSort: (sortType: string) => void
  tableHeadingData: TableHeaderType[]
}

export type FormatDataTableType = {
  __typename?: 'UserModel' | undefined
  accountType?: string
  ban?: boolean
  createdAt?: string | null | undefined
  email?: string
  endDateOfSubscription?: string | null | undefined
  id?: string
  login?: string
  paymentStatus?: string
  paymentSystem?: string
  paymentsId?: string
  photo?: string
  price?: number
  subscriptionType?: string
  updatedAt?: string | null | undefined
}

export type FormatDataTableTypeWithoutBoolean = Omit<FormatDataTableType, 'ban'>
