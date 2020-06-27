import React from "react";

import "pages/styles.css";
import Notifications from "components/Notifications/Notifications";
import BanksLayout from "pages/Banks/BanksLayout.js";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import LeafletMap from "components/Map/LeafletMap";
import Banks from "pages/Banks/Banks";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import useMarker from 'components/Hooks/useMarker';

function BanksPage() {
  console.log("banks page");
  const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfo`;
  const { data, isLoading, hasError } = useOurApi(url, {});
  const banks = Object.keys(data).length ? removeDuplicatesByKey('foodbank_id', data.result.result) : [];
  const marker = useMarker();

  if (isLoading){ console.log("loading"); return <LoadingPage />;}
  if (hasError) return <ErrorPage />;
  return (
    <div className="banks-page-bd">
      <ScrollToTopOnMount />
      <div className="columns">
        <div className="column is-6">
          <div className="bank-list">
            <Banks marker={marker} banks={banks} />
          </div>
        </div>
        <div className="column is-6 has-no-padding has-shadow">
          <div className="sticky">
            <LeafletMap marker={marker} banks={banks} />
          </div>
        </div>
      </div>
    </div>
  );
}
const removeDuplicatesByKey = (key, data) => {
  const obj ={}
  data.forEach(x => {
      obj[x[key]] = x;
  })
  return Object.values(obj);
}
export default BanksPage;
