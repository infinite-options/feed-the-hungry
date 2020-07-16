import React, { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch, Redirect } from "react-router-dom";
import { Map, TileLayer, Marker, Popup, MapLayer } from "react-leaflet";
import { geolocated } from "react-geolocated";
import Icons from "components/Icons/Icons";
import "./style.css";
import L, { Point } from 'leaflet';
import Distance from 'utils/Distance';
import { OrderContext } from "components/Context/OrderContext";
import LoadingPage from "pages/Error/LoadingPage";
// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;


function LeafletMap({marker, banks}) {
  // render() {
    // const latitude = this.props.coords
    //   ? this.props.coords.latitude
    //   : DEFAULT_LATITUDE;
    // const longitude = this.props.coords
    //   ? this.props.coords.longitude
    //   : DEFAULT_LONGITUDE;
    const context = useContext(OrderContext);
    const position = context.position;
    console.log(position);
    // const banks = this.props.banks;
    // const marker = this.props.marker;
    return (
      <Map center={position} zoom={11}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {!position ? (
          <div className="loading">Cannot load current location.</div>
        ) : (
          <Marker position={position} icon={Icons.MarkerIcon('red')}>
            <Popup>
              <div className="marker-popup">
                <p className="title has-font-14">Your Location</p>
                <p className="subtitle has-font-14">
                  {" "}
                  ({position[0]},{position[1]}){" "}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        {Array.isArray(banks) ? (
          banks.map((bank) => (
            <MapMarker
              key={bank.foodbank_id}
              userLocation={position}
              bankLocation={bank}
              marker={marker}
            />
          ))
        ) : (
          <MapMarker userLocation={position} bankLocation={banks} marker={marker}/>
        )}
      </Map>
    );
  // }
}

const MapMarker = ({ userLocation, bankLocation, marker }) => {
  const [icon, setIcon] = useState(Icons.MarkerIcon("green"));
  const { path, url } = useRouteMatch();

  useEffect(() => {
    if (marker.activeMarker === bankLocation.foodbank_id)
      setIcon(Icons.MarkerIcon("black", 26, 42));
    else setIcon(Icons.MarkerIcon("green"));
  }, [marker.activeMarker]);

  const dist =
  Math.round(
    Distance(
      userLocation[0],
      userLocation[1],
      bankLocation.fb_latitude,
      bankLocation.fb_longitude,
      "M"
    ) * 10
  ) / 10;
  
  return (
    <Marker
      position={[bankLocation.fb_latitude, bankLocation.fb_longitude]}
      icon={icon}
      onClick={() => marker.setActiveMarker(bankLocation.foodbank_id)}
      onMouseOver={() => marker.setActiveMarker(bankLocation.foodbank_id)}
      onMouseOut={() => marker.setActiveMarker(null)}
    >
      <Popup closeOnClick={true} closeButton={false} autoPanPadding={[50,50]}>
        <article className="media marker-popup">
          <figure className="media-left">
            <p className="image is-48x48">
              <img src={bankLocation.fb_logo} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <Link to={`${path}/${bankLocation.foodbank_id}/products`}>
                  <strong>{bankLocation.fb_name}</strong>
                </Link>
                <br></br>
                {bankLocation.foodbank_address}
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

// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: true,
//   },
//   watchPosition: true,
//   userDecisionTimeout: 10000, // determines how much time (in miliseconds) we
//   // give the user to make the decision whether to allow to share their location or not
// })(LeafletMap);
export default LeafletMap;