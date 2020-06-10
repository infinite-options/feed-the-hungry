import React from 'react';
function BankSchedule({obj}){
    return (
        <div className="bank-schedule">
            <div className="schedule-days">
                <p className="subtitle is-bold has-font-14 capitalized">mon</p>
                <p className="subtitle is-bold has-font-14 capitalized">tue</p>
                <p className="subtitle is-bold has-font-14 capitalized">wed</p>
                <p className="subtitle is-bold has-font-14 capitalized">thu</p>
                <p className="subtitle is-bold has-font-14 capitalized">fri</p>
                <p className="subtitle is-bold has-font-14 capitalized">sat</p>
                <p className="subtitle is-bold has-font-14 capitalized">sun</p>
            </div>
            <div className="schedule-hours">
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.monday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.tuesday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.wednesday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.thursday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.friday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.saturday}</p>
                <p className="subtitle has-font-14 has-text-grey capitalized">{obj.sunday}</p>
            </div>
        </div>
    );
}
export default BankSchedule;