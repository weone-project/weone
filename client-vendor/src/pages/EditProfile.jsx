import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const navigate = useNavigate();
  const input = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    province: "",
    address: "",
    vendorImgUrl: "",
  };

  const [values, setValues] = useState(input);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // masukan post di sini
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerForm d-flex justify-content-center">
      <div className="col-6 text-center">
        <h1 className="mt-1 mb-3 fw-bold headerText">Join us and help others to get their dream wedding</h1>
        <Card.Body className="border border-light rounded-3 blur p-3">
          <div className="text-center text-light">
            <h3> Please fill in your data bellow</h3>
            <hr />
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-row text-light">
              <Form.Group className="mb-3 d-flex flex-column gap-3">
                <Form.Label className="fw-bold mt-1">Name</Form.Label>
                <Form.Label className="fw-bold mt-2">Password</Form.Label>
                <Form.Label className="fw-bold mt-2">Email</Form.Label>
                <Form.Label className="fw-bold mt-1">Phone Number</Form.Label>
                <Form.Label className="fw-bold mb-3">City</Form.Label>
                <Form.Label className="fw-bold mb-3">Province</Form.Label>
                <Form.Label className="fw-bold mb-3">Address detail</Form.Label>
                <Form.Label className="fw-bold mt-4">Profile Image</Form.Label>
              </Form.Group>
              <Form.Group className="mb-1 d-flex flex-column gap-3 ms-2">
                <Form.Label className="fw-bold mt-1">:</Form.Label>
                <Form.Label className="fw-bold mt-2">:</Form.Label>
                <Form.Label className="fw-bold mt-2">:</Form.Label>
                <Form.Label className="fw-bold mt-1">:</Form.Label>
                <Form.Label className="fw-bold mb-3">:</Form.Label>
                <Form.Label className="fw-bold mb-3">:</Form.Label>
                <Form.Label className="fw-bold mb-3">:</Form.Label>
                <Form.Label className="fw-bold mt-4">:</Form.Label>
              </Form.Group>

              <Form.Group className="mb-1 col-9 ms-auto d-flex flex-column gap-3">
                <Form.Control type="text" placeholder="Enter Name" name="name" onChange={handleInputChange} value={values.name} />
                <Form.Control className="blur" type="password" placeholder="Password" name="password" onChange={handleInputChange} value={values.password} />
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInputChange} value={values.email} />
                <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" onChange={handleInputChange} value={values.phoneNumber} />
                <Form.Control type="text" placeholder="Enter city name" name="city" onChange={handleInputChange} value={values.city} />
                <Form.Control type="text" placeholder="Enter province name" name="province" onChange={handleInputChange} value={values.province} />
                <Form.Control as="textarea" placeholder="Enter address" name="address" onChange={handleInputChange} value={values.address} />
                <Form.Control type="text" placeholder="Enter image" name="vendorImgUrl" onChange={handleInputChange} value={values.vendorImgUrl} />
              </Form.Group>
            </div>

            <Button variant="outline-light" type="submit">
              Creat Account
            </Button>
            <Link to="/" className="ms-3 btn btn-outline-light">
            Cancel
            </Link>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}
export default RegisterForm;
