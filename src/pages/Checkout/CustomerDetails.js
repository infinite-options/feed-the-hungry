import React from "react";
import InputField from "components/Form/InputField";
import useField from "components/Hooks/useField";
function CustomerDetails({ fname, lname, email, phone }) {

  return (
    <div>
      <div className="field horizontal">
        <div className="field-body">
          <InputField props={fname} />
          <InputField props={lname} />
        </div>
      </div>
      <InputField props={email} />
      <div className="field horizontal">
        <div class="field-body">
          <div class="field is-expanded">
            <div class="field has-addons">
              <div class="control">
                <a class="button is-static">+1</a>
              </div>
              <div class="control is-expanded">
                <InputField props={phone} />
              </div>
            </div>
            <p class="help">Do not enter the first zero</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
