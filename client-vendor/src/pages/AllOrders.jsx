import Table from "react-bootstrap/Table";
import OrderRow from "../components/OrderRow";
import { gql, useQuery } from "@apollo/client";

const getVendorOrders = gql`
  query GetOrdersVendor($accessToken: String) {
    getOrdersVendor(access_token: $accessToken) {
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
        CategoryId
        createdAt
        updatedAt
        Category {
          id
          name
        }
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
      User {
        id
        name
        email
        phoneNumber
        address
        userImgUrl
        password
      }
      rescheduleStatus
      rescheduleDate
      createdAt
      updatedAt
    }
  }
`;

function ProductsTable() {
  const { data, loading, error, refetch } = useQuery(getVendorOrders, {
    variables: { accessToken: localStorage.getItem("access_token") },
  });

  if (data) {
    return (
      <div className="containerFetch d-flex justify-content-center">
        <div className="col-11">
          <h2 className="text-center fw-bold mt-5 mb-3 headerText">Your Customer Orders</h2>
          <div className="bg-light rounded p-3 text-center shadow-lg" style={{ height: 575 }}>
            <Table striped rouhover size="md">
              <thead style={{fontSize: 14}}>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Customer Name</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Reservation Date</th>
                  <th>Reschedule Date</th>
                  <th>Reschedule Status</th>
                  <th>Payment Status</th>
                  <th>Total Payment</th>
                  <th>Down Payment</th>
                  <th>Payment Due</th>
                  <th>Notes</th>
                  <th className="">Detail</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.getOrdersVendor?.map((el, i) => {
                  return <OrderRow key={el.id} el={el} i={i} refetch={refetch}/>;
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsTable;
