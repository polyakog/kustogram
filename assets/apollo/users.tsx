import { gql } from 'assets/apollo/__generated__/gql'

// Получение данных обо всех пользователей
export const GET_USERS = gql(`
  query Users {
    users {
      id
      login
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
