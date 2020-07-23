import React from "react";

import "pages/styles.css";
import SignupForm from "components/Form/SignupForm";


function SignupSocial() {
    return (
        <div className="login-signup-page signup-background-image">
            <SignupForm signupStatus={"customer"} isSocial={true} />
        </div>
    );
}
export default SignupSocial;