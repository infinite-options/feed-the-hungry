import React from "react";
import "pages/styles.css";
// import Layout from "./layout";

const SignupVerify = () => {
  
  return (
    <div className="login-signup-page">
      {/* <div className="container box level"> */}
        <div className="tile is-ancestor">
          <div className="tile is-parent has-margin-top-1">
            <article className="tile box is-child notification is-primary">
              <h6 className="has-text-white has-text-centered">
                You have successfully created a Feed The Hungry account!<br /><br />
                A confirmation email has been sent to your email address with instructions to help you complete your registration.<br /><br />
                Thank you.
              </h6>
            </article>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default SignupVerify;