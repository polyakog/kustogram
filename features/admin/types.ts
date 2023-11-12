import { UsersQuery } from '../../assets/apollo/__generated__/graphql'

export type MenuPropsType = {
  id: string
}

export type ArrowsPropsType = {
  sortDirection: boolean | undefined
}

export type TablePropsType = {
  selectedSort: (sortType: string) => void
  users: UsersQuery | undefined
}
