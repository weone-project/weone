import { useEffect, useState } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { isNonNullObject } from "@apollo/client/utilities";

const updateReschedule = gql`
  mutation Mutation($accessToken: String, $form: reschedule, $orderId: ID) {
    updateReschedule(access_token: $accessToken, form: $form, orderId: $orderId) {
      message
    }
  }
`;

function OrderRow({ el, i, refetch }) {
  // console.log(el)
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

  function renderReschedDate(status) {
    if (status !== "requesting" && !status !== !null) {
      return (
        <>
          <small className="fw-bold">Reschedule Date</small>
          <small className="fw-bold">Reschedule Status</small>
        </>
      );
    }
  }
  function renderResched(status) {
    if (status !== "requesting" && !status !== !null) {
      return (
        <>
          <small className="">: {new Date (el.rescheduleDate).toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})}</small>
          <small className="">: {status}</small>
        </>
      );
    }
  }
  const formatEstimatedDate = (reservationDate, estimatedDay) => {
    const date = new Date(reservationDate);
    const substractedDay = date.getDate() - estimatedDay
    const date2 = new Date(date.setDate(substractedDay))
    return date2.toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})
  };

  return (
    <tr>
      <td className="pt-3">{i + 1}</td>
      <td className="pt-3">{el.id}</td>
      <td className="pt-3">{el.User.name}</td>
      <td className="pt-3">{el.Product.name}</td>
      <td className="pt-3">{el.quantity}</td>
      <td className="pt-3">{new Date (el.reservationDate).toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})}</td>
      {el.rescheduleDate?<td className="pt-3">{new Date (el.rescheduleDate).toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})}</td>: <td className="pt-3"></td>}
      {el.rescheduleStatus === "requesting" && <td className="pt-3"><Badge className="bg-danger text-white fw-bold" style={{fontSize: 12}}>{el.rescheduleStatus}</Badge></td>}
      {el.rescheduleStatus === "approved" && <td className="pt-3"><Badge className="bg-success text-white fw-bold" style={{fontSize: 12}}>{el.rescheduleStatus}</Badge></td>}
      {el.rescheduleStatus === "not approved" && <td className="pt-3"><Badge className="bg-warning text-white fw-bold" style={{fontSize: 12}}>{el.rescheduleStatus}</Badge></td>}
      {el.rescheduleStatus === null && <td>{el.rescheduleStatus}</td>}
      <td className="pt-3">{el.paymentStatus}</td>
      <td className="pt-3">{el.fullPayment.toLocaleString()}</td>
      <td className="pt-3">{el.downPayment?.toLocaleString()}</td>
      <td className="pt-3"> {formatEstimatedDate(el.reservationDate, el.Product.estimatedDay)}</td>
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
                <img className="imgProduct rounded-3" src={el.Product.imgUrl[0]} alt="..." />
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
                {renderReschedDate(el.rescheduleStatus)}
              </Form.Group>
              <Form.Group className="d-flex flex-column ms-2">
                <small className="">: {new Date (el.createdAt).toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})}</small>
                <small className="">: {new Date (el.reservationDate).toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})}</small>
                <small className="">: {el.paymentStatus}</small>
                <small className="">: {el.quantity}</small>
                <small className="">: {el.fullPayment.toLocaleString()}</small>
                <small className="">: {el.downPayment?.toLocaleString()}</small>
                <small className="">: {(el.fullPayment - el.downPayment).toLocaleString()}</small>
                <small className="">: {formatEstimatedDate(el.reservationDate, el.Product.estimatedDay)}</small>
                {renderResched(el.rescheduleStatus)}
              </Form.Group>
            </div>
          </Modal.Body>
          {el.rescheduleStatus === "requesting" && (
            <small className="mb-2 d-flex justify-content-center">
              Your customer requesting for rescheduleing date to<span>&nbsp;</span>
              <span className="fw-bold">{el.rescheduleDate?.toLocaleString().slice(0, 10)}</span>, will you approve it?
            </small>
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
