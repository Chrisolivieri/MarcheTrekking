import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContextProvider";

const Welcome = () => {
  const { token, setToken } = useContext(UserContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let token = localStorage.getItem("token");

    // if no token in localStorage, try to get it from the URL
    if (!token) {
      token = searchParams.get("token");
      if (token) {
        // if the token is in the URL, store it in localStorage
        localStorage.setItem("token", token);
      }
      // remove the token from the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    // set the token in the context
    setToken(token);
  }, [searchParams]); // only run this effect when the searchParams change
  return (
    <>
      <Container className="welcome">
        <Row>
          <Col md={3}>
            <h1>Benvenuto in Marche Trekking</h1>
            <p>hadfiasdfihsdfasdfsadfsdfsdfsadfasdfasdf</p>
            <p>aisduhfasdfsajdfasdfas</p>
            <p>adndasfasdfasdfd</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
