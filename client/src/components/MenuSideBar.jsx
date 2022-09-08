import { Container, ListGroup } from "react-bootstrap";
import {
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const MenuSideBar = () => {
  const { user } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();

    console.log("Logged out");
  };

  return (
    <>
      <Container>
        <div>
          <div className="mt-3">
            <ListGroup className="me-4">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>Groups</div>
                <FaUsers />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>Freinds</div>
                <div>
                  <FaUserFriends />
                  <span className="bg-danger text-white badge">
                    {user?.friends?.length}
                  </span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>Notifications</div>
                <FaBell />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>Settings</div>
                <FaCog />
              </ListGroup.Item>
              <ListGroup.Item
                className="bg-danger d-flex justify-content-between align-items-center"
                onClick={handleClick}
              >
                Logout <FaSignOutAlt />
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MenuSideBar;
