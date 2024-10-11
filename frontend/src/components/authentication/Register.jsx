import React, { useState } from "react";
import { Container, Col, Form, InputGroup, Row, Spinner, Alert } from "react-bootstrap";
import { register } from "../../data/Fetch";
import "./Register.css";

const RegisterLogin = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");

  const registrationFormValue = {
    name: "",
    surname: "",
    age: "",
    email: "",
    password: "",
    avatar: "",
  };

  const [regFormValue, setRegFormValue] = useState(registrationFormValue);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChangeRegistration = (event) => {
    setRegFormValue({
      ...regFormValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeAvatar = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleRegister = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setLoading(true);
    setAlertMessage(null);

    try {
      const res = await register(regFormValue, avatarFile);
      
      if (res.status === 400) {
        setAlertVariant("danger");
        setLoading(false);
        return;
      }

      setAlertMessage("Registrazione avvenuta con successo!");
      setAlertVariant("success");
    } catch (error) {
      setAlertMessage("Errore durante la registrazione");
      setAlertVariant("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="register">
        <Row>
          <Col md={7}>
            <div className="imageReg">
              <img
                className="img-fluid"
                src="assets/marche_paesaggio_urbino.webp"
                alt=""
              />
            </div>
          </Col>
          <Col md={5}>
            <h1 className="regTitle">Registrati</h1>
            {alertMessage && (
              <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
                {alertMessage}
              </Alert>
            )}
            <Form noValidate validated={validated} onSubmit={handleRegister}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    required
                    placeholder="Il tuo nome"
                    type="text"
                    name="name"
                    value={regFormValue.name}
                    onChange={handleChangeRegistration}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    required
                    placeholder="Il tuo cognome"
                    type="text"
                    name="surname"
                    value={regFormValue.surname}
                    onChange={handleChangeRegistration}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group
                as={Col}
                md="12"
                className="mb-3"
                controlId="validationCustom03"
              >
                <Form.Label>E-mail</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    required
                    placeholder="La tua E-mail"
                    type="email"
                    name="email"
                    value={regFormValue.email}
                    onChange={handleChangeRegistration}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Inserisci un Indirizzo E-mail valido
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                  <Form.Label>Età</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="age"
                    value={regFormValue.age}
                    onChange={handleChangeRegistration}
                    min="1"
                    max="120"
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci un numero valido
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="8" controlId="validationCustom04">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    placeholder="Inserisci una password"
                    type="password"
                    name="password"
                    value={regFormValue.password}
                    onChange={handleChangeRegistration}
                  />
                  <Form.Control.Feedback type="invalid">
                    Inserisci una password valida
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="cover" className="mt-3 mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    onChange={handleChangeAvatar}
                  />
                </Form.Group>
                <div className="regBtn">
                  <button className="buttonWelcome" type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="front text">Registrati</span>
                    )}
                  </button>
                </div>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterLogin;
