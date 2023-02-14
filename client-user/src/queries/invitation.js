import { gql } from "@apollo/client"

export const GET_INV_BY_ID = gql`
query GetInvitationById($getInvitationByIdId: ID) {
  getInvitationById(id: $getInvitationByIdId) {
    id
    quote
    quote_src
    bride
    bride_img
    bride_nick
    bride_mother
    bride_father
    groom
    groom_img
    groom_nick
    groom_mother
    groom_father
    matrimony_name
    matrimony_date
    matrimony_time_start
    matrimony_time_end
    ceremonial_name
    ceremonial_date
    ceremonial_time_start
    ceremonial_time_end
    map_location
    address_ceremonial
    address_matrimony
    photo
    story
    story_img
    wallet_bank
    wallet_no
    wallet_owner
    Music {
      id
      band
      song
      song_src
    }
    Order {
      id
      ProductId
      VendorId
      reservationDate
      rescheduleDate
      rescheduleStatus
      paymentStatus
      fullPayment
      downPayment
      quantity
      User {
        id
        name
        email
        phoneNumber
        address
        userImgUrl
      }
    }
    Greets {
      id
      guest
      presence
      greeting
      date
      InvitationId
    }
  }
}
`

export const POST_INVITATION = gql`
mutation CreateInvitation($accessToken: String, $form: CreateInvitationForm) {
  createInvitation(access_token: $accessToken, form: $form) {
    message
  }
}
`;

export const GET_ALL_INV = gql`
query GetInvitationById($accessToken: String) {
  getInvitations(access_token: $accessToken) {
    id
    quote
    quote_src
    bride
    bride_img
    bride_nick
    bride_mother
    bride_father
    groom
    groom_img
    groom_nick
    groom_mother
    groom_father
    matrimony_name
    matrimony_date
    matrimony_time_start
    matrimony_time_end
    ceremonial_name
    ceremonial_date
    ceremonial_time_start
    ceremonial_time_end
    map_location
    address_ceremonial
    address_matrimony
    photo
    story
    story_img
    wallet_bank
    wallet_no
    wallet_owner
    Music {
      id
      band
      song
      song_src
    }
    Order {
      id
      ProductId
      VendorId
      reservationDate
      rescheduleDate
      rescheduleStatus
      paymentStatus
      fullPayment
      downPayment
      quantity
      User {
        id
        name
        email
        phoneNumber
        address
        userImgUrl
      }
    }
    Greets {
      id
      guest
      presence
      greeting
      date
      InvitationId
    }
  }
}
`;

export const GET_ALL_ = gql`
query GetAllMusics {
  getAllMusics {
    id
    band
    song
    song_src
  }
}
`