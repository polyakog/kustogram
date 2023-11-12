/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query Users($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {\n    users(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) {\n      id\n      login\n      email\n      createdAt\n      accountType\n      ban\n    }\n  }\n':
    types.UsersDocument,
  '\n  query user($id: String!) {\n    user(id: $id) {\n      id\n      login\n      email\n      createdAt\n      images {\n        url\n      }\n    }\n  }\n':
    types.UserDocument,
  '\n  query userImages($id: String!) {\n    user(id: $id) {\n      images {\n        url\n        id\n      }\n    }\n  }\n':
    types.UserImagesDocument,
  '\n  mutation deleteUser($userId: String!) {\n    deleteUser (userId: $userId)\n  }\n':
    types.DeleteUserDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Users($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {\n    users(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) {\n      id\n      login\n      email\n      createdAt\n      accountType\n      ban\n    }\n  }\n'
): (typeof documents)['\n  query Users($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {\n    users(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) {\n      id\n      login\n      email\n      createdAt\n      accountType\n      ban\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query user($id: String!) {\n    user(id: $id) {\n      id\n      login\n      email\n      createdAt\n      images {\n        url\n      }\n    }\n  }\n'
): (typeof documents)['\n  query user($id: String!) {\n    user(id: $id) {\n      id\n      login\n      email\n      createdAt\n      images {\n        url\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query userImages($id: String!) {\n    user(id: $id) {\n      images {\n        url\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query userImages($id: String!) {\n    user(id: $id) {\n      images {\n        url\n        id\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteUser($userId: String!) {\n    deleteUser (userId: $userId)\n  }\n'
): (typeof documents)['\n  mutation deleteUser($userId: String!) {\n    deleteUser (userId: $userId)\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
