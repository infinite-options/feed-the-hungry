import React, { useState, useRef, forwardRef, useEffect } from "react";
// import icons
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import DateTime from "pages/Checkout/DateTime";
// import other components
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Messages from "components/Notifications/Messages";
import CustomerInfo from "pages/Checkout/CustomerInfo";
import Select from "components/Form/Select";
import StateAPI from "API/StateAPI";
import CheckoutPickup from "./CheckoutPickup";
import { useRouteMatch, useParams, Link, useLocation } from "react-router-dom";
import axios from 'axios';

const totalAmount = (items) => {
  var total = 0;
  items.forEach(x => {
    total += x.item.price * x.amount;
  })
  return total;
};

function CheckoutForm({ obj, items }) {
  let { hist } = useLocation();
  const states = StateAPI();
  const [activeTab, setActiveTab] = useState("delivery");
  const [hidden, setHidden] = useState("hidden"); // to hide error msg

  // const form = useForm();
  const fname = useField("First Name", "text");
  const lname = useField("Last Name", "text");
  const phone = useField("Phone Number", "tel");
  const email = useField("Email", "email");
  const dateTime = useDateTime();
  const street = useField("Street", "text");
  const city = useField("City", "text");
  const state = useField("Select a state", "text");
  const zip = useField("Zip", "text");
  const checkbox = useField(
    "I want my delivery as soon as possible",
    "checkbox"
  );


  useEffect(() => {
    if (checkbox.value || dateTime.startDate) setHidden("hidden");
  }, [checkbox.value || dateTime.startDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

  };
  const handleClick = () => {
    let formIsValid = true;
    // form.setValid(true);
    // fname.validatewith();
    // console.log(form.isValid);
    // lname.validatewith();
    // email.validatewith();
    // phone.validatewith();
    // street.validatewith();
    // city.validatewith();
    // state.validatewith();
    // zip.validatewith();
    if (!fname.validatewith()) formIsValid = false;
    if (!lname.validatewith()) formIsValid = false;
    if (!email.validatewith()) formIsValid = false;
    if (!phone.validatewith()) formIsValid = false;
    if (!street.validatewith()) formIsValid = false;
    if (!city.validatewith()) formIsValid = false;
    if (!state.validatewith()) formIsValid = false;
    if (!zip.validatewith()) formIsValid = false;
    if (dateTime.startDate) console.log(formatDate(dateTime.startDate));

    if (!checkbox.value && !dateTime.startDate) { formIsValid = false; setHidden("");}
    if (formIsValid) {
      console.log("All inputs are valid");
      const date = dateTime.startDate ? formatDate(dateTime.startDate) : "ASAP";
      const total = totalAmount(items);
      let order = 
      {
        customer_id:"",
        phone: phone.value,
        street: street.value,
        city: city.value,
        state: state.value,
        zipcode: zip.value,
        totalAmount: total,
        delivery_note:"",
        kitchen_id: obj.id,
        longitude: obj.longitude,
        latitude: obj.latitude,
        delivery_date: date,
        ordered_items: []
      };
      items.forEach(x=> {
        order.ordered_items.push({ meal_id: x.item.food_id, qty: x.amount})
      })   
      console.log(order);   
      axios.post('https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/add_order', order )
      .then(res => {
        console.log(res);
        console.log(res.data);
      }) .catch(error => {
        console.log(error);
      });
    }
    else console.log("Some inputs are invalid");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="delivery-confirm">
        <CustomerInfo fname={fname} lname={lname} email={email} phone={phone} />
        <div className="divider"></div>
        <p className="title is-5">Delivery Method</p>
        <div class="tabs is-toggle is-fullwidth">
          <ul>
            <li
              className={activeTab === "delivery" ? "is-active" : ""}
              onClick={() => setActiveTab("delivery")}
            >
              <a>
                <span class="icon is-small">
                  <FontAwesomeIcon icon={Icons.faShippingFast} />
                </span>
                <span className="uppercase">Delivery</span>
              </a>
            </li>
            <li
              className={activeTab === "pickup" ? "is-active" : ""}
              onClick={() => setActiveTab("pickup")}
            >
              <a>
                <span class="icon is-small">
                  <FontAwesomeIcon icon={Icons.faBoxOpen} />
                </span>
                <span className="uppercase">Pick Up</span>
              </a>
            </li>
          </ul>
        </div>
        {activeTab === "delivery" ? (
          <div>
            <p className="title is-5">Delivery Address</p>
            <InputField props={street} />
            <InputField props={city} />
            <div className="field is-horizontal">
              <div className="field-body">
                <Select props={state} data={states.data} />
                <InputField props={zip} />
              </div>
            </div>

            <div className="divider"></div>
            <p className="title is-5">Delivery Options</p>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <DatePicker
                      selected={
                        checkbox.value === true ? null : dateTime.startDate
                      }
                      value={dateTime.startDate}
                      onChange={(date) => dateTime.onChange(date)}
                      minDate={dateTime.minDate}
                      showTimeSelect
                      customInput={<DateTimeInput />}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText={
                        checkbox.value === true
                          ? "No date selected"
                          : "Select a date and time"
                      }
                      disabled={checkbox.value === true ? true : false}
                    />
                  </div>
                </div>
                <div className="right-most">
                  <InputField props={checkbox} />
                </div>
              </div>
            </div>

            {/* if user submits the form and no delivery time is selected, this error message is displayed.
        if the error message is showing and user selects a delivery time, hid the error message */}
            <div className={hidden}>
              <div className="space-1"></div>
              <div className="error-msg">
                {Messages.Danger(
                  "Please make sure that you schedule a delivery date or soonest delivery."
                )}
              </div>
            </div>
          </div>
        ) : (
          <CheckoutPickup obj={obj} />
        )}
      </div>
      <div className="space-1"></div>
      <div className="field right-most">
        <div className="control">
          <button className="button is-success" onClick={handleClick}>
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faLongArrowAltRight} />
            </span>
            <span className="uppercase">Review and Pay</span>
          </button>
        </div>
      </div>
      <div className="space-2-5"></div>
    </form>
  );
}

const DateTimeInput = forwardRef((props, ref) => {
  return (
    <div className="field">
      <div className="control has-icons-right">
        <input
          ref={ref}
          className="input"
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          id={props.id}
          onClick={props.onClick}
          readOnly
          disabled={props.disabled}
        />
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={Icons.faCalendarAlt} />
        </span>
      </div>
    </div>
  );
});

const useForm = () => {
  const [isValid, setValid] = useState(false);

  const setFormValue = (value) => {
    setValid(value);
  }
  return{
    isValid,
    setValid,
    setFormValue
  };
};

const useDateTime = () => {
  const [startDate, setStartDate] = useState(null);
  const onChange = (date) => {
    setStartDate(date);
  };
  const minDate = addDays(new Date(), 2);

  return {
    startDate,
    onChange,
    minDate,
  };
};

function formatDate(date) {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  ).toUpperCase();
}

export default CheckoutForm;
