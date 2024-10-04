import React, { useContext, useEffect, useState } from "react";
import { addFavorite, loadTrekkingRoute } from "../../../../data/Fetch.js";
import { useParams } from "react-router-dom";
import "./routeDetails.css";
import Map from "../../map/Map.jsx";
import { Spinner } from "react-bootstrap";
import CommentsSection from "../commentSection/CommentsSection.jsx";
import { UserContext } from "../../../../context/UserContextProvider.jsx";

const RouteDetails = () => {
  const params = useParams();
  const [route, setRoute] = useState({});
  const { userInfo } = useContext(UserContext);

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
      console.log(userInfo._id, params.id);
      console.log("Aggiunto ai preferiti:", response);
    } catch (error) {
      console.error("Errore durante l'aggiunta ai preferiti:", error);
    }
  };

  return (
    <>
      <h1>{route.name ? route.name : <Spinner animation="border" />}</h1>
      <button onClick={handleAddFavorite}>Aggiungi ai Preferiti</button>
      {route.start && route.end ? (
        <Map
          start={route.start}
          end={route.end}
          coordinates={route.coordinates}
        />
      ) : (
        <p>Loading map...</p>
      )}
      <CommentsSection />
    </>
  );
};
export default RouteDetails;
