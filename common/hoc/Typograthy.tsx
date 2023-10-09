import { FC, PropsWithChildren } from 'react'

import {
  H1,
  Large,
  RegularText14,
  H2,
  H3,
  RegularText16,
  BoldText16,
  MediumText14,
  BoldText14,
  SmallText,
  SemiBoldSmallText,
  RegularLink,
  SmallLink,
} from 'styles/styledComponents/typograthy.styled'

type Props = {
  variant:
    | 'bold_text 14'
    | 'Bold_text 16'
    | 'H1'
    | 'H2'
    | 'H3'
    | 'Large'
    | 'Medium_text 14'
    | 'regular_link'
    | 'regular_text 14'
    | 'regular_text 16'
    | 'Semi-bold small_text'
    | 'small_link'
    | 'small_text'
}
const Typograthy: FC<PropsWithChildren<Props>> = ({ variant, children, ...props }) => {
  switch (variant) {
    case 'Large':
      return <Large {...props}>{children}</Large>
    case 'H1':
      return <H1 {...props}>{children}</H1>
    case 'H2':
      return <H2 {...props}>{children}</H2>
    case 'H3':
      return <H3 {...props}>{children}</H3>
    case 'regular_text 16':
      return <RegularText16 {...props}>{children}</RegularText16>
    case 'Bold_text 16':
      return <BoldText16 {...props}>{children}</BoldText16>
    case 'regular_text 14':
      return <RegularText14 {...props}>{children}</RegularText14>
    case 'Medium_text 14':
      return <MediumText14 {...props}>{children}</MediumText14>
    case 'bold_text 14':
      return <BoldText14 {...props}>{children}</BoldText14>
    case 'small_text':
      return <SmallText {...props}>{children}</SmallText>
    case 'Semi-bold small_text':
      return <SemiBoldSmallText {...props}>{children}</SemiBoldSmallText>
    case 'regular_link':
      return <RegularLink {...props}>{children}</RegularLink>
    case 'small_link':
      return <SmallLink {...props}>{children}</SmallLink>
    default:
      return <RegularText14 {...props}>{children}</RegularText14>
  }
}

export default Typograthy
