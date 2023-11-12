/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any }
}

/** Information about image */
export type ImageModel = {
  __typename?: 'ImageModel'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  postId: Scalars['String']['output']
  url: Scalars['String']['output']
  userId: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  deleteUser: Scalars['Boolean']['output']
  /** ban/unban */
  updateUserStatus: Scalars['Boolean']['output']
}

export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationUpdateUserStatusArgs = {
  banStatus: Scalars['Boolean']['input']
  userId: Scalars['String']['input']
}

/** Payments */
export type PaymentModel = {
  __typename?: 'PaymentModel'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  endDateOfSubscription?: Maybe<Scalars['DateTime']['output']>
  paymentStatus: Scalars['String']['output']
  paymentSystem: Scalars['String']['output']
  paymentsId: Scalars['String']['output']
  price: Scalars['Int']['output']
  subscriptionType: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<UserModel>
  userId: Scalars['String']['output']
}

/** Post */
export type PostModel = {
  __typename?: 'PostModel'
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  userId: Scalars['String']['output']
}

/** Profile */
export type ProfileModel = {
  __typename?: 'ProfileModel'
  city?: Maybe<Scalars['String']['output']>
  dateOfBirthday?: Maybe<Scalars['String']['output']>
  firstName?: Maybe<Scalars['String']['output']>
  lastName?: Maybe<Scalars['String']['output']>
  login: Scalars['String']['output']
  photo?: Maybe<Scalars['String']['output']>
  userId: Scalars['String']['output']
  userInfo?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  allPayments: Array<PaymentModel>
  totalCountPayments: Scalars['Int']['output']
  totalCountUsers: Scalars['Int']['output']
  user?: Maybe<UserModel>
  users: Array<UserModel>
}

export type QueryAllPaymentsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  searchName?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

export type QueryTotalCountPaymentsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  searchName?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

export type QueryTotalCountUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  searchName?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

export type QueryUserArgs = {
  id: Scalars['String']['input']
}

export type QueryUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  searchName?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

/** User */
export type UserModel = {
  __typename?: 'UserModel'
  accountType: Scalars['String']['output']
  ban: Scalars['Boolean']['output']
  createdAt: Scalars['DateTime']['output']
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  images?: Maybe<Array<ImageModel>>
  login: Scalars['String']['output']
  payments?: Maybe<Array<PaymentModel>>
  posts?: Maybe<Array<PostModel>>
  profiles?: Maybe<ProfileModel>
  reasonBan?: Maybe<Scalars['String']['output']>
}

export type UsersQueryVariables = Exact<{
  pageSize: Scalars['Int']['input']
  searchName: Scalars['String']['input']
  sortBy: Scalars['String']['input']
  sortDirection: Scalars['String']['input']
  pageNumber: Scalars['Int']['input']
}>

export type UsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'UserModel'
    id: string
    login: string
    email: string
    createdAt: any
    accountType: string
    ban: boolean
  }>
}

export type UserQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'UserModel'
    id: string
    login: string
    email: string
    createdAt: any
    images?: Array<{ __typename?: 'ImageModel'; url: string }> | null
  } | null
}

export type UserImagesQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type UserImagesQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'UserModel'
    images?: Array<{ __typename?: 'ImageModel'; url: string; id: string }> | null
  } | null
}

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type DeleteUserMutation = { __typename?: 'Mutation'; deleteUser: boolean }

export const UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Users' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'searchName' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'pageNumber' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageSize' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchName' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchName' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortBy' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortBy' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sortDirection' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sortDirection' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageNumber' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'pageNumber' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'login' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'accountType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ban' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>
export const UserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'user' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'login' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'url' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserQuery, UserQueryVariables>
export const UserImagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userImages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserImagesQuery, UserImagesQueryVariables>
export const DeleteUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'userId' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>
