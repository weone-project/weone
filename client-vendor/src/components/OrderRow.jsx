import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

function OrderRow() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <tr>
      <td className="pt-3">1</td>
      <td className="pt-3">1000</td>
      <td className="pt-3">Ibnu</td>
      <td className="pt-3">Simple Venue</td>
      <td className="pt-3">1 hour</td>
      <td className="pt-3">24-02-2023</td>
      <td className="pt-3"></td>
      <td className="pt-3"></td>
      <td className="pt-3">Booked</td>
      <td className="pt-3">20.000.000</td>
      <td className="pt-3">7.000.000</td>
      <td className="pt-3">10-02-2023</td>
      <td className="pt-3">none</td>
      <td>
        <Button className="btn-dark btn-sm" onClick={() => setModalShow(true)}>
          Show
        </Button>
      </td>
      <>
        <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title className="fs-bold">Order Detail #id</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-row justify-content-between">
              <h5 className="fw-bold">Customer Information</h5>
              <Button className=" btn-primary btn-sm">Chat Customer</Button>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className="d-flex flex-column">
                <text className="fw-bold">Name</text>
                <text className="fw-bold">Phone Number</text>
                <text className="fw-bold">Address</text>
                <text className="fw-bold">Notes</text>
              </Form.Group>
              <Form.Group className="d-flex flex-column ms-2">
                <text className="">: Ibnu</text>
                <text className="">: 9176237123</text>
                <text className="">: Bekasi</text>
                <text className="">: </text>
              </Form.Group>
            </div>
            <hr />
            <h5 className="fw-bold">Product Information</h5>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row">
                <Form.Group className="d-flex flex-column">
                  <text className="fw-bold">Name</text>
                  <text className="fw-bold">Category</text>
                  <text className="fw-bold">Price</text>
                  <text className="fw-bold">Description</text>
                </Form.Group>
                <Form.Group className="d-flex flex-column ms-2">
                  <text className="">: Simple Venue</text>
                  <text className="">: Venue</text>
                  <text className="">: 20000000</text>
                  <text className="">: Sofa for groom and bride with spreaded petals</text>
                </Form.Group>
              </div>
              <div>
                <img className="imgProduct rounded-3" src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="..." />
              </div>
            </div>
            <hr />
            <h5 className="fw-bold">Order Information</h5>
            <div className="d-flex flex-row">
              <Form.Group className="d-flex flex-column">
                <text className="fw-bold">Order Date</text>
                <text className="fw-bold">Reservation Date</text>
                <text className="fw-bold">Reschedule Date</text>
                <text className="fw-bold">Reschedule Status</text>
                <text className="fw-bold">Payment Status</text>
                <text className="fw-bold">Order Quantity</text>
                <text className="fw-bold">Total Payment</text>
                <text className="fw-bold">Down Payment</text>
                <text className="fw-bold">Remaining Payment</text>
                <text className="fw-bold">Remaining Paiment Due</text>
              </Form.Group>
              <Form.Group className="d-flex flex-column ms-2">
                <text className="">: 7 February 2023</text>
                <text className="">: 28 February 2023</text>
                <text className="">: </text>
                <text className="">: </text>
                <text className="">: Booked</text>
                <text className="">: 2</text>
                <text className="">: 40000000</text>
                <text className="">: 14000000</text>
                <text className="">: 26000000</text>
                <text className="">: 21 February 2023</text>
              </Form.Group>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </tr>
  );
}

export default OrderRow;
