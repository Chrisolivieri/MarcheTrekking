import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const SingleRoute = (props) => {
  const { name, description, image, _id } = props;

  return (
    <Link to = {`/trekkingRoutes/${_id}`}>
        <Card className="bg-dark text-white">
        <Card.Img src={image} alt={name} />
        <Card.ImgOverlay>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Link >
    
  );
};

export default SingleRoute;
