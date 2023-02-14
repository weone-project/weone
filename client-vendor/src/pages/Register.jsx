import { Button, Form, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { client } from "filestack-react";
import { ImCancelCircle } from "react-icons/im";

const registerVendor = gql`
  mutation CreateVendor($form: VendorForm) {
    createVendor(form: $form) {
      name
      email
      password
      phoneNumber
      city
      province
      address
      vendorImgUrl
      id
    }
  }
`;

function RegisterForm() {
  function uploadGalery() {
    const options = {
      accept: "image/*",
      fromSources: ["local_file_system"],
      maxSize: 1024 * 1024,
      maxFiles: 1,
      onFileUploadFinished(file) {
        let { url } = file;
        setValues({
          ...values,
          vendorImgUrl: url,
        });
        console.log(url);
      },
    };

    const filestack_apikey = "AUBTskupZRaOEc2hj4Kqbz"; //replace with your api key
    const filestack = client.init(filestack_apikey, options);
    const picker = filestack.picker(options);
    return picker.open();
  }

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

  const [registerFormVendor, { data: dataRegisterVendor }] = useMutation(registerVendor);

  const handleSubmit = (event) => {
    event.preventDefault();
    registerFormVendor({
      variables: {
        form: values,
      },
    });
  };

  useEffect(() => {
    if (dataRegisterVendor) {
      navigate("/");
    }
  }, [dataRegisterVendor]);

  return (
    <div className="containerForm d-flex justify-content-center">
      <div className="col-6 text-center">
        <h1 className="mt-1 mb-3 fw-bold headerText">Join us and help others to get their dream wedding</h1>
        <Card.Body className="border border-light rounded-3 bg-white p-3">
          <div className="text-center cardForm">
            <h3> Please fill in your data bellow</h3>
            <hr />
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-row cardForm">
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
                <div className="d-flex flex-row mt-1 mb-3">
                  <button onClick={uploadGalery} className="btn btn-primary btn-sm w-50 fw-bold">
                    Upload Photo
                  </button>
                  {values.vendorImgUrl ? (
                    <h6 className="pt-2 ms-3">
                      <Badge className="bg-success ">uploaded</Badge>
                    </h6>
                  ) : (
                    <h6 className="pt-2 ms-3">
                      <Badge className="bg-secondary">no uploaded file</Badge>
                    </h6>
                  )}
                </div>
              </Form.Group>
            </div>

            <Button variant="secondary" className="shadow-lg" type="submit">
              Creat Account
            </Button>
            <Link to="/" className="ms-3 btn btn-secondary shadow-lg">
              Cancel
            </Link>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}
export default RegisterForm;
