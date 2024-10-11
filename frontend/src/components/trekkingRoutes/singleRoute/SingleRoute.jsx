import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./SingleRoute.css";
import { CiClock1 } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { UserContext } from "../../../context/UserContextProvider";
import { addFavorite } from "../../../data/Fetch";
const SingleRoute = (props) => {
  const {
    _id: idTrekkingRoute,
    name,
    description,
    images,
    _id,
    duration,
    distance,
    heightDifference,
    difficulty,
  } = props;

  const { userInfo } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const {token} = useContext(UserContext)

  const handleAddFavorite = async () => {
    try {
      const response = await addFavorite(userInfo._id, idTrekkingRoute);
      setMessage("✔");
    } catch (error) {
      console.error("Errore durante l'aggiunta ai preferiti:", error);
    }
  };
  return (
    <>
      <Card className="cardContainer">
        <div className="boxContainer1">
          <Card.Img className="card-img" src={images[1]} />
          <div className="boxContainer2">
            <Card.Img className="card-img2" src={images[0]} />
            <Card.Img className="card-img3" src={images[2]} />
          </div>
        </div>
        <Card.Body>
          <Card.Title>
            <h2>{name}</h2>
          </Card.Title>
        </Card.Body>
        <hr className="hr" />

        <div className="infoCard">
          <span>
            <CiClock1 /> <b>{duration} ore</b>
          </span>
          <span>
            <GiPathDistance />
            <b> {distance} km circa</b>
          </span>
          <span>
            <b>
              <FaArrowUp />
              <FaArrowDown />
              {heightDifference} m
            </b>
          </span>
          {token &&<button className="buttonSave" onClick={handleAddFavorite}>
          <FaBookmark /> <b>Salva</b> <span className="message">{message}</span>
          </button>}
        </div>

        <div className="mt-3">
          <hr className="hr" />
        </div>

        <Card.Body className="d-flex justify-content-around">
          
          <span>
            <b>
              Difficoltà: <span className="difficulty">{difficulty}</span>
            </b>
          </span>
        </Card.Body>
        <Card.Body>
          <Card.Text className="description">
            <p>{description}</p>
          </Card.Text>
        </Card.Body>
        <hr className="hr" />

        <Card.Body className="text-center">
          <Link to={`/trekkingRoutes/${_id}`}>
            <button className="buttonDetails">
              Dettagli <FaAngleRight />
            </button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleRoute;
