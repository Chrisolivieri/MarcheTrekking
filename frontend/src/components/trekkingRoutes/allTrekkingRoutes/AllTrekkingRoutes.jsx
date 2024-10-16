import React, { useEffect, useState } from "react";
import { loadTrekkingRoutes } from "../../../data/Fetch";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import SingleRoute from "../singleRoute/SingleRoute";
import { CgDanger } from "react-icons/cg";
import { GiPathDistance } from "react-icons/gi";
import { CiClock1 } from "react-icons/ci";
import { GiMountainRoad } from "react-icons/gi";

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

    const durationMatch = String(route.duration)
      .toLowerCase()
      .includes(searchQuery4.toLowerCase());

    return titleMatch && distanceMatch && difficultyMatch && durationMatch;
  });

  return (
    <>
      <h1 className="trekkingTitle">
        <GiMountainRoad /> I nostri percorsi
      </h1>
      <Container>
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
            <div className="d-flex align-items-center justify-content-center"><Spinner className="spinner" /></div>
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
      {trekkingRoutes.length < 11 && (
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
