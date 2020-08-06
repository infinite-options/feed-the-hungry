import React, { useState, useEffect, useContext } from "react";
// import icons
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import other components
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import CustomerDetails from "pages/Checkout/CustomerDetails";
import DeliveryDetails from "pages/Checkout/DeliveryDetails";
import PickupDetails from "./PickupDetails";
import DateInputField from 'components/Form/DateInputField';
// import hooks
import {
  useHistory
} from "react-router-dom";
import useDate from 'components/Hooks/useDate';

function CheckoutForm({ bank, items }) {;
  let history = useHistory();

  const fname = useField("First Name", "text");
  const lname = useField("Last Name", "text");
  const phone = useField("Phone Number", "tel");
  const email = useField("Email", "email");
  const street = useField("Street", "text");
  const city = useField("City", "text");
  const state = useField("Select a state", "text");
  const zip = useField("Zip", "text");
  const switchUserInfo = useField("Use my current information", "switch", false);
  const switchUserAddress = useField("Use my current address", "switch", false);
  const checkbox = useField(
    "I want my delivery as soon as possible",
    "checkbox", 
    false
  );
  const dateTime = useDate("Select a date and time", true, new Date(), null, checkbox.value ? true : false);
  const delivery_pickup_items = items.filter((x) => x.info.delivery === 1 && x.info.pickup === 1 );
  const delivery_items = items.filter((x) => x.info.delivery === 1 );
  const delivery_only_items = items.filter((x) => x.info.delivery === 1 && x.info.pickup === 0 );
  const pickup_items = items.filter((x) => x.info.pickup === 1);
  const pickup_only_items = items.filter((x) => x.info.delivery === 0 && x.info.pickup === 1);
  const [activeTab, setActiveTab] = useState(() => {
    if (delivery_pickup_items.length > 0 && delivery_only_items.length === 0 && pickup_only_items.length === 0) return "delivery";
    if (delivery_only_items.length === 0) return "pickup";
    // if (delivery_pickup_items.length > 0) return "delivery";
    return "delivery";

  });
  
  const isFormValid = () => {
    // let isValid  = true;
    console.log(fname.isValid);
    console.log(lname.isValid);
    console.log(phone.isValid);
    console.log(email.isValid);
    console.log(street.isValid);
    console.log(city.isValid);
    console.log(state.isValid);
    console.log(zip.isValid);
    console.log(dateTime.isValid);
    console.log('------------');
    if (!fname.isValid || !lname.isValid || !phone.isValid || !email.isValid){ console.log("customer details are invalid"); return false;}
    if (activeTab === "delivery"){
      // if (pickup_items.length > 0 ) return false;
      if (!street.isValid  || !city.isValid  || !state.isValid  ||  !zip.isValid) return false;
      if (checkbox.value === false && !dateTime.isValid) return false;
      
    } 
    // if (activeTab === "pickup" && delivery_items.length > 0) return false;
    
    return true;
  }
  let form  = isFormValid(); 
  console.log("form is valid?" + form);
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
  // window.addEventListener("storage", () => {
  //   setActiveTab(delivery_only_items.length === 0 ? "pickup" : "delivery" );
  // });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (form) {
      const date = dateTime.startDate ? formatDate(dateTime.startDate) : "ASAP";
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      const position = JSON.parse(window.localStorage.getItem('position'));
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
        kitchen_address: bank.fb_address1,
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
              onClick={delivery_only_items.length === 0 ? () => setActiveTab("pickup") : () => setActiveTab("delivery")}
            >
              <a className={ delivery_only_items.length === 0 ? "disabled" : ""}>
                <span className="uppercase">Delivery</span>
              </a>
            </li>
            <li
              className={activeTab === "pickup" ? "is-active" : ""}
              onClick={pickup_only_items.length === 0 ? () => setActiveTab("delivery") : () => setActiveTab("pickup")}
            >
              <a className={pickup_only_items.length === 0 ? "disabled" : ""}>
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
                    <DateInputField props={dateTime}/>
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
