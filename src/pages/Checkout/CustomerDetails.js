import React from "react";
import InputField from "components/Form/InputField";
import useField from "components/Hooks/useField";

function CustomerDetails({ fname, lname, email, phone, switchUserInfo}) {

  return (
    <div>
      <InputField props={switchUserInfo} />
      <div className="field horizontal">

        <div className="field-body">
          <InputField props={fname} />
          <InputField props={lname} />
        </div>
      </div>
      <InputField props={email} />
      <InputField props={phone} />
      {/* <div className="field horizontal">
        <div className="field-body">
          <div className="field is-expanded">
            <div className="field has-addons">
              <label className="help is-danger">*</label>
              <div className="control">
                <a className="button is-static">+1</a>
              </div>
              <div className="control is-expanded">
                <InputField props={phone} />
              </div>
            </div>
            <p className="help">Do not enter the first zero</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default CustomerDetails;
