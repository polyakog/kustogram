import Image from 'next/image'
import styled from 'styled-components'

/// //  Элемент, отображающий изображение с наложенным фильтром   /// //

const FilterElement = ({
  photoUrl,
  filterTitle,
  filter,
  handleFilter,
}: {
  filter: string
  filterTitle: string
  handleFilter: (filterTitle: string) => void
  photoUrl: string
}) => {
  const handleFilterChose = () => {
    handleFilter(filter)
  }

  return (
    <StyledModalBody onClick={handleFilterChose}>
      <Image
        alt="nolmal"
        height={108}
        src={photoUrl}
        style={{ objectFit: 'contain', filter }}
        width={108}
      />
      <StyledFilterTitle>{filterTitle}</StyledFilterTitle>
    </StyledModalBody>
  )
}

export default FilterElement

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: auto;
`

const StyledFilterTitle = styled.div`
  width: 100%;
  max-width: 160px;
  text-align: center;
`
