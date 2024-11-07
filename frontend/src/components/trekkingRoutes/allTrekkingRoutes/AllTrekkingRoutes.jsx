import React, { useEffect, useState } from "react";
import { loadTrekkingRoutes } from "../../../data/Fetch";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import SingleRoute from "../singleRoute/SingleRoute";
import { CgDanger } from "react-icons/cg";
import { GiPathDistance } from "react-icons/gi";
import { CiClock1 } from "react-icons/ci";

import "./AllTrekkingRoutes.css";

const AllTrekkingRoutes = () => {
  const [trekkingRoutes, setTrekkingRoutes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");
  const [searchQuery4, setSearchQuery4] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTrekkingRoutes = async () => {
      setIsLoading(true);
      const newRoutes = await loadTrekkingRoutes(page);
      setTrekkingRoutes((prevRoutes) => [...prevRoutes, ...newRoutes]);
      setIsLoading(false);
    };

    fetchTrekkingRoutes();
  }, [page]);

  const loadMoreRoutes = async () => {
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

    const durationMatch = String(route.duration)
      .toLowerCase()
      .includes(searchQuery4.toLowerCase());

    return titleMatch && distanceMatch && difficultyMatch && durationMatch;
  });

  return (
    <>
      <Container>
        <p className="trekkingTitle">
          Le Marche, una regione che unisce paesaggi mozzafiato e natura
          incontaminata, sono un vero paradiso per gli amanti del trekking.
          <tr /> Tra montagne imponenti, colline dolcemente ondulate e
          suggestive coste marine, i sentieri delle Marche offrono esperienze
          indimenticabili per tutti i livelli di escursionisti.
          <tr /> Dai cammini più tranquilli e panoramici, perfetti per famiglie
          e principianti, alle sfide più impegnative tra le cime degli
          Appennini, ogni percorso racconta una storia unica, fatta di
          tradizioni, storia e biodiversità. <tr />
          Esplora il fascino del Parco Nazionale dei Monti Sibillini, dove
          leggende e misteri si intrecciano con la bellezza dei paesaggi
          montani, o avventurati tra le Gole della Rossa e di Frasassi per
          un'esperienza immersiva nella natura più selvaggia.
          <tr /> I trekking costieri, come quelli sul Monte Conero, regalano
          panorami spettacolari che spaziano tra il verde della macchia
          mediterranea e l’azzurro cristallino dell’ Adriatico.
          <tr />
          Ogni passo è un’occasione per scoprire panorami incredibili,
          affascinanti borghi medievali e angoli di incontaminata bellezza.
        </p>
        <Row>
          <Col className="colSticky" md={3}>
            <h6 className="text-center">Filtri</h6>
            <input
              type="text"
              placeholder="Filtra percorsi per titolo"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="form-control text-center mt-3"
            />

            <form action="#" className="formSelect">
              <label htmlFor="difficulty">
                <CgDanger size={25} /> Difficoltà
              </label>
              <select
                className="form-select"
                name="difficulty"
                id="difficulty"
                value={searchQuery3}
                onChange={(event) => setSearchQuery3(event.target.value)}
              >
                <option value="">Seleziona una difficoltà</option>
                <option value="Facile">Facile</option>
                <option value="Media">Medio</option>
                <option value="Difficile">Difficile</option>
              </select>
            </form>

            <form action="#" className="formSelect">
              <label htmlFor="distance">
                <GiPathDistance size={25} /> Distanza
              </label>
              <select
                className="form-select"
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

            <form action="#" className="formSelect">
              <label htmlFor="duration">
                <CiClock1 size={25} /> Durata
              </label>
              <select
                className="form-select"
                name="distance"
                id="distance"
                value={searchQuery4}
                onChange={(event) => setSearchQuery4(event.target.value)}
              >
                <option value="">Seleziona una durata</option>

                <option value="3">3 ore</option>
                <option value="4">4 ore</option>
                <option value="5">5 ore</option>
                <option value="6">6 ore</option>
              </select>
            </form>
          </Col>
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center">
              <Spinner className="spinner" />
            </div>
          ) : (
            <Col className="col2" md={9}>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((trekkingRoute, i) => (
                  <React.Fragment key={i}>
                    <SingleRoute {...trekkingRoute} />
                  </React.Fragment>
                ))
              ) : (
                <>
                  <p className="text-center m-5">
                    <b>Nessun percorso trovato</b>
                  </p>
                </>
              )}
            </Col>
          )}
        </Row>
      </Container>
      {trekkingRoutes.length < 13 && (
        <Container className="text-center">
          <Button className="loadMoreButton" onClick={loadMoreRoutes}>
            Carica più percorsi
          </Button>
        </Container>
      )}
    </>
  );
};

export default AllTrekkingRoutes;
