import React, { useState } from 'react'
const useMarker = () => {
    const [activeMarker, setActiveMarker] = useState('');
    return {
      activeMarker,
      setActiveMarker
    }
  }
export default useMarker;