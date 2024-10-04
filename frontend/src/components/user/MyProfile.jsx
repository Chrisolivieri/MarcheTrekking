import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { deleteFavorite, getAllFavorites } from "../../data/Fetch";
import { Col, Container, Row, Image, Button } from "react-bootstrap";

const MyProfile = () => {
  const { userInfo } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  

  const handleDeleteFavorite = async (trekkingRouteId) => {

  try {
    const response = await deleteFavorite(userInfo._id, trekkingRouteId);
    setFavorites(favorites.filter(favorite => favorite.trekkingRoute._id !== trekkingRouteId)); // Remove the deleted favorite from the state
  } catch (error) {
    console.log(error);
  }
};

  

  useEffect(() => {
    const allFavorites = async () => {
      try {
        const response = await getAllFavorites(userInfo._id);
        setFavorites(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    allFavorites();
  }, [userInfo]);

  return (
    <>
      <h1>{userInfo?.name}</h1>
      <h2>{userInfo?.surname}</h2>
      <img src={userInfo?.avatar}></img>
      <h3>{userInfo?.role}</h3>
      <h3>{userInfo?.email}</h3>

      {favorites.map((favorite, i) => (
        <Container key={i}>
          <Row>
            <Col md={12}>
              <h1>{favorite.trekkingRoute.name}</h1>
              <Image src={favorite.trekkingRoute.images[3]}></Image>
              <h3>{favorite.difficulty}</h3>
              <h3>{favorite.length}</h3>
              <h3>{favorite.description}</h3>
              <Button onClick={() => handleDeleteFavorite(favorite.trekkingRoute._id)}>elimina</Button>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default MyProfile;
