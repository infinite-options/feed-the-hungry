import React, {useContext} from "react";

import "pages/styles.css";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import LeafletMap from "components/Map/LeafletMap";
import Banks from "pages/Banks/Banks";
import ScrollToTop from "utils/Scroll/SrollToTop";
import useMarker from "components/Hooks/useMarker";
import Footer from "components/Footer/Footer";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderContext } from "components/Context/OrderContext";
import StateAPI from 'API/StateAPI';
import Select from 'components/Form/Select';
import useField from "components/Hooks/useField";
import FoodBag from "assets/image/food.jpg";

function BanksPage() {

  const context = useContext(OrderContext);  // get food banks info from api
  const marker = useMarker(); // active marker on map that is being hovered

  if (context.api.isLoading) return <LoadingPage />;
  if (context.api.hasError) return <ErrorPage />;
  const banks = context.api.data.result.result;
  
  return (
    <div className="bd-main is-fullheight-with-navbar">
      <ScrollToTop />
      <div className="search-container">
      <div className="field has-addons">
      <p className="control has-icons-left" style={{borderRight:'1px solid #e6e6e6'}}>
    <input className="input is-medium" type="text" placeholder="Pantry Name or keyword" />
    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={Icons.faSearch}/>
    </span>
  </p>

      <p className="control has-icons-left">
    <input className="input is-medium" type="text" placeholder="Enter location" />
    <span className="icon is-small is-left">
      <FontAwesomeIcon icon={Icons.faMapMarkerAlt}/>
    </span>
  </p>
  <p className="control">
    <a className="button is-medium">
      Search
    </a>
  </p>
      </div>
      </div>
      <div className="columns has-no-margin">
      <div className="column is-7 has-no-padding">
      <div className="bank-list">
          <div className="container">
          <Banks marker={marker} banks={banks} />
          </div>
        </div>
      </div>
      <div className="column is-5 has-no-padding">
        <div className="sticky">
          <LeafletMap marker={marker} banks={banks} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default BanksPage;
