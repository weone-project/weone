
import { gql } from "@apollo/client"


export const CREATE_TESTIMONI = gql`
    mutation Mutation($form: TestimonyForm, $accessToken: String) {
        createTestimony(form: $form, access_token: $accessToken) {
            message
        }
    }
`

export const GET_TESTIMONI = gql`
query Query($productId: ID) {
  getTestimonies(productId: $productId) {
    id
    UserId
    ProductId
    testimony
    Product {
      id
      name
      description
      imgUrl
      price
      estimatedDay
      rating
      dpPrice
      status
      VendorId
      CategoryId
      createdAt
      updatedAt
      Category {
        id
        name
      }
      Vendor {
        id
        name
        email
        password
        phoneNumber
        city
        province
        address
        vendorImgUrl
      }
    }
    User {
      id
      name
      email
      phoneNumber
      address
      userImgUrl
      password
    }
    rating
  }
}
`