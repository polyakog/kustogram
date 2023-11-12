import { gql } from 'assets/apollo/__generated__/gql'

// Получение данных обо всех пользователей

export const GET_USERS = gql(`
  query Users($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
    users(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) {
      id
      login
      email
      createdAt
      accountType
      ban
    }
  }
`)

// Получение данных об одном пользователе
export const GET_USER = gql(`
  query user($id: String!) {
    user(id: $id) {
      id
      login
      email
      createdAt
      images {
        url
      }
    }
  }
`)

// Получение всех изображений, загруженных одним пользователем
export const GET_USER_IMAGES = gql(`
  query userImages($id: String!) {
    user(id: $id) {
      images {
        url
        id
      }
    }
  }
`)

export const DELETE_USER = gql(`
  mutation deleteUser($userId: String!) {
    deleteUser (userId: $userId)
  }
`)
