import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { newTrekkingRoute } from "../../../data/Fetch";

const NewTrekkingRoute = () => {
  const [image, setImage] = useState("");

  const initialFormValue = {
    name: "",
    description: "",
    distance: "",
    image: "",
    duration: "",
    heightDifference: "",
    difficulty: "",
    latitude: "",
    longitude: "",
  };

  const [formValue, setFormValue] = useState(initialFormValue);
  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    handleChangeFormValue(event);
    setImage(event.target.files[0]);
  };

  return (
    <>
      <Container>
        <h1>Crea un nuovo percorso</h1>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              onChange={(event) => handleChangeFormValue(event)}
              size="lg"
              placeholder="Nome"
              name="name"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              onChange={(event) => handleChangeFormValue(event)}
              size="lg"
              placeholder="Descrizione percorso"
              name="description"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Group className="mt-3 mb-3">
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Distanza</Form.Label>
              <Form.Control
                onChange={(event) => handleChangeFormValue(event)}
                size="lg"
                placeholder="Distanza percorso"
                name="distance"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Dislivello</Form.Label>
              <Form.Control
                onChange={(event) => handleChangeFormValue(event)}
                size="lg"
                placeholder="Dislivello"
                name="heightDifference"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Difficoltà</Form.Label>
              <Form.Control
                onChange={(event) => handleChangeFormValue(event)}
                size="lg"
                placeholder="Difficoltà"
                name="difficulty"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Durata</Form.Label>
              <Form.Control
                onChange={(event) => handleChangeFormValue(event)}
                size="lg"
                placeholder="Durata percorso"
                name="duration"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Latitudine</Form.Label>
              <Form.Control
                onChange={(event) => handleChangeFormValue(event)}
                size="lg"
                placeholder="Latitudine"
                name="latitude"
                
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Longitudine</Form.Label>
              <Form.Control
                onChange={(event) => handleChangeFormValue(event)}
                size="lg"
                placeholder="Longitudine"
                name="longitude"
              
              />
            </Form.Group>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              onClick={() => newTrekkingRoute(formValue, image)}
              
            >
              Invia
            </Button>
          </Form.Group>
        </Form>
      </Container>
      
      
    </>
  );
};
export default NewTrekkingRoute;
