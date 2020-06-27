import React, { useState, useEffect } from 'react';
import { geolocated } from "react-geolocated";
// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;

export const useCoordinates = () => {
    const [ location, setLocation] = useState({latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE});
    const [ error, setError ] = useState(null);
    const onChange = ({coords}) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      };
      const onError = (error) => {
        setError(error.message);
      };

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
          setError('Geolocation is not supported');
          return;
        }
        const watcher = geo.watchPosition(onChange, onError);
        return () => geo.clearWatch(watcher);
    },[])

    return { ...location, error}

}

// export default geolocated({
//     positionOptions: {
//       enableHighAccuracy: true,
//     },
//     watchPosition: true,
//     userDecisionTimeout: 10000, // determines how much time (in miliseconds) we
//     // give the user to make the decision whether to allow to share their location or not
//   })(useCoordinates);