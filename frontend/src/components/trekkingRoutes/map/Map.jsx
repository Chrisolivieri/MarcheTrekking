import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";


export default function Map({ start, end, coordinates }) {
  const trekkingPoints =
    coordinates && coordinates.length > 0 ? coordinates : []; // route coordinates

  const customMarkerStartIcon = L.icon({
    iconUrl: "https://i.ibb.co/41Fkm80/start-i4gxfi46poz3-512.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const customMarkerEndIcon = L.icon({
    iconUrl: "https://i.ibb.co/jJKgHZt/finish-9z4a2ijikdi0-512.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  

  // add points to the map
  const AddRoute = ({ points }) => {
    // add props points to the map
    const map = useMap(); 

    useEffect(() => {
      // define the polyline layer
      const route = L.polyline(points, { color: "blue" }).addTo(map); // Aggiungi colore alla linea

      // zoom to the route
      map.fitBounds(route.getBounds());

      // remove the polyline layer
      return () => {
        map.removeLayer(route);
      };
    }, [map, points]);

    return null; 
  };

  return (
    <Container>
      <MapContainer center={start} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={start} icon={customMarkerStartIcon} >
          <Popup>Inizio del percorso: {start}</Popup>
        </Marker>
        <Marker position={end} icon={customMarkerEndIcon}>
          <Popup>Fine del percorso: {end}</Popup>
          
        </Marker>
        <AddRoute points={trekkingPoints} />
      </MapContainer>
    </Container>
  );
}
