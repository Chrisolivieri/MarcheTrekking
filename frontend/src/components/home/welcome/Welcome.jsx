import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContextProvider";
import "./Welcome.css";

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
        <img src="../../assets/logo.png" className="fadeIn"></img>
        <div className="background">
        </div>
      </Container>
      <Container className="fadeInBottom">
        <p className="textFadeIn">
          Marche Trekking propone una vasta gamma di percorsi di trekking nelle
          splendide terre marchigiane, ideali per escursionisti di tutti i
          livelli.
        </p>
        <p className="textFadeIn">
          Dalle cime degli Appennini ai sentieri costieri del Conero, esplora
          paesaggi naturali incontaminati, antichi borghi, boschi rigogliosi e
          panorami mozzafiato.
        </p>
        <p className="textFadeIn">
          Che tu sia un appassionato di trekking o un principiante in cerca di
          avventura, Marche Trekking ti guida alla scoperta delle meraviglie
          nascoste della regione, per un'esperienza immersiva tra natura e
          tradizione.
        </p>
      </Container>
    </>
  );
};

export default Welcome;
