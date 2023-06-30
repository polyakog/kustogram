type labelType = {
  children: React.ReactNode
  id?: string
  text?: string
}

const FormLabel = ({ children, id, text }: labelType) => {
  return (
    <label id={id}>
      {text}
      {children}
    </label>
  )
}

export default FormLabel
