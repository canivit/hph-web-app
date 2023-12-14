import { Container, Nav, Navbar } from "react-bootstrap";
import { UserContent } from "./User/UserContent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faHome,
  faSignIn,
  faSignOut,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { GlobalState } from "./Store/store";

export function NavBar() {
  const currentUser = useSelector(
    (state: GlobalState) => state.userReducer.currentUser
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">High Performance Health</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="me-4">
              <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Workouts" className="me-4">
              <FontAwesomeIcon icon={faDumbbell} /> Workouts
            </Nav.Link>
            <Nav.Link as={Link} to="/Signin" className="me-4">
              <FontAwesomeIcon icon={faSignIn} /> Sign In
            </Nav.Link>
            <Nav.Link as={Link} to="/Signup" className="me-4">
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </Nav.Link>
            {currentUser !== false && (
              <Nav.Link as={Link} to="/Profile" className="me-4">
                <FontAwesomeIcon icon={faUser} /> Profile ({`@${currentUser.username}`})
              </Nav.Link>
            )}
            <UserContent>
              <Nav.Link as={Link} to="/Signout">
                <FontAwesomeIcon icon={faSignOut} /> Sign Out
              </Nav.Link>
            </UserContent>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
