import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { deleteFavorite, getAllFavorites, updateUserAvatar } from "../../data/Fetch";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MyProfile.css"

const MyProfile = () => {
  const { userInfo } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);

  

  const handleDeleteFavorite = async (trekkingRouteId) => {

  try {
    const response = await deleteFavorite(userInfo._id, trekkingRouteId);
    setFavorites(favorites.filter(favorite => favorite.trekkingRoute._id !== trekkingRouteId)); // Remove the deleted favorite from the state
  } catch (error) {
    console.log(error);
  }
};

const handleChangeAvatar = (event) => {
  setAvatarFile(event.target.files[0]);
};

const uploadAvatar = async () => {
  try {
    const response = await updateUserAvatar(avatarFile, userInfo._id);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

  

  useEffect(() => {
    const allFavorites = async () => {
      try {
        const response = await getAllFavorites(userInfo._id);
        setFavorites(response);
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
      <img className="avatarProfile" src={userInfo?.avatar}></img>

      <input type="file" onChange={handleChangeAvatar} />
      <Button onClick={uploadAvatar}>upload</Button>
      <h3>{userInfo?.role}</h3>
      <h3>{userInfo?.email}</h3>

      {favorites.map((favorite, i) => (
        <Container key={i}>
          <Row>
            <Col md={12}>
              <Link to = {`/trekkingRoutes/${favorite.trekkingRoute._id}`}>
                <h1>{favorite.trekkingRoute.name}</h1>
                <Image src={favorite.trekkingRoute.images[3]}></Image>
                <h3>{favorite.difficulty}</h3>
                <h3>{favorite.length}</h3>
                <h3>{favorite.description}</h3>
              </Link>
              <Button onClick={() => handleDeleteFavorite(favorite.trekkingRoute._id)}>elimina</Button>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default MyProfile;
