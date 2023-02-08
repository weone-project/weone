import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const getAllCategories = gql`
  query GetCategories {
    getCategories {
      id
      name
    }
  }
`;

const createProduct = gql`
  mutation CreateProduct($accessToken: String, $form: ProductForm) {
    createProduct(access_token: $accessToken, form: $form) {
      message
    }
  }
`;

function RegisterForm() {
  const navigate = useNavigate();
  const input = {
    name: "",
    description: "",
    mainImg: "",
    detailImg1: "",
    detailImg2: "",
    detailImg3: "",
    price: 0,
    dpPrice: 0,
    estimatedDay: 0,
    CategoryId: 0,
  };

  const [values, setValues] = useState(input);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(name, value);
  };
  const imgUrl = [];
  if (values.mainImg) {
    imgUrl.push(values.mainImg);
  }
  if (values.detailImg1) {
    imgUrl.push(values.detailImg1);
  }
  if (values.detailImg2) {
    imgUrl.push(values.detailImg2);
  }
  if (values.detailImg3) {
    imgUrl.push(values.detailImg3);
  }
  const data = {
    name: values.name,
    description: values.description,
    imgUrl,
    price: +values.price,
    dpPrice: +values.dpPrice,
    estimatedDay: +values.estimatedDay,
    CategoryId: +values.CategoryId,
  };
  const { data: allCategories, loading } = useQuery(getAllCategories);

  const [addProductFormVendor, { data: dataAddProductVendor }] = useMutation(createProduct);

  const handleSubmit = (event) => {
    event.preventDefault();
    addProductFormVendor({
      variables: {
        accessToken: localStorage.getItem("access_token"),
        form: data,
      },
    });
  };

  useEffect(() => {
    if (dataAddProductVendor) {
      navigate("/products");
    }
  }, [dataAddProductVendor]);

  if (allCategories) {
    return (
      <div className="containerForm d-flex justify-content-center">
        <div className="col-6 text-center">
          <h1 className="mt-1 mb-3 fw-bold headerText">Create New Product</h1>
          <Card.Body className="border border-light rounded-3 bg-white p-3">
            <div className="text-center cardForm">
              <h3> Please fill in your product data bellow</h3>
              <hr />
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="d-flex flex-row cardForm mb-2">
                <Form.Group className="mb-3 d-flex flex-column gap-2">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Label className="fw-bold">Price</Form.Label>
                  {values.price > 10000000 && <Form.Label className="fw-bold">Down Payment</Form.Label>}
                  <Form.Label className="fw-bold">Remaining Payment Due</Form.Label>
                  <Form.Label className="fw-bold">Product Image</Form.Label>
                  <Form.Label className="fw-bold mb-5">Detail Image</Form.Label>
                  <Form.Label className="fw-bold mt-4 pt-2">Description</Form.Label>
                </Form.Group>
                <Form.Group className="mb-1 d-flex flex-column gap-2 ms-2 me-1">
                  <Form.Label className="fw-bold">:</Form.Label>
                  <Form.Label className="fw-bold">:</Form.Label>
                  <Form.Label className="fw-bold">:</Form.Label>
                  <Form.Label className="fw-bold">:</Form.Label>
                  {values.price > 10000000 && <Form.Label className="fw-bold">:</Form.Label>}
                  <Form.Label className="fw-bold mt-4">:</Form.Label>
                  <Form.Label className="fw-bold mb-5">:</Form.Label>
                  <Form.Label className="fw-bold mt-4 pt-2">:</Form.Label>
                </Form.Group>

                <Form.Group className="mb-1 col-9 ms-auto d-flex flex-column gap-2">
                  <Form.Control className="form-control-sm" type="text" placeholder="Enter Name" name="name" onChange={handleInputChange} value={values.name} />
                  <select name="CategoryId" className="form-control form-control-sm w-50" onChange={handleInputChange} defaultValue={values.CategoryId}>
                    <option selected disabled>
                      --- Select One ---
                    </option>
                    {allCategories.getCategories.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                  <Form.Control className="form-control-sm w-25" type="number" min={100000} name="price" onChange={handleInputChange} value={values.price} />
                  {values.price > 10000000 && <Form.Control className="form-control-sm w-25" max={values.price * 0.5} min={3000000} type="number" name="dpPrice" onChange={handleInputChange} value={values.dpPrice} />}
                  {/* <Form.Control className="form-control-sm w-25 mb-4" min={1} type="number" name="estimatedDay" onChange={handleInputChange} value={values.estimatedDay} /> */}
                  <select name="estimatedDay" className="form-control form-control-sm w-50 text-center" onChange={handleInputChange} defaultValue={values.estimatedDay}>
                  <option selected disabled>
                      --- Select One ---
                    </option>
                    <option value="1">1 day before reservation date</option>
                    <option value="7">1 week before reservation date</option>
                    <option value="14">2 weeks before reservation date</option>
                    <option value="30">1 month before reservation date</option>
                  </select>
                  <Form.Control className="form-control-sm" type="text" placeholder="Enter main image" name="mainImg" onChange={handleInputChange} value={values.mainImg} />
                  <Form.Control className="form-control-sm" type="text" placeholder="Enter detail image 1" name="detailImg1" onChange={handleInputChange} value={values.detailImg1} />
                  <Form.Control className="form-control-sm" type="text" placeholder="Enter detail image 2" name="detailImg2" onChange={handleInputChange} value={values.detailImg2} />
                  <Form.Control className="form-control-sm" type="text" placeholder="Enter detail image 3" name="detailImg3" onChange={handleInputChange} value={values.detailImg3} />
                  <Form.Control className="form-control-sm" as="textarea" placeholder="Enter product detail description" name="description" onChange={handleInputChange} value={values.description} />
                </Form.Group>
              </div>

              <Button variant="secondary" type="submit">
                Submit
              </Button>
              <Link to="/products" className="ms-3 btn btn-secondary">
                Cancel
              </Link>
            </Form>
          </Card.Body>
        </div>
      </div>
    );
  }
}
export default RegisterForm;
