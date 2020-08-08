import React from "react";

import "pages/styles.css";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import LeafletMap from "components/Map/LeafletMap";
import Banks from "pages/Banks/Banks";
import ScrollToTop from "utils/Scroll/SrollToTop";
import useMarker from "components/Hooks/useMarker";
import Footer from "components/Footer/Footer";

function BanksPage({api}) {
  // const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbanks`;
  // const { data, isLoading, hasError } = useOurApi(url, {});
  const marker = useMarker();

  if (api.isLoading) return <LoadingPage />;
  if (api.hasError) return <ErrorPage />;
  const banks = api.data.result.result;
  // const banks = Object.keys(data).length
  //   ? removeDuplicatesByKey("foodbank_id", data.result.result)
  //   : [];
  
  return (
    <div className="bd-main is-fullheight-with-navbar">
      {/* <ScrollToTop /> */}
      {/* <div className="container">  */}
      <div className="columns" style={{margin:0}}>
      <div className="column has-no-padding">
      <div className="bank-list">
          <div className="container">
          <Banks marker={marker} banks={banks} />
          </div>
        </div>
      </div>
      <div className="column has-no-padding">
        <div className="sticky">
          <LeafletMap marker={marker} banks={banks} />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

const removeDuplicatesByKey = (key, data) => {
  const obj = {};
  data.forEach((x) => {
    obj[x[key]] = x;
  });
  return Object.values(obj);
};

export default BanksPage;
