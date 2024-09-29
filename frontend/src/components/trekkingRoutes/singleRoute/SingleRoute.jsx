import React from "react";
import { Container } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import "./SingleRoute.css"

const SingleRoute = (props) => {
  const { name, description, images, _id } = props;

  return (
    
      <>
        <Link to = {`/trekkingRoutes/${_id}`}>
            <Container className="single-route">
              <Card className="bg-dark text-white">
              <Card.Img src={images[2]} alt={name} />
              <Card.ImgOverlay>
                <Card.Title><h1>{name}</h1></Card.Title>
                <Card.Text>
                  <h6>{description}</h6>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
            </Container>
        </Link >
  
  <Container>
    <Card className="text-center">
    <Card.Header>{name}</Card.Header>
    <Card.Body>
      <Card.Title>{description}</Card.Title>
      <Card.Text>
        <Card.Img src={images[2]} alt={name} />
      </Card.Text>
      
    </Card.Body>
    <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  </Container>
      </>
    
    
  );
};

export default SingleRoute;
