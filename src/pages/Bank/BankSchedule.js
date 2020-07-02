import React from "react";
import { withRouter } from 'react-router-dom';
function BankSchedule({ obj }) {
  const week=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  
  return (
    <div className="bank-info-content no-overflow">
      <div className="schedule-days">
      {week.map(x => <p key={x} className="subtitle is-bold has-font-13 capitalized">{x.substring(0, 3)}</p>)} 
        
      </div>
      <div className="schedule-hours">
      {week.map(x => <p key={`${x}_time`} className="subtitle has-font-13 has-text-grey capitalized">{obj[`fb_${x}_time_delivery`]}</p>)} 
      </div>
    </div>
  );
}
export default withRouter(BankSchedule);
