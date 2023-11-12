import { useState } from 'react'

import { dateParser } from 'common/utils/dateParser'
import { TablePropsType } from 'features/admin/types'
import block from 'public/img/icons/block_outline.svg'
import {
  Cell,
  HeadingText,
  Table,
  TableHeading,
  TableRow,
} from 'styles/styledComponents/payments/payments.styled'

import {
  BlockAdmin,
  EmptyBlockAdmin,
  HeadingWithSortAdmin,
  MenuCellAdmin,
  SortAdmin,
  TextAdmin,
} from '../../../features/admin/Admin.styled'
import { ArrowsAdmin } from '../../../features/admin/UserTable/ArrowsAdmin'
import { MenuUserTable } from '../../../features/admin/UserTable/MenuUserTable'

const UsersTable = ({ users, selectedSort }: TablePropsType) => {
  const tableHeadingData = ['User ID', 'Username', 'Profile Link', 'Date Added', '']
  const [sortDirection, setSortDirection] = useState<boolean | undefined>()
  const [sortName, setSortName] = useState<string>()

  const handleClick = (name: string) => {
    selectedSort(name)
    setSortName(name)
    setSortDirection(sortDirection === undefined ? true : !sortDirection)
  }

  return (
    <Table style={{ maxWidth: '1024px', width: '100%' }}>
      <TableHeading>
        {tableHeadingData.map((name, index) => {
          return index % 2 ? (
            <HeadingWithSortAdmin key={name} onClick={() => handleClick(name)}>
              <p>{name}</p>
              <SortAdmin>
                <ArrowsAdmin sortDirection={sortName === name ? sortDirection : undefined} />
              </SortAdmin>
            </HeadingWithSortAdmin>
          ) : (
            <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
              {name}
            </HeadingText>
          )
        })}
      </TableHeading>
      {users?.users.map(user => (
        <TableRow key={user.id} style={{ padding: '0px' }}>
          <Cell style={{ paddingLeft: '24px' }} title={user.id}>
            {user.ban ? <BlockAdmin alt="blocked" src={block} /> : <EmptyBlockAdmin />}
            <TextAdmin>{`${user.id.slice(0, 12)}...`}</TextAdmin>
          </Cell>
          <Cell>{user.login}</Cell>
          <Cell>{user.login}</Cell>
          <Cell>{dateParser(user.createdAt)}</Cell>
          <MenuCellAdmin>
            <MenuUserTable ban={user.ban} id={user.id} userName={user.login} />
          </MenuCellAdmin>
        </TableRow>
      ))}
    </Table>
  )
}

export default UsersTable
