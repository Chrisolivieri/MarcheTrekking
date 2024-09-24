import React, { useEffect, useState } from "react";
import { loadTrekkingRoute } from "../../../../data/Fetch";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

const RouteDetails = () => {
  const params = useParams();
  const [route, setRoute] = useState({})

  useEffect(() => {
    const details = async () => {
      try {
        const response = await loadTrekkingRoute(params.id);
        if(response) {
            setRoute(response)
        }
      } catch (error) {
        console.log(error);
      }
    };

    details();
  }, [params]);
 
  return (
    <>
    <Container>
        <h1>{route.name}</h1>
        <h2>{route.description}</h2>
        <h3>{route.duration}</h3>
        <img src={route.image} alt="" />
        <h4>{route.position && route.position[0]}</h4>
        <h4>{route.position && route.position[1]}</h4>
    </Container>
    </>
  )
};
export default RouteDetails;
