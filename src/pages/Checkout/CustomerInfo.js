import React from "react";
import InputField from "components/Form/InputField";
import useField from "components/Hooks/useField";
function CustomerInfo({ fname, lname, email, phone }) {
  // const fname = useField("First Name", "text");
  // const lname = useField("Last Name", "text");
  // const phone = useField("Phone Number", "text");
  // const email = useField("Email", "email");
  return (
    <div>
      <p className="title is-5">Customer Information</p>
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
              <p class="control">
                <a class="button is-static">+1</a>
              </p>
              <p class="control is-expanded">
                <InputField props={phone} />
              </p>
            </div>
            <p class="help">Do not enter the first zero</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
