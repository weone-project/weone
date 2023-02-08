import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const updateReschedule = gql`
  mutation Mutation($accessToken: String, $form: reschedule, $orderId: ID) {
    updateReschedule(access_token: $accessToken, form: $form, orderId: $orderId) {
      message
    }
  }
`;

function OrderRow({ el, i, refetch }) {
  const [modalShow, setModalShow] = useState(false);
  const [updateRescheduleStatus, { data: dataRescheduleStatus }] = useMutation(updateReschedule);

  const handleClickApproval = (status, id) => {
    updateRescheduleStatus({
      variables: {
        accessToken: localStorage.getItem("access_token"),
        form: {
          rescheduleStatus: status,
        },
        orderId: id,
      },
    });
  };

  useEffect(() => {
    if (dataRescheduleStatus) {
      refetch();
    }
  }, [dataRescheduleStatus]);

  return (
    <tr>
      <td className="pt-3">{i + 1}</td>
      <td className="pt-3">{el.id}</td>
      <td className="pt-3">{el.User.name}</td>
      <td className="pt-3">{el.Product.name}</td>
      <td className="pt-3">{el.quantity}</td>
      <td className="pt-3">{el.reservationDate.toLocaleString().slice(0, 10)}</td>
      <td className="pt-3">{el.rescheduleDate?.toLocaleString().slice(0, 10)}</td>
      <td className="pt-3">{el.rescheduleStatus}</td>
      <td className="pt-3">{el.paymentStatus}</td>
      <td className="pt-3">{el.fullPayment.toLocaleString()}</td>
      <td className="pt-3">{el.downPayment.toLocaleString()}</td>
      <td className="pt-3"> pending</td>
      {el.notes ? <td className="pt-3">yes</td> : <td className="pt-3">no</td>}
      <td>
        <Button className="btn-dark btn-sm" onClick={() => setModalShow(true)}>
          Show
        </Button>
      </td>
      <>
        <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title className="fs-bold">Detail Order ID #{el.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-row justify-content-between">
              <h5 className="fw-bold">Customer Information</h5>
              <Link to="/messege" className="btn btn-primary btn-sm">
                Chat Customer
              </Link>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className="d-flex flex-column">
                <small className="fw-bold">Name</small>
                <small className="fw-bold">Phone Number</small>
                <small className="fw-bold">Address</small>
                <small className="fw-bold">Notes</small>
              </Form.Group>
              <Form.Group className="d-flex flex-column ms-2">
                <small className="">: {el.User.name}</small>
                <small className="">: {el.User.phoneNumber}</small>
                <small className="">: {el.User.address}</small>
                <small className="">: {el.notes}</small>
              </Form.Group>
            </div>
            <hr />
            <h5 className="fw-bold">Product Information</h5>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row">
                <Form.Group className="d-flex flex-column">
                  <small className="fw-bold">Name</small>
                  <small className="fw-bold">Category</small>
                  <small className="fw-bold">Price</small>
                  <small className="fw-bold">Description</small>
                </Form.Group>
                <Form.Group className="d-flex flex-column ms-2">
                  <small className="">: {el.Product.name}</small>
                  <small className="">: {el.Product.Category.name}</small>
                  <small className="">: {el.Product.price}</small>
                  <small className="">: {el.Product.description}</small>
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
                <small className="fw-bold">Order Date</small>
                <small className="fw-bold">Reservation Date</small>
                <small className="fw-bold">Payment Status</small>
                <small className="fw-bold">Order Quantity</small>
                <small className="fw-bold">Total Payment</small>
                <small className="fw-bold">Down Payment</small>
                <small className="fw-bold">Remaining Payment</small>
                <small className="fw-bold">Remaining Payment Due</small>
                {el.rescheduleStatus !== "requesting" && (<small className="fw-bold">Reschedule Date</small>)}
                {el.rescheduleStatus !== "requesting" && (<small className="fw-bold">Reschedule Status</small>)}
              </Form.Group>
              <Form.Group className="d-flex flex-column ms-2">
                <small className="">: {el.createdAt.toLocaleString()}</small>
                <small className="">: {el.reservationDate.toLocaleString().slice(0, 10)}</small>
                <small className="">: {el.paymentStatus}</small>
                <small className="">: {el.quantity}</small>
                <small className="">: {el.fullPayment.toLocaleString()}</small>
                <small className="">: {el.downPayment.toLocaleString()}</small>
                <small className="">: {(el.fullPayment - el.downPayment).toLocaleString()}</small>
                <small className="">: pending</small>
                {el.rescheduleStatus !== "requesting" && (<small className="">: {el.rescheduleDate?.toLocaleString().slice(0, 10)}</small>)}
                {el.rescheduleStatus !== "requesting" && (<small className="">: {el.rescheduleStatus}</small>)}
              </Form.Group>
            </div>
          </Modal.Body>
                {el.rescheduleStatus === "requesting" && (
                  <small className="mb-2 d-flex justify-content-center">Your customer requesting for rescheduleing date to<span>&nbsp;</span><span className="fw-bold">{el.rescheduleDate?.toLocaleString().slice(0, 10)}</span>, will you approve it?</small>
                )}
              <div className="d-flex justify-content-center mb-3">
                {el.rescheduleStatus === "requesting" && (
                  <Button className="btn-success btn-sm ms-3" onClick={() => handleClickApproval("approved", el.id)}>
                    Approved
                  </Button>
                )}
                {el.rescheduleStatus === "requesting" && (
                  <Button className="btn-danger btn-sm ms-3" onClick={() => handleClickApproval("not approved", el.id)}>
                    Not approved
                  </Button>
                )}
              </div>
        </Modal>
      </>
    </tr>
  );
}

export default OrderRow;
