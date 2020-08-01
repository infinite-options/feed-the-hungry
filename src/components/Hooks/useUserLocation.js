import React, { useEffect } from 'react';
import { usePosition } from 'use-position';
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;
export const useUserLocation = () => {
  const watch = false;
  const { latitude, longitude, error } = usePosition(watch, {enableHighAccuracy: true});
  const position = latitude && longitude ? [latitude, longitude]: [DEFAULT_LATITUDE, DEFAULT_LONGITUDE];

  return {
      position,
      error
  }
};