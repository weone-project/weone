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
    createdAt
    updatedAt
  }
}
`

export const UPDATE_ORDER = gql`
mutation UpdateOrderUser($orderId: ID, $accessToken: String, $form: editOrderUser) {
  updateOrderUser(orderId: $orderId, access_token: $accessToken, form: $form) {
    message
  }
}
`

export const UPDATE_ORDER_RESCHEDULE = gql`
mutation Mutation($orderId: ID, $accessToken: String, $form: reschedule) {
  updateReschedule(orderId: $orderId, access_token: $accessToken, form: $form) {
    message
  }
}
`