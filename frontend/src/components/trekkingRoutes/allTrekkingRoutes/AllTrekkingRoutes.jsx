import React, { useEffect, useState } from "react";
import { loadTrekkingRoutes } from "../../../data/Fetch";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SingleRoute from "../singleRoute/SingleRoute";

const AllTrekkingRoutes = () => {
  const [trekkingRoutes, setTrekkingRoutes] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");

  useEffect(() => {
    const fetchTrekkingRoutes = async () => {
      const newRoutes = await loadTrekkingRoutes(page);
      setTrekkingRoutes((prevRoutes) => [...prevRoutes, ...newRoutes]);
    };

    fetchTrekkingRoutes();
  }, [page]);

  const loadMoreRoutes = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filteredRoutes = trekkingRoutes.filter((route) => {
    const titleMatch = route.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const [minDistance, maxDistance] = searchQuery2.split("-").map(Number);

    const distanceMatch =
      !isNaN(minDistance) &&
      route.distance >= minDistance &&
      (isNaN(maxDistance) || route.distance <= maxDistance);

    const difficultyMatch = route.difficulty
      .toLowerCase()
      .includes(searchQuery3.toLowerCase());
    return titleMatch && distanceMatch && difficultyMatch;
  });

  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <input
              type="text"
              placeholder="Filtra percorsi per titolo"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="form-control text-center"
            />

            <form action="#">
              <label htmlFor="difficulty">Difficoltà</label>
              <select
                name="difficulty"
                id="difficulty"
                value={searchQuery3}
                onChange={(event) => setSearchQuery3(event.target.value)}
              >
                <option value="">Filtra per difficoltà</option>
                <option value="Facile">Facile</option>
                <option value="Media">Medio</option>
                <option value="Difficile">Difficile</option>
              </select>
            </form>

            {/* <input
              type="text"
              placeholder="Filtra percorsi per difficoltà (Facile, Media, Difficile)"
              value={searchQuery3}
              onChange={(event) => setSearchQuery3(event.target.value)}
              className="form-control text-center"
            /> */}
            <form action="#">
              <label htmlFor="distance">Distanza</label>
              <select
                name="distance"
                id="distance"
                value={searchQuery2}
                onChange={(event) => setSearchQuery2(event.target.value)}
              >
                <option value="">Seleziona una distanza</option>

                <option value="5-10">5 - 10 km</option>
                <option value="10-15">10 - 15 km</option>
                <option value="15-20">15 - 20 km</option>
              </select>
            </form>
          </Col>
          <Col md={9}>
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((trekkingRoute, i) => (
                <React.Fragment key={i}>
                  <SingleRoute {...trekkingRoute} />

                  <Card>
                    <Card.Body>
                      <Card.Title>{trekkingRoute.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {trekkingRoute.description}
                      </Card.Subtitle>
                      <Card.Text>
                        {trekkingRoute.difficulty} - {trekkingRoute.distance} km
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              ))
            ) : (
              <p>Nessun percorso trovato</p>
            )}
          </Col>
        </Row>
      </Container>
      {trekkingRoutes.length < 11 && (
        <Button onClick={loadMoreRoutes}>Carica più percorsi</Button>
      )}
    </>
  );
};

export default AllTrekkingRoutes;
