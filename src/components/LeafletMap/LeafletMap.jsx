import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export const LeafletMap = ({ position = [0, 0], zoom = 3, onPositionChange }) => {
  return (
    <Map
      id="map"
      center={position}
      zoom={zoom}
      style={{ width: 300, height: 300 }}
      onclick={(e) => onPositionChange(e.latlng)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} autoPan>
        <Popup>
          <span>Latitude: {position[0]}</span>
          <br />
          <span>Longitude: {position[1]}</span>
        </Popup>
      </Marker>
    </Map>
  );
};
