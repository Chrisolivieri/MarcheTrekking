import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import {
  deleteFavorite,
  getAllFavorites,
  updateUserAvatar,
} from "../../data/Fetch";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./MyProfile.css";

const MyProfile = () => {
  const { userInfo } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDeleteFavorite = async (trekkingRouteId) => {
    try {
      await deleteFavorite(userInfo._id, trekkingRouteId);
      setFavorites(
        favorites.filter(
          (favorite) => favorite.trekkingRoute._id !== trekkingRouteId
        )
      );
      setAlertMessage("Preferito eliminato con successo!");
    } catch (error) {
      console.log(error);
      setAlertMessage("Errore durante l'eliminazione del preferito.");
    }
  };

  const handleChangeAvatar = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const uploadAvatar = async () => {
    try {
      await updateUserAvatar(avatarFile, userInfo._id);
      setAlertMessage("Avatar aggiornato con successo!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setAlertMessage("Errore durante l'aggiornamento dell'avatar.");
    }
  };

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
      <Container className="profileContainer mt-5">
        <div className="d-flex justify-content-center">
          <h1 className="nameProfile">{userInfo?.name} </h1>
          <h1 className="surnameProfile"> {userInfo?.surname}</h1>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <Image
            className="avatarProfile"
            src={userInfo?.avatar}
            roundedCircle
          />
        </div>
        <div className="changeAvatar text-center">
          <input type="file" onChange={handleChangeAvatar} />
          <Button className="mt-2" onClick={uploadAvatar}>
            Cambia immagine del profilo
          </Button>
        </div>

        {alertMessage && (
          <Alert
            className="mt-4"
            variant="info"
            onClose={() => setAlertMessage("")}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}

        <h2 className="mt-5">
          <FaHeart /> Preferiti
        </h2>
        {favorites.length > 0 ? (
          favorites.map((favorite, i) => (
            <Card className="favoriteContainer mb-3" key={i}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Link
                      to={`/trekkingRoutes/${favorite.trekkingRoute._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Card.Title>{favorite.trekkingRoute.name}</Card.Title>
                      <Image  src={favorite.trekkingRoute.images[3]} fluid />
                      <Card.Subtitle className="mt-2">
                        Difficoltà: {favorite.trekkingRoute.difficulty}
                      </Card.Subtitle>
                      <Card.Subtitle className="mt-1">
                        Lunghezza: {favorite.trekkingRoute.distance} km
                      </Card.Subtitle>
                      <Card.Text className="mt-1">
                        {favorite.description}
                      </Card.Text>
                    </Link>
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDeleteFavorite(favorite.trekkingRoute._id)
                      }
                    >
                     <MdDelete /> Elimina
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="warning">Nessun preferito trovato.</Alert>
        )}
      </Container>
    </>
  );
};

export default MyProfile;
