import React, { useState } from "react";
import { Alert, Button, Container, Form, Row, Col, Spinner } from "react-bootstrap";
import { newTrekkingRoute } from "../../../data/Fetch";
import "./NewTrekkingRoute.css"

const NewTrekkingRoute = () => {
  const [images, setImages] = useState([]);
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    distance: "",
    duration: "",
    heightDifference: "",
    difficulty: "",
    start: [""],
    end: [""],
    coordinates: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImages = (event) => {
    const imageFiles = Array.from(event.target.files);
    console.log("immagini", imageFiles);
    setImages(imageFiles);
  };

  const handleAddCoordinate = () => {
    const newCoordinate = prompt("Inserisci una coppia di coordinate lat,lng:");
    if (newCoordinate) {
      const [lat, lng] = newCoordinate
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        setFormValue((prev) => ({
          ...prev,
          coordinates: [...prev.coordinates, [lat, lng]],
        }));
      } else {
        setMessage(
          "Formato delle coordinate non valido. Usa il formato: numero,numero"
        );
      }
    }
  };

  const handleRemoveCoordinate = (index) => {
    const updatedCoordinates = formValue.coordinates.filter(
      (_, i) => i !== index
    );
    setFormValue({ ...formValue, coordinates: updatedCoordinates });
  };

  const handleStartRoute = (event) => {
    const { name, value } = event.target;
    const updatedStart = [...formValue.start];
    updatedStart[name === "startLat" ? 0 : 1] = parseFloat(value);
    setFormValue({
      ...formValue,
      start: updatedStart,
    });
  };

  const handleEndRoute = (event) => {
    const { name, value } = event.target;
    const updatedEnd = [...formValue.end];
    updatedEnd[name === "endLat" ? 0 : 1] = parseFloat(value);
    setFormValue({
      ...formValue,
      end: updatedEnd,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation
    if (!images || !formValue.name || !formValue.description) {
      setMessage("Compila tutti i campi richiesti.");
      setLoading(false);
      return;
    }

    try {
      const response = await newTrekkingRoute(formValue, images);
      if (response.status === 201) {
        setMessage("Percorso creato con successo");
        setAlertVariant("success");
      }
    } catch (error) {
      setMessage("Errore durante l'inserimento del percorso.");
      setAlertVariant("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="new-trekking-route">
        <h2>Crea un nuovo percorso</h2>
        <Row>
          <Col md={6}>
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
                <Form.Label>Immagini</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  multiple
                  onChange={handleChangeImages}
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
            </Form>
          </Col>

          <Col md={6}>
            <h2>Informazioni relative alla posizione del percorso</h2>
            <Form.Group className="mt-3">
              <Form.Label>Latitudine Punto di inizio</Form.Label>
              <Form.Control
                onChange={handleStartRoute}
                size="lg"
                placeholder="Latitudine inizio percorso"
                name="startLat"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Longitudine Punto di inizio</Form.Label>
              <Form.Control
                onChange={handleStartRoute}
                size="lg"
                placeholder="Longitudine inizio percorso"
                name="startLng"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Latitudine Punto di fine</Form.Label>
              <Form.Control
                onChange={handleEndRoute}
                size="lg"
                placeholder="Latitudine fine percorso"
                name="endLat"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Longitudine Punto di fine</Form.Label>
              <Form.Control
                onChange={handleEndRoute}
                size="lg"
                placeholder="Longitudine fine percorso"
                name="endLng"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Coordinate del sentiero</Form.Label>
              <Button
                onClick={handleAddCoordinate}
                variant="secondary"
                className="mx-2"
              >
                Aggiungi Coordinate
              </Button>
              <ul>
                {formValue.coordinates.map((coord, index) => (
                  <li key={index}>
                    {`Lat: ${coord[0]}, Lng: ${coord[1]}`}
                    <Button
                      variant="danger"
                      className="mx-2 mt-2"
                      onClick={() => handleRemoveCoordinate(index)}
                    >
                      Rimuovi
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>
          </Col>
        </Row>

        {/* Pulsante in fondo */}
        <Row className="mt-4">
          <Col>
            <Button type="submit" size="lg" variant="success" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Invia"}
            </Button>
          </Col>
        </Row>

        {message && <Alert variant={alertVariant}>{message}</Alert>}
      </Container>
    </>
  );
};

export default NewTrekkingRoute;
