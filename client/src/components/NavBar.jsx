import { Container, Navbar } from "react-bootstrap";
import {
  FaBars,
  FaFacebookMessenger,
  FaHome,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar bg="primary" className="fixed-top">
        <Container className="p-2 me-2">
          <div className="container w-100 d-flex justify-content-around">
            <div>
              <NavLink
                to="/"
                className={pathname === "/" ? "text-white" : "text-dark"}
                style={{ textDecoration: "none" }}
              >
                <FaHome size={23} />
                <span className="badge text-white bg-danger border rounded">
                  23+
                </span>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/messenger"
                className={
                  pathname.match("/messenger") ? "text-white" : "text-dark"
                }
                style={{ textDecoration: "none" }}
              >
                <FaFacebookMessenger size={23} />
                <span className="badge text-white bg-danger border rounded">
                  3+
                </span>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/friends"
                className={
                  pathname.match("/friends") ? "text-white" : "text-dark"
                }
                style={{ textDecoration: "none" }}
              >
                <FaUserFriends size={23} />
                <span className="text-white bg-danger border rounded badge">
                  30+
                </span>
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/profile"
                className={
                  pathname.match("/profile") ? "text-white" : "text-dark"
                }
                style={{ textDecoration: "none" }}
              >
                <FaUser size={23} />
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/menu"
                className={pathname.match("/menu") ? "text-white" : "text-dark"}
                style={{ textDecoration: "none" }}
              >
                <FaBars size={23} />
                <span className="text-white bg-danger border rounded badge">
                  2+
                </span>
              </NavLink>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
