import { gql } from "@apollo/client"

export const GET_ORDERS = gql`
query Query($accessToken: String) {
  getOrdersUser(access_token: $accessToken) {
    id
    UserId
    ProductId
    VendorId
    reservationDate
    paymentStatus
    fullPayment
    downPayment
    quantity
    notes
    rescheduleStatus
    rescheduleDate
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
    }
    Vendor {
      id
      name
      email
      password
      phoneNumber
      address
      vendorImgUrl
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
  }
}
`