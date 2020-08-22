import React, { useState } from 'react'
//custom hook for marker on the map
const useMarker = () => {
    const [activeMarker, setActiveMarker] = useState('');
    return {
      activeMarker,
      setActiveMarker
    }
  }
export default useMarker;