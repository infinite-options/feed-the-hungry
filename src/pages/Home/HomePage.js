import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import HomeImage5 from "assets/image/home-image-5.webp";
import HomeImage4 from "assets/image/home-image-4.webp";
import HomeImage3 from "assets/image/home-image-3.jpg";
import HomeImage2 from "assets/image/home-image-2.webp";
import HomeImage1 from "assets/image/home-image-1.webp";
import useField from "components/Hooks/useField";
import InputField from "components/Form/InputField";
import Icons from "components/Icons/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTop from "utils/Scroll/SrollToTop";

function HomePage() {
  console.log("home page");
  return (
    <div className="body-container">
      {/* <ScrollToTop /> */}
      <section id="home" className="splash-banner">
        <div className="splash-banner-left">
          {/* <div className="parallax-container"> */}
          <div className="parallax"></div>
          {/* </div> */}
        </div>
        <div className="splash-banner-right">
          <div className="splash-banner-right-content">
            <p className="splash-banner-title">GET FREE GROCERIES</p>
            <p className="splash-banner-subtitle">
              Order now for pick up or free delivery!
            </p>
            <Link to="/banks">
              <button className="button get-food-btn">Get Food</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="steps">
        <div className="steps-title">
          <p className="is-Raleway has-text-green" style={{ fontSize: 40 }}>
            3 SIMPLE STEPS
          </p>
        </div>
        <div className="large-space"></div>
        <div className="steps-content">
          <div className="step-item">
            <div className="step-item-image">
              <img src={HomeImage1} alt="Sign Up Image" />
            </div>
            <div
              className="step-item-content"
              style={{ backgroundColor: "black" }}
            >
              <p
                className="is-Raleway has-text-white"
                style={{ fontSize: 22, marginBottom: "33px" }}
              >
                LOGIN / SIGN UP
              </p>
              <p className="is-Nunito has-text-white">
                Register in under 3 minutes
              </p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-item-image">
              <img src={HomeImage2} alt="Products Image" />
            </div>
            <div
              className="step-item-content"
              style={{ backgroundColor: "hsl(141, 72%, 43%)" }}
            >
              <p
                className="is-Raleway has-text-white"
                style={{ fontSize: 22, marginBottom: "33px" }}
              >
                SELECT PRODUCTS
              </p>
              <p className="is-Nunito has-text-white">Get groceries you love</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-item-image">
              <img src={HomeImage3} alt="Delivery Image" />
            </div>
            <div
              className="step-item-content"
              style={{ backgroundColor: "#C2B39B" }}
            >
              <p
                className="is-Raleway has-text-white"
                style={{ fontSize: 22, marginBottom: "33px" }}
              >
                PICK UP / FREE DELIVERY
              </p>
              <p className="is-Nunito has-text-white">Free doorstep delivery</p>
            </div>
          </div>
        </div>
      </section>
      <section className="quotes">
        <div className="quotes-content">
          <div className="quotes-left">
            <div className="quotes-image">
              <img src={HomeImage4} alt="Quote Image" />
            </div>
          </div>
          <div className="quotes-right">
            <div className="quotes-text">
              <p
                className="is-Raleway has-text-white"
                style={{ fontSize: 22, marginBottom: "33px" }}
              >
                “One of the greatest feelings in the world is knowing that we as
                individuals can make a difference. Ending hunger in America is a
                goal that is literally within our grasp.”
              </p>
              <p className="is-Nunito has-text-white" style={{ fontSize: 18 }}>
                Jeff Bridges
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="splash-banner-2">
        <div className="overlay">
          <img src={HomeImage5} alt="Splash Banner 2" />
        </div>
      </section>
      <section className="contact">
        <div className="contact-container">
          <div className="contact-left">
            <div className="contact-left-content">
              <p
                className="is-Raleway has-text-green"
                style={{ fontSize: 40, marginBottom: "33px" }}
              >
                How can we help you today?
              </p>
              <p className="is-Nunito has-text-white" style={{ fontSize: 15 }}>
                Please send us a message or email us at
                partnership@infiniteoptions.com
              </p>
            </div>
          </div>
          <div className="contact-right">
            {/* <div className="contact-right-content"> */}
            {/* <div className="contact-form"> */}
            <ContactForm />
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-left-content">
              <p className="is-Nunito" style={{ fontSize: 14 }}>
                ©2020 by Serving Now
              </p>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-right-content">
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faFacebookF} />
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faTwitter} />
              </span>
              <span className="icon">
                <FontAwesomeIcon icon={Icons.faLinkedinIn} />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const name = useField("Name", "text");
  const email = useField("Email", "email");
  const phone = useField("Phone", "text", false);
  const address = useField("Address", "text", false);
  const subject = useField("Subject", "text");
  const message = useField("Type your message here...", "textarea");
  const [success, setSuccess] = useState(false);
  const sendFeedBack = (templateId, variables) => {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
        setSuccess(true);
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) => {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        );
        setSuccess(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.isValid && email.isValid && subject.isValid && message.isValid) {
      const templateId = "template_L4Ie7OMc";
      sendFeedBack(templateId, {
        message_html: message.value,
        subject: subject.value,
        to_user_email: email.value,
        from_user_name: name.value,
        from_user_email: email.value,
        to_email: "kumaqi97@gmail.com",
      });
    }
  };

  return (
    <div className="contact-right-content">
      {!success ? (
        <form className="contact-form">
          <div className="field is-horizontal">
            <div className="field-body">
              <InputField props={name} color="is-white" />
              <InputField props={email} color="is-white" />
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <InputField props={phone} color="is-white" />
              <InputField props={address} color="is-white" />
            </div>
          </div>
          <InputField props={subject} color="is-white" />
          <InputField props={message} color="is-white" />
          <button
            className="button is-fullWidth submit-btn"
            disabled={
              !name.isValid ||
              !email.isValid ||
              !subject.isValid | !message.isValid
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            Submit
            {/* <span className="icon"><FontAwesomeIcon icon={Icons.faCircleNotch} spin /></span> */}
          </button>
        </form>
      ) : (
        <div className="message-sent">
          <p
            className="is-Raleway has-text-green"
            style={{ fontSize: 40, marginBottom: "33px" }}
          >
            Thank you!{" "}
          </p>
          <span
            className="icon has-text-green is-large"
            style={{ marginBottom: "36px"}}
          >
            <FontAwesomeIcon
              icon={Icons.faCheckCircle}
              style={{ fontSize: "64px" }}
            />
          </span>
          <p
            className="is-Nunito has-text-white"
            style={{ fontSize: 15, marginBottom: "33px" }}
          >
            Your message has been sent{" "}
          </p>
        </div>
      )}
    </div>
  );
}
export default HomePage;
