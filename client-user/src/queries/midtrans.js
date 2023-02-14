
import { gql } from "@apollo/client"

export const GET_MIDTRANS = gql`
    mutation Mutation($form: OrderForMidtrans, $status: String, $accessToken: String) {
  midtransToken(form: $form, status: $status, access_token: $accessToken) {
    redirect_url
    token
  }
}
`