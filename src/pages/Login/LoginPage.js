import React from "react";

import "pages/styles.css";
import FarmersMarket from 'assets/image/farmers-market.jpg';
import LoginForm from "components/Form/LoginForm";

function LoginPage() {
    return (
        <div className="login-signup-page">
            {/* Login image */}
            <figure className="image is-3by1 has-margin-bottom-0-5" style={{width: "100%"}}>
                <img alt="placeholder" src={FarmersMarket}></img>
            </figure>
            {/* NOTE: add prop values, like: isCustomer={true} */}
            <LoginForm loginStatus={"customer"} /> 
        </div>
    );
}

export default LoginPage;
