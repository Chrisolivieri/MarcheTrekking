import React, { useEffect, useState } from "react";
import { loadTrekkingRoutes } from "../../../data/Fetch";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SingleRoute from "../singleRoute/SingleRoute";

const AllTrekkingRoutes = () => {
  const [trekkingRoutes, setTrekkingRoutes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrekkingRoutes = async () => {
      const newRoutes = await loadTrekkingRoutes(page);
      setTrekkingRoutes((prevRoutes) => [...prevRoutes, ...newRoutes]);
    };

    fetchTrekkingRoutes();
  }, [page]);

  const loadMoreRoutes = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {trekkingRoutes.map((trekkingRoute, i) => (
    <Container key={i} >
    <Row>
        
        {i % 2 === 0 ? (
            
            <>
                <Col md={6} style={{ marginTop: "2rem" }}>
                    <SingleRoute {...trekkingRoute} />
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{trekkingRoute.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {trekkingRoute.description}
                            </Card.Subtitle>
                            <Card.Text>
                                {}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </>
        ) : (
           
            <>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{trekkingRoute.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {trekkingRoute.description}
                            </Card.Subtitle>
                            <Card.Text>
                                {}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} style={{ marginTop: "2rem" }}>
                    <SingleRoute {...trekkingRoute} />
                </Col>
            </>
        )}
    </Row>
</Container>
))}

      <Button onClick={loadMoreRoutes}>Carica più percorsi</Button>
    </>
  );
};

export default AllTrekkingRoutes;
