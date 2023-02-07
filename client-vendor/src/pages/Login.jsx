import { Button, Form, Card, Badge } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const input = {
    email: "",
    password: "",
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
        //masukan post di sini
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerLogin d-flex justify-content-center">
      <div className="text-center cardLogin">
        <h1 className="my-5 headerText">Welcome to Wedding One</h1>
        <Card.Body className="border rounded-3 bg-white p-5 border-light shadow-lg">
          <h3> Sign In</h3>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInputChange} value={values.email} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control className="blur" type="password" placeholder="Password" name="password" onChange={handleInputChange} value={values.password} />
              <Form.Text className="text-light">We'll never share your email and password with anyone else.</Form.Text>
            </Form.Group>
            <Button variant="secondary" type="submit" className="col-4">
              Log in
            </Button>
          </Form>
          <hr />
          <p>Register and join us, <Link to="/register"><Badge className="fw-bold">here</Badge></Link></p>
        </Card.Body>
      </div>
    </div>
  );
}

export default LoginForm;
