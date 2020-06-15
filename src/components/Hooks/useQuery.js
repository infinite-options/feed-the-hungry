import React from 'react';
import { useLocation } from 'react-router-dom';

// const query = useQuery();
// then do query.get() to get search params 
// for example: products?type=vegetarian
// query.get("type") will return "vegetarian"
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
export default useQuery;