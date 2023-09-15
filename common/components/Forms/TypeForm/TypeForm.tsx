import { useFormik } from 'formik'
import { TFunction } from 'i18next'
import {
  Text,
  LabelType,
  StyledTypeForm,
  Type,
} from 'styles/styledComponents/acc_management/acc_management.styled'

type FormProps = {
  selectedAccType: string
  setIsBusiness: (state: boolean) => void
  setSelectedAccType: (type: string) => void
  t: TFunction<'translation', undefined>
}

export const TypeForm = ({ t, setSelectedAccType, setIsBusiness, selectedAccType }: FormProps) => {
  const accountType = [t('personal'), t('business')]

  const setInitialAccType = () => {
    if (selectedAccType === 'Business' || selectedAccType === 'Для бизнеса') {
      return t('business')
    }

    return t('personal')
  }

  const typeForm = useFormik({
    initialValues: {
      type: setInitialAccType(),
    },
    enableReinitialize: true,
    onSubmit: values => console.log(values),
  })

  const selectHandler = (type: string, index: number): void => {
    setSelectedAccType(type)
    if (index === 1) {
      setIsBusiness(true)
    } else {
      setIsBusiness(false)
    }
  }

  return (
    <StyledTypeForm onSubmit={typeForm.handleSubmit}>
      {accountType.map((type, index) => (
        <LabelType key={type}>
          <Type
            checked={typeForm.values.type === type}
            type="radio"
            value={type}
            onChange={typeForm.handleChange}
            onClick={() => selectHandler(type, index)}
          />
          <Text>{type}</Text>
        </LabelType>
      ))}
    </StyledTypeForm>
  )
}
