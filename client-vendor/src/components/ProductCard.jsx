import { useState } from "react";
import { Card, Button, Form, Badge, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCards() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Card.Body className="p-3 d-flex flex-row rounded-3 bg-light m-3 shadow">
      <Card.Body className="col-3">
        <Card.Img src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="..." className="imgProduct rounded-3" />
      </Card.Body>
      <Card.Body className="col-9">
        <Card.Body>
          <h5 className="mb-2 d-flex flex-start ms-3 fw-bold">
            Simple Venue
            <Badge bg="dark" className="ms-3">
              Venue
            </Badge>
          </h5>
        </Card.Body>
        <Card.Body className="d-flex flex-row">
          <Card.Body className="col-9 d-flex flex-column justify-content-end ms-3" style={{ height: 135 }}>
            <p className="card-text">Price: Rp 20.000.000</p>
            <p className="card-text">
              <small>Created : 5 February 2022</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Rating : 4.5 / 5</small>
            </p>
          </Card.Body>
          <Card.Body className="col-3 d-flex justify-content-between flex-column">
            <h6 className="pb-2 d-flex justify-content-center fw-bold">Status</h6>
            <Form.Select name="status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
            <Button className="col-12 mt-3 btn-secondary" onClick={() => setModalShow(true)}>
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
                  <Carousel.Item>
                    <img className="imgCarousel" src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="First slide" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="imgCarousel" src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Second slide" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="imgCarousel" src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Third slide" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="imgCarousel" src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Third slide" />
                  </Carousel.Item>
                </Carousel>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-between">
                <h5 className="fw-bold">Product Information</h5>
                <Link to="/editProducts/:productId" className="btn btn-primary btn-sm">Edit Product</Link>
              </div>
              <div className="d-flex flex-row">
                <Form.Group className="d-flex flex-column">
                  <text className="fw-bold">Vendor Name</text>
                  <text className="fw-bold">Name</text>
                  <text className="fw-bold">Category</text>
                  <text className="fw-bold">Price</text>
                  <text className="fw-bold">Description</text>
                </Form.Group>
                <Form.Group className="d-flex flex-column ms-2">
                  <text className="">: Jaya Venue</text>
                  <text className="">: Simple Venue</text>
                  <text className="">: Venue</text>
                  <text className="">: 20000000</text>
                  <text className="">: Sofa for groom and bride with spreaded petals</text>
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
