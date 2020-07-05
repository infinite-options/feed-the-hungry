import React, { useState, useRef, forwardRef, useEffect, useContext } from "react";
// import icons
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
// import other components
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Messages from "components/Notifications/Messages";
import CustomerDetails from "pages/Checkout/CustomerDetails";
import DeliveryDetails from "pages/Checkout/DeliveryDetails";
import StateAPI from "API/StateAPI";
import PickupDetails from "./PickupDetails";
import {
  useRouteMatch,
  useHistory,
  useParams,
  Link,
  useLocation,
  withRouter,
} from "react-router-dom";
// import hooks
import { usePosition } from 'use-position';


// use San Jose, CA as the default center
const DEFAULT_LATITUDE = 37.338208;
const DEFAULT_LONGITUDE = -121.886329;

function CheckoutForm({ bank, items }) {;
  let history = useHistory();
  const watch = true;
  const { latitude, longitude, error } = usePosition(watch, {enableHighAccuracy: true});
  const position = !error ? [latitude, longitude] : [DEFAULT_LATITUDE, DEFAULT_LONGITUDE];

  const fname = useField("First Name", "text");
  const lname = useField("Last Name", "text");
  const phone = useField("Phone Number", "tel");
  const email = useField("Email", "email");
  const dateTime = useDateTime();
  const street = useField("Street", "text");
  const city = useField("City", "text");
  const state = useField("Select a state", "text");
  const zip = useField("Zip", "text");
  const switchUserInfo = useField("Use my current information", "switch");
  const switchUserAddress = useField("Use my current address", "switch");
  const checkbox = useField(
    "I want my delivery as soon as possible",
    "checkbox"
  );
  const delivery_items = items.filter((x) =>
    x.info.delivery_pickup === "delivery"
  );
  const pickup_items = items.filter((x) =>
  x.info.delivery_pickup === "pickup"
);
  const [activeTab, setActiveTab] = useState(delivery_items.length ? 'delivery' : 'pickup');
  
  const isFormValid = () => {
    let isValid  = true;
    if (!fname.isValid || !lname.isValid || !phone.isValid || !email.isValid){ console.log("customer details are invalid"); isValid = false;}
    if (activeTab === "delivery"){
      if (!street.isValid  || ! city.isValid  || !state.isValid  ||  !zip.isValid) isValid = false;
      if (!checkbox.isValid && !dateTime.startDate) isValid = false;
      if (pickup_items.length > 0 ) isValid = false;
    } else if (activeTab === "pickup" && delivery_items.length > 0) isValid = false;
  
    return isValid;
  }
  const form  = isFormValid(); 
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  useEffect(() => {
    if (switchUserInfo.value && userInfo){
      fname.setValue(userInfo.firstName);
      lname.setValue(userInfo.lastName);
      phone.setValue(userInfo.phoneNumber.replace(/\D/g, ""));
      email.setValue(userInfo.email);
    }else {
      fname.setValue('');
      lname.setValue('');
      phone.setValue('');
      email.setValue('');
    }

  },[switchUserInfo.value]);
  useEffect(() => {
    if (switchUserAddress.value && userInfo){
      street.setValue(userInfo.address1);
      city.setValue(userInfo.city);
      state.setValue(userInfo.state);
      zip.setValue(userInfo.zip);
    }else {
      street.setValue('');
      city.setValue('');
      state.setValue('');
      zip.setValue('');
    }

  },[switchUserAddress.value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // here we write data to local storage and redirect user after checking that form is valid
    if (form) {
      console.log("All inputs are valid");
      const date = dateTime.startDate ? formatDate(dateTime.startDate) : "ASAP";
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      const total = totalAmount(items);
   
      let unconfirmed_order = {
        isSent: false,
        order_id: "",
        customer_id: userInfo ? userInfo.userID : '',
        phone: phone.value.replace(/\D/g, ""),
        email: email.value,
        street: street.value,
        city: city.value,
        state: state.value,
        zipcode: zip.value.toString(),
        totalAmount: total,
        delivery_note: "",
        kitchen_id: bank.foodbank_id,
        kitchen_name: bank.fb_name,
        kitchen_address: bank.foodbank_address,
        longitude: position[1],
        latitude: position[0],
        delivery_date: date,
        order_type: activeTab,
        ordered_items: items,
      };

      window.localStorage.setItem( // write new data to local storage
        "unconfirmed_order",
        JSON.stringify(unconfirmed_order)
      );
      history.push("/order/cart/confirm"); // redirect
    } else {
      console.log("Some inputs are invalid");
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="delivery-confirm">
        <p className="title is-5">Customer Information</p>
        {/*  get user name, email ,phone */}
        <CustomerDetails
          fname={fname}
          lname={lname}
          email={email}
          phone={phone}
          switchUserInfo={switchUserInfo}
        />
        <div className="divider"></div>
        {/* choose pickup or delivery */}
        <p className="title is-5">Delivery Method</p>
        <div className="tabs is-toggle is-fullwidth is-medium">
          <ul>
            <li
              className={activeTab === "delivery" ? "is-active" : ""}
              onClick={() => setActiveTab("delivery")}
            >
              <a>
                <span className="uppercase">Delivery</span>
              </a>
            </li>
            <li
              className={activeTab === "pickup" ? "is-active" : ""}
              onClick={() => setActiveTab("pickup")}
            >
              <a>
                <span className="uppercase">Pick Up</span>
              </a>
            </li>
          </ul>
        </div>
        {activeTab === "delivery" ? (
          <div>
            <p className="title is-5">Delivery Address</p>
            <DeliveryDetails
              street={street}
              city={city}
              state={state}
              zip={zip}
              switchUserAddress={switchUserAddress}
            />
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
          </div>
        ) : (
          <PickupDetails bank={bank} items={items} />
        )}
      </div>
      <div className="space-1"></div>
      {/* checkout button */}
      <div className="field right-most">
        <div className="control">
          <button
            className="button is-success"
            disabled={!form ? true : false}
          >
            <span className="uppercase">Place Order</span>
            <span className="icon">
              <FontAwesomeIcon icon={Icons.faLongArrowAltRight} />
            </span>
          </button>
        </div>
      </div>
      <div className="space-2-5"></div>
    </form>
  );
}
// calculate total amount of order
const totalAmount = (items) => {
  var total = 0;
  items.forEach((x) => {
    total += x.amount;
  });
  return total;
};

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
