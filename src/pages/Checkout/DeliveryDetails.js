import React from 'react';
import StateAPI from 'API/StateAPI';
import InputField from 'components/Form/InputField';
import Select from 'components/Form/Select';


function DeliveryDetails({street, city, state, zip}) {
    const states = StateAPI();
    console.log(states);
    return (
        <div>
            <InputField props={street} />
            <InputField props={city} />
            <div className="field is-horizontal">
              <div className="field-body">
                <Select props={state} data={states.data} />
                <InputField props={zip} />
              </div>
            </div>
        </div>
    );
}
export default DeliveryDetails;