import { gql } from "@apollo/client"

export const GET_PRODUCT_ACTIVE = gql`



query GetProductActive {
  getProductActive {
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
}

`

export const GET_PRODUCTS = gql`
query Query($accessToken: String) {
  getProducts(access_token: $accessToken) {
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
}
`

export const GET_PRODUCT_BY_ID = gql`
query Query($getProductByIdId: ID) {
  getProductById(id: $getProductByIdId) {
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
}

`