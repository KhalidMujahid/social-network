import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  FormGroup,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginWithTokenUserAsync, registerUserAsync } from "../../redux/user";

const Regsiter = () => {
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));

      if (token) {
        dispatch(loginWithTokenUserAsync({ token }))
          .unwrap()
          .then(() => navigate("/", { replace: true }))
          .catch((error) => console.log(error));
      }
    }
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.fname || !inputs.lname || !inputs.email || !inputs.password) {
      setShow(true);
      setMessage("All field are required!");
      return;
    }

    try {
      dispatch(
        registerUserAsync({
          fname: inputs.fname,
          lname: inputs.lname,
          email: inputs.email,
          password: inputs.password,
        })
      )
        .unwrap()
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          setShow(true);
          setMessage(error);
          return;
        });
    } catch (error) {
      setShow(true);
      setMessage(error);
      return;
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <Form
              className="h-100 mt-3 border shadow p-5"
              onSubmit={handleSubmit}
            >
              <h1>Sign up</h1>
              <Alert
                variant="danger"
                show={show}
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Error</Alert.Heading>
                {message && <p>{message}</p>}
              </Alert>
              <InputGroup className="mt-4">
                <FormControl
                  type="text"
                  name="fname"
                  value={inputs.fname}
                  onChange={handleChange}
                  className="p-3"
                  placeholder="First name"
                />
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup>
              <FormGroup className="mt-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    name="lname"
                    value={inputs.lname}
                    onChange={handleChange}
                    className="p-3"
                    placeholder="Last name"
                  />
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt-3">
                <InputGroup>
                  <FormControl
                    className="p-3"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    type="text"
                    placeholder="example@gmail.com"
                  />
                  <InputGroup.Text>
                    <FaEnvelope />
                  </InputGroup.Text>
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt-3">
                <InputGroup>
                  <FormControl
                    className="p-3"
                    type={toggle ? "text" : "password"}
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="password"
                  />
                  <InputGroup.Text onClick={() => setToggle(!toggle)}>
                    {toggle ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt-3">
                <Button
                  className="p-3 form-control"
                  variant="outline-primary"
                  type="submit"
                >
                  {loading ? <Spinner animation="border" /> : <>Register</>}
                </Button>
              </FormGroup>
              <div className="mt-3 text-center">
                <span>Already have an account?</span>
              </div>
              <FormGroup className="mt-2">
                <Link to="/login">
                  <Button className="form-control" variant="outline-success">
                    Login
                  </Button>
                </Link>
              </FormGroup>
              <div className="text-center mt-3">
                <p className="text-danger">Forget password?</p>
              </div>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Regsiter;
