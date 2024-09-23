import React from "react";
import HomePage from "../homePage/HomePage";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const Welcome = () => {
  return (
    <>
      <Container className="welcome">
        <Row>
          <Col md={4}>
            <h1>Benvenuto in Marche Trekking</h1>
            <p>hadfiasdfihsdfasdfsadfsdfsdfsadfasdfasdf</p>
            <p>aisduhfasdfsajdfasdfas</p>
            <p>adndasfasdfasdfd</p>
          </Col>
          <Col md={4}>
            <Container as ={Link} to="/trekkingRoutes">vai ai sentieri</Container>
          </Col>
          <Col md={4}>
            <Container as ={Link} to="/registerLogin">registrati</Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
