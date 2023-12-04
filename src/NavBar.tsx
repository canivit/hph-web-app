import { Container, Nav, Navbar } from "react-bootstrap";
import { SignedInContent } from "./User/SignedInContent";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">High Performance Health</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Workouts">
              Workouts
            </Nav.Link>
            <Nav.Link as={Link} to="/Trainers">
              Trainers
            </Nav.Link>
            <Nav.Link as={Link} to="/Athletes">
              Athletes
            </Nav.Link>
            <Nav.Link as={Link} to="/Signin">
              Sign in
            </Nav.Link>
            <Nav.Link as={Link} to="/Signup">
              Sign up
            </Nav.Link>
            <Nav.Link as={Link} to="/Profile">
              Profile
            </Nav.Link>
            <SignedInContent>
              <Nav.Link as={Link} to="/Signout">
                Sign out
              </Nav.Link>
            </SignedInContent>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
