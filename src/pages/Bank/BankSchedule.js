import React from "react";
import { withRouter } from 'react-router-dom';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
function BankSchedule({ obj }) {
  const week=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const today = new Date();
  console.log(today.getDay());
  const Hours = ({obj, day, type}) => {
    const parsedHours = obj[`fb_${day}_time`] ? JSON.parse(obj[`fb_${day}_time`])[type] : "Closed";
    return (
      <p className={week[today.getDay() > 0 ? today.getDay()-1 : 6] === day ? "subtitle is-6 capitalized is-bold" : "subtitle is-6 has-text-grey capitalized"}>{parsedHours}</p>
    )
  }
  return (
    <div className="bank-info-content no-overflow" style={{marginTop:'.4rem'}}>
      <div className="schedule-title" style={{padding: 0, marginRight: '6px'}}>
      <span className="icon">
        <ScheduleOutlinedIcon />
      </span>
      </div>
      <div className="schedule-title">
                <p className="title capitalized is-6 is-Nunito">Days</p>
      {week.map(x => <p key={x} className={week[today.getDay() > 0 ? today.getDay()-1 : 6] === x ?  "subtitle is-6 is-Nunito capitalized is-bold" : "subtitle is-6 is-Nunito capitalized"}>{x.substring(0, 3)}</p>)} 
      </div>
      <div className="schedule-title">
      <div className="title capitalized is-6 is-Nunito">Delivery Hours</div>
      {week.map(x => <Hours key={`${x}_delivery`} obj={obj} day={x}  type="delivery" />)}
      </div>
      <div className="schedule-title">
      <div className="title capitalized is-6 is-Nunito">Pick Up Hours</div>
      {week.map(x => <Hours key={`${x}_pickup`} obj={obj} day={x} type="order" />)}
      </div>
    </div>
  );
}
export default BankSchedule;
