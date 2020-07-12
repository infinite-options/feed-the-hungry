import React from "react";

import "pages/styles.css";
import SignupForm from "components/Form/SignupForm";

function SignupPage(props) {
    return (
        <div className="login-signup-page signup-background-image">
            <p className="subtitle is-1 has-margin-top-1 has-text-centered has-text-black">Sign Up</p>
            <SignupForm />
        </div>
    );
}

export default SignupPage;
