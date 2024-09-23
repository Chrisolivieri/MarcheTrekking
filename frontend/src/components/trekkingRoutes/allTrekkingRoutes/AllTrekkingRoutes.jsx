import React, { useEffect, useState } from "react";
import { loadTrekkingRoutes } from "../../../data/Fetch";
import { Col, Row } from "react-bootstrap";
import SingleRoute from "../singleRoute/SingleRoute";

const AllTrekkingRoutes = () => {
  const [trekkingRoutes, setTrekkingRoutes] = useState([]);

  useEffect(() => {
    (async () => {
      const trekkingRoutes = await loadTrekkingRoutes();
      setTrekkingRoutes(trekkingRoutes);
    })();
  }, []);

return (
    <Row>
      {trekkingRoutes.map((trekkingRoutes, i) => (
        <Col
          key={`item-${i}`}
          md={12}
          style={{
            marginBottom: 50,
          }}
        >
          <SingleRoute key = {trekkingRoutes.name} {...trekkingRoutes} />
        </Col>
      ))}
    </Row>
)

};



export default AllTrekkingRoutes;
