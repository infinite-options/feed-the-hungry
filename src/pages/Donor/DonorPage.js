import React, { useState } from "react";

import "pages/styles.css";
import LoginForm from "components/Form/LoginForm";
import SignupForm from "components/Form/SignupForm";
import QuickDonation from "./QuickDonation";

function DonorPage() {
    const [showLoginForm, setShowLoginForm] = useState(true);

    return(
        <div className="login-signup-page has-text-centered">
            <p className="subtitle is-2 has-text-black">Donate Now!</p>
            <div className="columns" style={{width: "100%", margin: "auto"}}>
                <div className="column is-half">
                <p className="subtitle is-3 has-text-black">Quick Donation</p>
                    <QuickDonation />
                </div>
                <div className="column is-half">
                    {showLoginForm ? (
                        <React.Fragment>
                            <p className="subtitle is-3 has-text-black">Login now!</p>
                            <p>New to Feed the Hungry? <a href="#" onClick={() => setShowLoginForm(!showLoginForm)}><u>Create an account</u></a>.</p>
                            <LoginForm loginStatus={"donor"} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p className="subtitle is-3 has-text-black">Sign up now!</p>
                            <p>Already have an account? <a href="#" onClick={() => setShowLoginForm(!showLoginForm)}><u>Sign in</u></a>.</p>
                            <div className="has-text-left">
                                <SignupForm loginStatus={"donor"} />
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DonorPage;
