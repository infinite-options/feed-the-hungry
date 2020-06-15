import React, { useState, forwardRef } from 'react';
// Add the css styles...
import Icons from 'components/Icons/Icons';
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import addDays from 'date-fns/addDays';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DateTime =  forwardRef((props, ref) =>  {

    const [startDate, setStartDate] = useState(null);
    const onChange = (date) => {
        setStartDate(date);
        console.log(date);
    }
  return (
    <DatePicker ref={ref}
      selected={startDate}
      value={startDate}
      onChange={(date) => onChange(date)}
      minDate={addDays(new Date(), 2)}
      customInput={<DateTimeInput />}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select a date and time"
    />
  );


})
const DateTimeInput = ({placeholder, value, id, onClick}) => {
    return (
        <div class="field">
        <div class="control has-icons-right">
          <input class="input" type="text"
        placeholder={placeholder}
        value={value}
        id={id}
        onClick={onClick} readOnly />
          <span class="icon is-small is-right">
            <FontAwesomeIcon icon={Icons.faCalendarAlt} />
          </span>
        </div>
      </div> );
}
export default DateTime;