type labelType = {
  children: React.ReactNode
  id?: string
}

const FormikLabel = ({ children, id }: labelType) => {
  return <label id={id}>{children}</label>
}

export default FormikLabel