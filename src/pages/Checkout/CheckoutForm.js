import React, { useState, useRef, forwardRef, useEffect } from "react";
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
import { useRouteMatch, useHistory, useParams, Link, useLocation } from "react-router-dom";
import history from 'pages/App/History';
import { withRouter } from 'react-router-dom';
// import axios
import axios from "axios";

function CheckoutForm({ bank, items}) {
  const [activeTab, setActiveTab] = useState("delivery");
  const [hidden, setHidden] = useState("hidden"); // to hide error msg
  const delivery_items = items.filter(x => x.item.delivery_pickup.includes('delivery'));
  const pickup_items = items.filter(x => x.item.delivery_pickup.includes('pickup'));

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
  let isOrderPlaced = false;

  useEffect(() => {
    if (checkbox.value || dateTime.startDate) setHidden("hidden");
  }, [checkbox.value || dateTime.startDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    if (!fname.validate()) formIsValid = false;
    if (!lname.validate()) formIsValid = false;
    if (!email.validate()) formIsValid = false;
    if (!phone.validate()) formIsValid = false;
    if (!street.validate()) formIsValid = false;
    if (!city.validate()) formIsValid = false;
    if (!state.validate()) formIsValid = false;
    if (!zip.validate()) formIsValid = false;
    if (!checkbox.value && !dateTime.startDate) {
      formIsValid = false;
      setHidden("");
    }

    if (formIsValid) {
      console.log("All inputs are valid");
      const date = dateTime.startDate ? formatDate(dateTime.startDate) : "ASAP";
      const total = totalAmount(items);
      // order.setOrderInfo(prevState => ({
      //   ...prevState,
      //   phone: phone.value,
      //   street: street.value,
      //   city: city.value,
      //   state: state.value,
      //   zipcode: zip.value,
      //   totalAmount: total,
      //   delivery_note: "",
      //   kitchen_id: bank.id,
      //   longitude: "",
      //   latitude: "",
      //   delivery_date: date
      // }));
      let user_order = {
        customer_id: "",
        phone: phone.value,
        street: street.value,
        city: city.value,
        state: state.value,
        zipcode: zip.value,
        totalAmount: total,
        delivery_note: "",
        kitchen_id: bank.id,
        longitude: "",
        latitude: "",
        delivery_date: date,
        ordered_items: [],
      };
      items.forEach((x) => {
        user_order.ordered_items.push({ meal_id: x.item.food_id, qty: x.amount, 'delivery/pickup': x.item.delivery_pickup });
      });
      // order.setOrderInfo(user_order);
      isOrderPlaced = true;
      console.log(user_order);
      // axios
      //   .post(
      //     "https://dc3so1gav1.execute-api.us-west-1.amazonaws.com/dev/api/v2/add_order_new",
      //     user_order
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //     isOrderPlaced = true;
      //   })
      //   .catch((error) => {
      //     isOrderPlaced = false;
      //   });
    } else { console.log("Some inputs are invalid"); isOrderPlaced = false;}

    if (isOrderPlaced){
      console.log("go to confirmation");
     
      
      window.localStorage.setItem(bank.id, JSON.stringify([]));
      // history.push(`${url}/confirmation`);
    }
    else {
      console.log('stay');
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
                {/* <span className="icon is-small">
                  <FontAwesomeIcon icon={Icons.faShippingFast} />
                </span> */}
                <span className="uppercase">Delivery</span>
              </a>
            </li>
            <li
              className={activeTab === "pickup" ? "is-active" : ""}
              onClick={() => setActiveTab("pickup")}
            >
              <a>
                {/* <span className="icon is-small">
                  <FontAwesomeIcon icon={Icons.faBoxOpen} />
                </span> */}
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
          <PickupDetails bank={bank} items={items} />
        )}
      </div>
      <div className="space-1"></div>
      {/* checkout button */}
      <div className="field right-most">
        <div className="control">
          <button className="button is-success" disabled={(activeTab === "delivery" && pickup_items && pickup_items.length > 0) || (activeTab==="pickup" && delivery_items && delivery_items.length > 0) ? true : false}>
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
// calculate total $ of order
const totalAmount = (items) => {
  var total = 0;
  items.forEach((x) => {
    total += x.item.price * x.amount;
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
