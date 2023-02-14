import { Card, Form, Spinner } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductCards from "../components/ProductCard";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const getVendorProducts = gql`
  query GetProducts($accessToken: String) {
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
`;

function ProductsCard() {
  const { data, loading, error, refetch } = useQuery(getVendorProducts, {
    variables: { accessToken: localStorage.getItem("access_token") },
  });


  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center bg-success vh-100">
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }
  
  useEffect(() => {
    if (data) {
      refetch()
    }
  }, [data]);

  if (data) {
  return (
    <div className="containerFetch d-flex justify-content-around cardProduct">
      <div className="col-7">
        <h2 className="text-center mt-5 mb-4 fw-bold headerText">Your Products</h2>
        <div className="d-flex justify-content-between mb-2">
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" aria-label="Search" className="shadow-lg" />
            <button className="btn btn-outline-dark fs-3 py-0 ms-2 shadow-lg" type="submit">
              <BiSearchAlt />
            </button>
          </Form>
          <Link to="/addProduct" className="btn btn-outline-dark fw-bold shadow-lg">
            Add New Product
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <Card.Body className="rounded-3 blur scroll">
            {data.getProducts?.map((el) => {
              return <ProductCards key={el.id} el={el} refetch={refetch}/>;
            })}
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
}

export default ProductsCard;
