import { Container, Nav, Navbar } from "react-bootstrap";
import { SimpleLink } from "./SimpleLink";

export function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>High Performance Health</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link><SimpleLink to="/">Home</SimpleLink></Nav.Link>
            <Nav.Link><SimpleLink to="Workouts">Workouts</SimpleLink></Nav.Link>
            <Nav.Link><SimpleLink to="Trainers">Trainers</SimpleLink></Nav.Link>
            <Nav.Link><SimpleLink to="Athletes">Athletes</SimpleLink></Nav.Link>
            <Nav.Link><SimpleLink to="Signin">Signin</SimpleLink></Nav.Link>
            <Nav.Link><SimpleLink to="Signup">Signup</SimpleLink></Nav.Link>
            <Nav.Link><SimpleLink to="Profile">Profile</SimpleLink></Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
