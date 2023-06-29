#### Free Geo Location

Install the leaflet package, which is a popular library for working with maps in React:

bash
npm install leaflet
Create a new component called LocationComponent.js:

jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LocationComponent = ({ latitude, longitude }) => {
const [address, setAddress] = useState('');

useEffect(() => {
const fetchData = async () => {
try {
const response = await fetch(
`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
);
const data = await response.json();
setAddress(data.display_name);
} catch (error) {
console.error(error);
}
};

    fetchData();

}, [latitude, longitude]);

return (

<div>
<h2>Location Details</h2>
<p>Latitude: {latitude}</p>
<p>Longitude: {longitude}</p>
<p>Address: {address}</p>
<MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px' }}>
<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
<Marker position={[latitude, longitude]}>
<Popup>
Latitude: {latitude}
<br />
Longitude: {longitude}
<br />
Address: {address}
</Popup>
</Marker>
</MapContainer>
</div>
);
};

export default LocationComponent;
