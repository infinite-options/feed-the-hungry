import React from "react";

import "pages/styles.css";
import Notifications from "components/Notifications/Notifications";
import BanksLayout from "pages/Banks/BanksLayout.js";

function BanksPage({ list }) {
  return (
    <div className="banks-page-bd">
      {list.length > 0 ? (
        <BanksLayout banks={list} />
      ) : (
        Notifications.Warning("Loading Data...")
      )}
    </div>
  );
}
export default BanksPage;
