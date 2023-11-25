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

// Получение данных о количестве пользователей
export const GET_TOTAL_COUNT = gql(`
  query Total($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
    totalCountUsers(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) 
  }
`)

// Получение данных об одном пользователе
export const GET_USER_PROFILE = gql(`
  query user($id: String!) {
    user(id: $id) {
      id
      createdAt
      profiles {
        login
        firstName
        lastName
        photo
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

export const UPDATE_USER_STATUS = gql(`
  mutation updateUserStatus($userId: String!,$banStatus: Boolean!){
    updateUserStatus(userId:$userId,banStatus:$banStatus)
  }
`)

// EDIT......
export const GET_ALL_PAYMENTS = gql(`
  query Payments($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
    allPayments(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) {
      paymentsId
      userId
      price
      paymentSystem
      paymentStatus
      createdAt
      subscriptionType
      updatedAt
      endDateOfSubscription
      user {
      profiles {
      login
      photo}
      }
    }
  }
`)

// Получение данных о количестве пользователей
export const GET_TOTAL_COUNT_PAYMENTS = gql(`
  query TotalCountPayments($pageSize:Int!,$searchName:String!,$sortBy:String!,$sortDirection:String!,$pageNumber:Int!) {
    totalCountPayments(pageSize:$pageSize,searchName:$searchName,sortBy:$sortBy,sortDirection:$sortDirection,pageNumber:$pageNumber) 
  }
`)

// Получение всех оплат пользователя
export const GET_USER_PAYMENTS = gql(`
  query userPayments($id: String!) {
    user(id: $id) {
      payments {
        dateOfPayments: createdAt
        endDateOfSubscription
        price
        paymentType: paymentSystem
        subscriptionType
      }
    }
  }
`)
