import { gql } from "@apollo/client"

export const GET_USERS = gql`
query Query {
  getUsers {
    id
    name
    email
    phoneNumber
    address
    userImgUrl
  }
}
`

export const LOGIN_USER = gql `
mutation Mutation($form: LoginFormUser) {
  loginUser(form: $form) {
    id
    name
    email
    access_token
  }
}
`

export const REGISTER_USER = gql`
  mutation RegisterUser($form: RegisterFormUser) {
  registerUser(form: $form) {
    id
    name
    email
    phoneNumber
    address
    userImgUrl
    password
  }
}
`

export const GET_USER_BY_ID = gql`
query Query($getUserByIdId: ID, $accessToken: String) {
  getUserById(id: $getUserByIdId, access_token: $accessToken) {
    id
    name
    email
    phoneNumber
    address
    userImgUrl
  }
}
`