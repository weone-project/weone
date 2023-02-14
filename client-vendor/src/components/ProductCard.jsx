import { useState, useEffect } from "react";
import { Card, Button, Form, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const updateProductStatus = gql`
  mutation UpdateVendorProduct($form: UpdateVendorProductForm, $productId: ID, $accessToken: String) {
    updateVendorProduct(form: $form, productId: $productId, access_token: $accessToken) {
      message
    }
  }
`;

function ProductCards({ el, refetch }) {
  const [modalShow, setModalShow] = useState(false);
  const [updateProductVendor, { data: dataUpdateProduct }] = useMutation(updateProductStatus);

  const handleInputChange = (event) => {
    const { value } = event.target;
    updateProductVendor({
      variables: {
        form: {
          status: value,
        },
        productId: el.id,
        accessToken: localStorage.getItem("access_token"),
      },
    });
  };

  useEffect (() => {
    if (dataUpdateProduct) {
      refetch()
    }
  }, [dataUpdateProduct])
  return (
    <Card.Body className="d-flex flex-row rounded-3 bg-light mb-3 shadow">
      <Card.Body className="col-3">
        <Card.Img src={el.imgUrl[0]} alt="..." className="imgProduct rounded-4 p-2" />
      </Card.Body>
      <Card.Body className="col-9 p-3">
        <Card.Body>
          <h5 className="mb-3 d-flex flex-start ms-3 fw-bold">{el.name}</h5>
        </Card.Body>
        <Card.Body className="d-flex flex-row">
          <Card.Body className="col-9 d-flex flex-row ms-3" style={{ height: 135 }}>
            <Form.Group className="d-flex flex-column">
              <small className="fw-bold">Category</small>
              <small className="fw-bold">Price</small>
              <small className="fw-bold">Rating</small>
              <small className="fw-bold">Created date</small>
            </Form.Group>
            <Form.Group className="d-flex flex-column ms-2">
              <small className="fw-bold">:</small>
              <small className="fw-bold">:</small>
              <small className="fw-bold">:</small>
              <small className="fw-bold">:</small>
            </Form.Group>
            <Form.Group className="d-flex flex-column ms-2">
              <small className="">{el.Category.name}</small>
              <small className="">Rp {el.price.toLocaleString()}</small>
              {el.rating === null ? <small className="">not rated</small> : <small className="">{el.rating} / 5</small>}
              <small className="">{el.createdAt.toLocaleString().slice(0, 10)}</small>
            </Form.Group>
          </Card.Body>
          <Card.Body className="col-3 d-flex justify-content-between flex-column">
            <h6 className="d-flex justify-content-center fw-bold">Status</h6>
            <select name="status" className="form-control text-center form-control-sm" onChange={handleInputChange} defaultValue={el.status}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <Button className="col-12 btn-secondary btn-sm" onClick={() => setModalShow(true)}>
              Detail
            </Button>
          </Card.Body>
        </Card.Body>
      </Card.Body>

      {/* Modals */}
      <>
        <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title className="fs-bold">Product Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <Carousel className="col-10 bg-secondary" style={{ borderRadius: "1rem" }} fade>
                  {el.imgUrl.map((image, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <img className="imgCarousel" src={image} alt="First slide" />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-between">
                <h5 className="fw-bold">Product Information</h5>
                <Link to={`/editProducts/${el.id}`} className="btn btn-primary btn-sm">
                  Edit Product
                </Link>
              </div>
              <div className="d-flex flex-row">
                <Form.Group className="d-flex flex-column">
                  <small className="fw-bold">Vendor Name</small>
                  <small className="fw-bold">Product Name</small>
                  <small className="fw-bold">Rating</small>
                  <small className="fw-bold">Category</small>
                  <small className="fw-bold">Price</small>
                  {el.dpPrice !== 0 && <small className="fw-bold">Down Payment</small>}
                  {el.dpPrice !== 0 && <small className="fw-bold">Payment Due</small>}
                  <small className="fw-bold">Description</small>
                </Form.Group>
                <Form.Group className="d-flex flex-column ms-2">
                  <small className="fw-bold">:</small>
                  <small className="fw-bold">:</small>
                  <small className="fw-bold">:</small>
                  <small className="fw-bold">:</small>
                  {el.dpPrice !== 0 && <small className="fw-bold">:</small>}
                  {el.dpPrice !== 0 && <small className="fw-bold">:</small>}
                  <small className="fw-bold">:</small>
                  <small className="fw-bold">:</small>
                </Form.Group>
                <Form.Group className="d-flex flex-column ms-2">
                  <small className="">{el.Vendor.name}</small>
                  <small className="">{el.name}</small>
                  {el.rating === null ? <small className="">not rated</small> : <small className="">{el.rating} / 5</small>}
                  <small className="">{el.Category.name}</small>
                  <small className="">Rp {el.price.toLocaleString()}</small>
                  {el.dpPrice !== 0 && <small className="">Rp {el.dpPrice.toLocaleString()}</small>}
                  {el.dpPrice !== 0 && <small className="">{el.estimatedDay} days before reservation date</small>}
                  <small className="" style={{ width: 600 }}>
                    {el.description}
                  </small>
                </Form.Group>
              </div>
              {/* <hr />
              <div className="d-flex flex-row justify-content-between">
                <h5 className="fw-bold">Reviews</h5>
                <small>Product Rating 4.5 / 5</small>
              </div> */}
              {/* looping card testi di sini */}
            </div>
          </Modal.Body>
        </Modal>
      </>
    </Card.Body>
  );
}

export default ProductCards;
