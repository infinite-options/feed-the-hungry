import React from 'react';
import { Map, TileLayer, Marker, Popup, L, MapLayer } from 'react-leaflet';
import { geolocated } from 'react-geolocated';
import Icons from '../icons/Icons';

// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;
class LeafletMap extends React.Component {
    render(){
        const latitude = this.props.coords ? this.props.coords.latitude:  DEFAULT_LATITUDE;
        const longitude = this.props.coords ? this.props.coords.longitude: DEFAULT_LONGITUDE;
        const banks = this.props.banks;
        return (
            <Map center={[latitude, longitude]} zoom={13}> 
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* <Marker position={[latitude, longitude]}>
                <Popup>{lagitude}, {longitude}</Popup>
                </Marker> */}
                {
                    !this.props.coords ?
                    <div className="loading">Cannot load current location.</div>
                    :
                    <Marker position={[latitude, longitude]} icon={Icons.greenIcon}>
                        <Popup>{latitude},{longitude}</Popup>
                    </Marker>
                }            
              
            </Map>
        );
    }

}
export default geolocated({

    positionOptions: {
        enableHighAccuracy: true
    },
    watchPosition: true,
    userDecisionTimeout: 10000 // determines how much time (in miliseconds) we 
                               // give the user to make the decision whether to allow to share their location or not
})(LeafletMap);