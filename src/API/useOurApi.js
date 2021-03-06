import { useEffect, useState } from "react";
import axios from 'axios';
/*  Example
    initialUrl: "/_api/jobs"
    initialData: [] //usually empty array or object
*/
// use this for fetching any api
export const useOurApi = (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fetchedData, setFetchedData] = useState({});

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
        try {
          const response = await fetch(url);
          const responseData = await response.json();
          console.log("fetch data");
          if (!unmounted) setFetchedData(responseData); // return value is an array
        } catch (err) {
          setHasError(true);
        } finally {
            console.log("loading done");
          setIsLoading(false);
        }
      };
    fetchData();

    return () => {
      unmounted = true;
    };
  }, [url]);

  const getBankBy = (key, value) => {
    return (fetchedData.result.result.find(obj => {
        return obj[key] === value;
    }));
}
  return { isLoading, hasError, setUrl, data: fetchedData, getBankBy };
};