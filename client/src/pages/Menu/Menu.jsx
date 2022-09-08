import { Col, Row } from "react-bootstrap";
import MenuSideBar from "../../components/MenuSideBar";
import NavBar from "../../components/NavBar";

const Menu = () => {
  return (
    <>
      <NavBar />
      <Row className="mt-5">
        <Col sm="2"></Col>
        <Col sm="8">
          <MenuSideBar />
        </Col>
        <Col sm="2"></Col>
      </Row>
    </>
  );
};

export default Menu;
