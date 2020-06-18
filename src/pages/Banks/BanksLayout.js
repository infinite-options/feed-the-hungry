import React, {useState, useEffect} from "react";
import LeafletMap from "components/Map/LeafletMap";
import Banks from "pages/Banks/Banks";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import useMarker from 'components/Hooks/useMarker';
function BanksLayout({ banks }) {
  const marker = useMarker();
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


export default BanksLayout;
