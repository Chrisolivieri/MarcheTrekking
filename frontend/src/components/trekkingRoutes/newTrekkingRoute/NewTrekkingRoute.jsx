import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { newTrekkingRoute } from "../../../data/Fetch";

const NewTrekkingRoute = () => {
  const [image, setImage] = useState(null);
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    distance: "",
    duration: "",
    heightDifference: "",
    difficulty: "",
    startLat: "",
    startLng: "",
    endLat: "",
    endLng: "",
  });
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting
    setLoading(true);
    setMessage("");

    // Validation 
    if (!image || !formValue.name || !formValue.description) {
      setMessage("Compila tutti i campi richiesti.");
      setLoading(false);
      return;
    }

    try {
      const result = await newTrekkingRoute(formValue, image);
      setMessage("Percorso inserito con successo!");
    } catch (error) {
      setMessage("Errore durante l'inserimento del percorso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Crea un nuovo percorso</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Nome"
            name="name"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Descrizione percorso"
            name="description"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChangeImage}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Distanza</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Distanza percorso"
            name="distance"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Dislivello</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Dislivello"
            name="heightDifference"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Difficoltà</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Difficoltà"
            name="difficulty"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Durata</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Durata percorso"
            name="duration"
            required
          />
        </Form.Group>

        <h2>Informazioni relative alla posizione del percorso</h2>
        <Form.Group className="mt-3">
          <Form.Label>Latitudine inizio percorso</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Latitudine"
            name="startLat"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Longitudine inizio percorso</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Longitudine"
            name="startLng"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Latitudine fine percorso</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Latitudine"
            name="endLat"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Longitudine fine percorso</Form.Label>
          <Form.Control
            onChange={handleChangeFormValue}
            size="lg"
            placeholder="Longitudine"
            name="endLng"
            required
          />
        </Form.Group>
        
        <Button type="submit" size="lg" variant="dark" disabled={loading}>
          {loading ? "Invio in corso..." : "Invia"}
        </Button>
      </Form>
    </Container>
  );
};

export default NewTrekkingRoute;
