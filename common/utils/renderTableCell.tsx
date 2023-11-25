import {
  AvatarTableUniversal,
  BlockNameTableUniversal,
  TableUniversalCell,
} from '../components/Table/UniversalTable/UniversalTable.styled'
import { dateParser } from './dateParser'
import { EmptyBlockAdmin, MenuCellAdmin, TextAdmin } from '../../features/admin/Admin.styled'
import { MenuUserTable } from '../../features/admin/UserTable/MenuUserTable'
import block from '../../public/img/icons/block_outline.svg'
import avatar from '../../public/img/icons/avatar.svg'
import {
  FormatDataTableType,
  FormatDataTableTypeWithoutBoolean,
  TableHeaderType,
} from '../components/Table/UniversalTable/types'

export const renderTableCell = (item: FormatDataTableType | undefined, name: TableHeaderType) => {
  if (item) {
    if (name.back === '') {
      return (
        <TableUniversalCell>
          <BlockNameTableUniversal>
            {name.avatar === 'ban' ? (
              <>
                {'ban' in item && item.ban && (
                  <AvatarTableUniversal alt="picture" height={24} src={block} width={24} />
                )}

                {'ban' in item && !item.ban && <EmptyBlockAdmin />}
              </>
            ) : (
              <>
                {'photo' in item && item.photo && (
                  <AvatarTableUniversal alt="picture" height={24} src={item.photo} width={24} />
                )}

                {'photo' in item && !item.photo && (
                  <AvatarTableUniversal alt="picture" height={24} src={avatar} width={24} />
                )}
              </>
            )}
            <TextAdmin>{name.text ? item[name.text as keyof FormatDataTableType] : ''}</TextAdmin>
          </BlockNameTableUniversal>
        </TableUniversalCell>
      )
    }
    if (name.tableTitle !== '') {
      return (
        <TableUniversalCell>
          {/* eslint-disable-next-line no-constant-condition */}
          {name.tableTitle === 'Date Added' ||
          'Date of Payment' ||
          'End date of subscription' ||
          'Subscription Date'
            ? dateParser(item[`${name.back}` as keyof FormatDataTableTypeWithoutBoolean])
            : item[`${name.back}` as keyof FormatDataTableType]}
        </TableUniversalCell>
      )
    }

    return (
      <MenuCellAdmin>
        {item.id && item.login && (
          <MenuUserTable ban={item.ban || false} id={item.id} userName={item.login} />
        )}
      </MenuCellAdmin>
    )
  }

  return null
}
