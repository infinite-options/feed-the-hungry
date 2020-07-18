import React from "react";

import "pages/styles.css";
import LoadingPage from "pages/Error/LoadingPage";
import { useOurApi } from "API/useOurApi";
import ErrorPage from "pages/Error/ErrorPage";
import LeafletMap from "components/Map/LeafletMap";
import Banks from "pages/Banks/Banks";
import ScrollToTopOnMount from "utils/Scroll/ScrollToTopOnMount";
import useMarker from "components/Hooks/useMarker";

function BanksPage() {
    const url = `https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/foodbankinfo`;
    const { data, isLoading, hasError } = useOurApi(url, {});
    const marker = useMarker();

    if (isLoading) return <LoadingPage / > ;
    if (hasError) return <ErrorPage / > ;
    const banks = Object.keys(data).length ?
        removeDuplicatesByKey("foodbank_id", data.result.result) :
        [];
    return ( <
        div className = "banks-page-bd" >
        <
        ScrollToTopOnMount / > { /* <div className="columns" style={{marginTop:0}}> */ } <
        div className = "half-left" >
        <
        div className = "bank-list" >
        <
        Banks marker = { marker }
        banks = { banks }
        /> <
        /div> <
        /div> <
        div className = "half-right" >
        <
        div className = "sticky" >
        <
        LeafletMap marker = { marker }
        banks = { banks }
        /> <
        /div> <
        /div> { /* </div> */ } <
        /div>
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