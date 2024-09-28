import React, { useEffect, useState } from "react";
import { loadTrekkingRoute } from "../../../../data/Fetch.js";
import { useParams } from "react-router-dom";
import "./routeDetails.css"
import Map from "../../map/Map.jsx";

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
    <h1>{route.name ? route.name : "Loading..."}</h1>
    {route.startLat && route.endLat && route.startLng && route.endLng ? (
      <Map startLat={route.startLat} endLat={route.endLat} startLng={route.startLng} endLng={route.endLng}  />
    ) : (
      <p>Loading map...</p>
    )}
  </>
  );
};
export default RouteDetails;
