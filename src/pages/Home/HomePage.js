import React from "react";
import "./style.css";
import HomeImage4 from "assets/image/home-image-4.webp";
import HomeImage3 from "assets/image/home-image-3.webp";
import HomeImage2 from "assets/image/home-image-2.webp";
import HomeImage1 from "assets/image/home-image-1.webp";
function HomePage() {
  return (
    <div className="body-container">
      <section className="splash-banner">
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
            <button className="button get-food-btn">Get Food</button>
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
              style={{ backgroundColor: "#D2B48C" }}
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
            <p className="is-Raleway has-text-white" style={{fontSize: 22, marginBottom: '33px'}}>
              “One of the greatest feelings in the world is knowing that we as
              individuals can make a difference. Ending hunger in America is a
              goal that is literally within our grasp.”
            </p>
            <p className="is-Nunito has-text-white" style={{fontSize: 18}}>Jeff Bridges</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
