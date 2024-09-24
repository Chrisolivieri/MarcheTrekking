import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { register } from "../../data/Fetch";

const RegisterLogin = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

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

  const handleRegister = async () => {
    const res = await register(regFormValue, avatarFile);

    console.log(res);
  };
  return (
    <Container>
      <h1>Registrazione</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              placeholder="Il tuo nome"
              type="name"
              name="name"
              value={regFormValue.name}
              onChange={handleChangeRegistration}
            />
            <Form.Control.Feedback>Ok</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              required
              placeholder="Il tuo cognome"
              type="surname"
              name="surname"
              value={regFormValue.surname}
              onChange={handleChangeRegistration}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="2" controlId="validationCustom03">
            <Form.Label>Età</Form.Label>
            <Form.Control
              required
              placeholder="Inserisci la tua età"
              type="age"
              name="age"
              value={regFormValue.age}
              onChange={handleChangeRegistration}
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un numero valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="10" controlId="validationCustom04">
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
              placeholder="Inserisci il tuo avatar"
              onChange={handleChangeAvatar}
            />
          </Form.Group>
        </Row>

        <Button onClick={handleRegister}>Registrati</Button>
      </Form>
    </Container>
  );
};

export default RegisterLogin;
