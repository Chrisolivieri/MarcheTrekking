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
      
    <h1>ciao</h1>
    <h1>{route.name}</h1>
      <Map />
    
    </>
  );
};
export default RouteDetails;
