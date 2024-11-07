import React, { useContext, useEffect, useState } from "react";
import { addFavorite, loadTrekkingRoute } from "../../../../data/Fetch.js";
import { useParams } from "react-router-dom";
import "./routeDetails.css";
import Map from "../../map/Map.jsx";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import CommentsSection from "../commentSection/CommentsSection.jsx";
import { UserContext } from "../../../../context/UserContextProvider.jsx";
import Carousel from "react-bootstrap/Carousel";
import { CiClock1 } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Weather from "../../weather/Weather.jsx";

const RouteDetails = () => {
  const params = useParams();
  const [route, setRoute] = useState({});
  const { userInfo } = useContext(UserContext);
  const { token } = useContext(UserContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const details = async () => {
      try {
        const response = await loadTrekkingRoute(params.id);
        if (response) {
          setRoute(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    details();
  }, [params]);

  const handleAddFavorite = async () => {
    try {
      const response = await addFavorite(userInfo._id, params.id);
      setMessage("✔");
    } catch (error) {
      console.error("Errore durante l'aggiunta ai preferiti:", error);
    }
  };

  return (
    <>
      <Container className="containerDetails">
        <h2 className="titleDetails">
          {route.name ? route.name : <Spinner animation="border" />}
        </h2>

        <p className="text-center">{route.description}</p>

        {route.start && route.end ? (
          <>
            <Carousel className="carousel" data-bs-theme="light">
              <Carousel.Item interval={10000}>
                <img
                  className="carousel-img"
                  src={route.images[0]}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={10000}>
                <img
                  className="carousel-img"
                  src={route.images[1]}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={10000}>
                <img
                  className="carousel-img"
                  src={route.images[2]}
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={10000}>
                <img
                  className="carousel-img"
                  src={route.images[3]}
                  alt="Fourth slide"
                />
              </Carousel.Item>
            </Carousel>

            <div className="infoCard2">
              <span>
                <CiClock1 /> {route.duration} ore
              </span>
              <span>
                <GiPathDistance />
                 {route.distance} km circa
              </span>
              <span>
                <FaArrowUp />
                <FaArrowDown /> {route.heightDifference} m
              </span>
              {token && (
                <button className="buttonSave" onClick={handleAddFavorite}>
                  <FaBookmark /> Salva{" "}
                  <span className="message">{message}</span>
                </button>
              )}
            </div>
            
              <Container>
                <Row>
                  <Col md={7}>
                    <Map
                      start={route.start}
                      end={route.end}
                      coordinates={route.coordinates}
                    />
                  </Col>
                  <Col md={5}><Weather start={route.start} /></Col>
                </Row>
              </Container>
            
          </>
        ) : (
          <p>Loading map...</p>
        )}

        <CommentsSection />
      </Container>
    </>
  );
};
export default RouteDetails;
