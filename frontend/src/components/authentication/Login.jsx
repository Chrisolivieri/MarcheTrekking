import React, { useContext, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { login } from "../../data/Fetch";
import { UserContext } from "../../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login = () => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from submitting
    if (!formValue.email || !formValue.password) {
      alert("Compila tutti i campi di login!");
      return;
    }
    const tokenObj = await login(formValue);
    localStorage.setItem("token", tokenObj.token);
    setToken(tokenObj.token);
    navigate("/");
  };

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Container className="register">
      <Row>
        <Col md={3}>
          <h1 className="regTitle">Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Indirizzo E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChangeFormValue}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChangeFormValue}
                required
              />
            </Form.Group>
            <div className="logButtons">
              <Button className="logBtn" variant="primary" type="submit">
                Login
              </Button>
              <Button
                className="googleBtn"
                as={Link}
                to={`${process.env.REACT_APP_API_URL}/login-google`}
              >
                <FcGoogle /> Accedi con Google
              </Button>
              <p className="linkToRegister">
                Non hai un account? <Link to="/register">Registrati</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={9}>
          <div className="imageReg">
            <img className="img-fluid" src="assets/paesaggio4.jpg" alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
