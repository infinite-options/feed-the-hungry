import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, Redirect } from "react-router-dom";
import { Map, TileLayer, Marker, Popup, MapLayer } from "react-leaflet";
import { geolocated } from "react-geolocated";
import Icons from "components/Icons/Icons";
import "./style.css";
import BankAPI from 'API/BankAPI';
import L, { Point } from 'leaflet';
import Distance from 'utils/Distance';
// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;


class LeafletMap extends React.Component {
  render() {
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : DEFAULT_LATITUDE;
    const longitude = this.props.coords
      ? this.props.coords.longitude
      : DEFAULT_LONGITUDE;

    const banks = this.props.banks;
    let marker = this.props.marker;
    // const bounds = Array.isArray(banks) ? getLatLngBounds(BankAPI.GetCoordinates(banks)) : 
    //        L.latLngBounds([latitude, longitude], [banks.latitude, banks.longitude])
    return (
      <Map center={[latitude, longitude]} zoom={11}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {!this.props.coords ? (
          <div className="loading">Cannot load current location.</div>
        ) : (
          <Marker position={[latitude, longitude]} icon={Icons.MarkerIcon('red')}>
            <Popup>
              <div className="marker-popup">
                <p className="title has-font-14">Your Location</p>
                <p className="subtitle has-font-14">
                  {" "}
                  ({latitude},{longitude}){" "}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        {Array.isArray(banks) ? (
          banks.map((bank) => (
            <MapMarker
              userLocation={[latitude, longitude]}
              location={bank}
              marker={marker}
            />
          ))
        ) : (
          <MapMarker userLocation={[latitude, longitude]} location={banks} marker={marker}/>
        )}
      </Map>
    );
  }
}
const getLatLngBounds = (positions) => { 
  const latLngs = positions.map(position => {
  return L.latLng(position[0], position[1]);
  });
  const bounds = L.latLngBounds(latLngs);
  return bounds;
};

const MapMarker = ({ userLocation, location, marker }) => {
  const dist =
    Math.round(
      Distance(
        userLocation[0],
        userLocation[1],
        location.latitude,
        location.longitude,
        "M"
      ) * 10
    ) / 10;
  const [icon, setIcon] = useState(Icons.MarkerIcon("green"));
  useEffect(() => {
    if (marker.activeMarker === location.id)
      setIcon(Icons.MarkerIcon("black", 26, 42));
    else setIcon(Icons.MarkerIcon("green"));
  }, [marker.activeMarker]);

  const { path, url } = useRouteMatch();
  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={icon}
      onClick={() => marker.setActiveMarker(location.id)}
      onMouseOver={() => marker.setActiveMarker(location.id)}
      onMouseOut={() => marker.setActiveMarker(null)}
    >
      <Popup closeOnClick={true} closeButton={false} autoPanPadding={[50,50]}>
        <article class="media marker-popup">
          <figure class="media-left">
            <p class="image is-48x48">
              <img src={location.logo} />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <Link to={`${path}/${location.id}/products`}>
                  <strong>{location.name}</strong>
                </Link>{" "}
                <br></br>
                {location.address}
                <br></br>
                {dist} miles
              </p>
            </div>
          </div>
        </article>
      </Popup>
    </Marker>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  watchPosition: true,
  userDecisionTimeout: 10000, // determines how much time (in miliseconds) we
  // give the user to make the decision whether to allow to share their location or not
})(LeafletMap);
