import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function MyNavbar() {
  const moveTo = useNavigate();
  const Logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    moveTo("/");
  };
  return (

<Navbar bg="white" className="navbar navbar-default navbar-fixed-top">
      <Container>
        <Navbar.Brand className="">
          <img className="logo" src="https://res.cloudinary.com/dnh89xvo5/image/upload/v1675526895/Final%20Project/Logo-l_l71oxb.png" alt="" />
        </Navbar.Brand>
            {localStorage.getItem("access_token") && (
              <a className="nav-link fw-bold">
              Hi, {localStorage.getItem('name')}
              </a>
            )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            {localStorage.getItem("access_token") && (
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            )}
            {localStorage.getItem("access_token") && (
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            )}
            {localStorage.getItem("access_token") && (
              <Nav.Link onClick={Logout}>
                <small className="ms-5 me-1">Logout</small>
                <FiLogOut/>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
