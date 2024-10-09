import React, { useContext, useEffect, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContextProvider";
import "./Welcome.css";
const Welcome = () => {
  const { token, setToken } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const ref = useRef(null);
  const boxRef = useRef(null);
  const boxRef2 = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // unobserve the element when it becomes visible
          }
        });
      },
      { threshold: 0.1 } // set the threshold to 10%
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
      boxRef.current.classList.add("hidden"); // add the hidden class to the box
    }

    // unobserve the element when the component unmounts
    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show2");
            observer.unobserve(entry.target); // unobserve the element when it becomes visible
          }
        });
      },
      { threshold: 0.1 } // set the threshold to 10%
    );

    if (boxRef2.current) {
      observer.observe(boxRef2.current);
      boxRef2.current.classList.add("hidden2"); // add the hidden class to the box
    }

    // unobserve the element when the component unmounts
    return () => {
      if (boxRef2.current) {
        observer.unobserve(boxRef2.current);
      }
    };
  }, []);

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
      <Container className="welcome" ref={ref}>
        <img src="../../assets/logo.png" className="fadeIn"></img>
        <div className="background"></div>
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

      <Container className="boxes">
        <Container className="box-container" ref={boxRef}>
          <Row>
            <Col md={6}>
              <img className="view" src="../../assets/paesaggio1.webp" alt="" />
            </Col>
            <Col md={6} className="d-flex align-items-center textBox">
              <p className="text">
                Marche Trekking offre percorsi di trekking unici nelle Marche,
                alla scoperta di paesaggi naturali mozzafiato, borghi storici e
                itinerari adatti a tutti i livelli. <br></br>Avventura e natura a
                portata di passo!
              </p>
            </Col>
          </Row>
        </Container>
  
        <Container className="box-container" ref={boxRef2}>
          <Row>
            <Col md={6} className="d-flex align-items-center">
              <p className="text">
                Visita il nostro sito e scopri consigli, guide e curiosità sul
                mondo del trekking.<br></br> Trova ispirazione, preparati al
                meglio per le tue avventure e unisciti alla nostra comunità di
                appassionati escursionisti
              </p>
            </Col>
            <Col md={6}>
              <img className="view" src="../../assets/paesaggio2.jpg" alt="" />
            </Col>
          </Row>
        </Container>
      </Container>

      <div className="d-flex justify-content-center align-items-center flex-column buttonContainer">
        <p className="text">
          Che aspetti? Vieni a scoprire tutti i nostri percorsi!
        </p>

        <Link to="/trekkingRoutes">
          <button className="buttonWelcome">
            <span class="front text"> Scopri</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Welcome;
