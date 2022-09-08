import { useEffect, useState, memo } from "react";
import {
  Container,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync, loginWithTokenUserAsync } from "../../redux/user";

const Login = () => {
  const { loading } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    text: "",
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
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.text === "" || input.password === "") {
      setToggle(true);
      setMessage("All field are required!");
      return;
    }

    try {
      dispatch(
        loginUserAsync({
          email: input.text,
          password: input.password,
        })
      )
        .unwrap()
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/", { replace: true });
        })
        .catch((error) => {
          setToggle(true);
          setMessage(error);
        });
    } catch (error) {
      setToggle(true);
      setMessage(error);
    }
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <h1
            className="h1 text-primary d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            ViChat
            <Spinner animation="border" />
          </h1>
        </div>
      ) : (
        <Container className="mt-3">
          <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
              <Form
                className="h-100 mt-3 border shadow p-5"
                onSubmit={handleSubmit}
              >
                <h1>Login</h1>
                <Alert
                  variant="danger"
                  show={toggle}
                  onClose={() => setToggle(false)}
                  dismissible
                >
                  <Alert.Heading>Error</Alert.Heading>
                  {message && <p>{message}</p>}
                </Alert>
                <InputGroup className="mt-4">
                  <FormControl
                    type="text"
                    name="text"
                    onChange={handleChange}
                    autoComplete="off"
                    className="p-3"
                    placeholder="Email or Phone number"
                  />
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mt-3">
                  <FormControl
                    autoComplete="off"
                    className="p-3"
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="password"
                  />
                  <InputGroup.Text
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    {togglePassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
                <FormGroup className="mt-3">
                  <Button
                    className="p-3 form-control"
                    variant="outline-primary"
                    type="submit"
                  >
                    {loading ? <Spinner animation="border" /> : <>Login</>}
                  </Button>
                </FormGroup>
                <div className="mt-3 text-center">
                  <span>Don't have an account?</span>
                </div>
                <FormGroup className="mt-2">
                  <Link to="/register">
                    <Button className="form-control" variant="outline-success">
                      Register
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
      )}{" "}
    </>
  );
};

export default memo(Login);
