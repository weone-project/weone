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