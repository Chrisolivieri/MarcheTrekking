import React, { useEffect, useState } from "react";
import { loadTrekkingRoute } from "../../../../data/Fetch.js";
import { useParams } from "react-router-dom";
import "./routeDetails.css"
import Map from "../../map/Map.jsx";
import { Spinner } from "react-bootstrap";

const RouteDetails = () => {
  const params = useParams();
  const [route, setRoute] = useState({});

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

  return (
    <>
    <h1>{route.name ? route.name : <Spinner animation="border" />}</h1>
    {route.start && route.end ? (
      <Map start={route.start} end={route.end} coordinates={route.coordinates}  />
    ) : (
      <p>Loading map...</p>
    )}
  </>
  );
};
export default RouteDetails;
