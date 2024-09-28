import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet"; // Assicurati di importare Leaflet

export default function Map( {startLat, startLng, endLat, endLng}) {
  // coordinates for start and end
  

  // Custom hook per aggiungere il poligono o percorso alla mappa
  const AddRoute = () => {
    const map = useMap(); // Accedi all'istanza della mappa

    useEffect(() => {
      // Definisci il percorso come una linea
      const route = L.polyline([
        [startLat, startLng], // Punto di partenza
        [endLat, endLng],     // Punto di arrivo
      ], { color: 'blue' }).addTo(map); // Aggiungi colore alla linea

      // Pulizia al momento della disinstallazione del componente
      return () => {
        map.removeLayer(route);
      };
    }, [map]);

    return null; // Nessun JSX da rendere
  };

  return (
    <Container>
      <MapContainer center={[startLat, startLng]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[startLat, startLng]}>
          <Popup>Inizio del percorso: Rifugio del Monte Sibilla</Popup>
        </Marker>
        <Marker position={[endLat, endLng]}>
          <Popup>Fine del percorso: Cima del Monte Sibilla</Popup>
        </Marker>
        <AddRoute /> {/* Includi il custom hook per aggiungere il percorso */}
      </MapContainer>
    </Container>
  );
}
