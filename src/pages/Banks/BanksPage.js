import React from "react";

import "pages/styles.css";
import Notifications from "components/Notifications/Notifications";
import BanksLayout from "pages/Banks/BanksLayout.js";
import LoadingPage from 'pages/Error/LoadingPage';

function BanksPage({ ...bankAPI }) {
  if (bankAPI.data.length === 0) return <LoadingPage />
  return (
    <div className="banks-page-bd">
        <BanksLayout {...bankAPI} />
    </div>
  );
}
export default BanksPage;
