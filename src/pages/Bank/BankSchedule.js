import React from "react";
import { withRouter } from 'react-router-dom';
function BankSchedule({ obj }) {
  const week=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  
  return (
    <div className="bank-info-content no-overflow" style={{marginTop:'.4rem'}}>
      <div className="schedule-days">
        <div className="title capitalized">Days</div>
      {week.map(x => <p key={x} className="subtitle has-font-13 capitalized">{x.substring(0, 3)}</p>)} 
        
      </div>
      <div className="schedule-hours">
      <div className="title capitalized">Delivery Hours</div>
      {week.map(x => <p key={`${x}_time`} className="subtitle has-font-13 has-text-grey capitalized">{obj[`fb_${x}_time_delivery`]}</p>)} 
      </div>
      <div className="schedule-hours">
      <div className="title capitalized">Pick Up Hours</div>
      {week.map(x => <p key={`${x}_time`} className="subtitle has-font-13 has-text-grey capitalized">{obj[`fb_${x}_time_order`]}</p>)} 
      </div>
    </div>
  );
}
export default withRouter(BankSchedule);
