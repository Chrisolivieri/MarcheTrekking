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
              
              <img  src={images[2]} alt={name} />
              
            
            </Container>
        </Link >

      </>
    
    
  );
};

export default SingleRoute;
