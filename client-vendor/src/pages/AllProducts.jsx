import { useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProductCards from "../components/ProductCard";

function ProductsCard() {
  const fetchProducts = async () => {
    try {
      //fetch di sini
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="containerFetch d-flex justify-content-around cardProduct">
      <div className="col-6">
        <h2 className="text-center mt-5 mb-4 fw-bold headerText">Your Products</h2>
        <div className="d-flex justify-content-between mb-2">
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" aria-label="Search" className="shadow-lg" />
            <button className="btn btn-outline-dark fs-3 py-0 ms-2 shadow-lg" type="submit">
              <BiSearchAlt />
            </button>
          </Form>
          <Link to="/addProduct" className="btn btn-outline-dark fw-bold align-text-bottom shadow-lg">Add New Product</Link>
        </div>
        <div className="d-flex justify-content-center">
            <Card.Body className="rounded-3 blur scroll">
          {/* {products.map((el) => {
        return ( */}
          {/* <Card key={el.id} style={{ width: "18rem" }} className="mb-4 mx-4 blur"> */}
        <ProductCards />
          </Card.Body>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
