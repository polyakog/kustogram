export const codeCheckLink = () => {

  let code: string | undefined = ''

  if (typeof window !== 'undefined') {
    // code = location?.href.split("?").join('').split('=').pop()
    code = location?.href.split('=').pop()
  }

  return {code}
};



