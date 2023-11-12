import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://kustogram.site/api/v1/graphql',
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,

      email: process.env.NEXT_PUBLIC_AUTH_ADMIN_LOGIN,
      password: process.env.NEXT_PUBLIC_AUTH_ADMIN_PASSWORD,
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default client
