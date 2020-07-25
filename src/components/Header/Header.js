import React, { useContext } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";
import { OrderContext } from "components/Context/OrderContext";
import ServingNowLogo from "assets/image/ServingNow_Logo_Green.png";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const location = useLocation();
  // const { path, url } = useRouteMatch();
  const history = useHistory();
  const context = useContext(OrderContext);
  context.setCartTotal(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    return cart && cart.total ? cart.total : 0;
  });

  const handleLogout = () => {
    console.log(window);
    if (window.FB && JSON.parse(window.localStorage.getItem("userInfo")).social === "Facebook") window.FB.logout();
    window.localStorage.removeItem("userInfo");
    context.setIsAuth(false);
  };
  const resetScroll = (e, pathName="") => {
    e.preventDefault();
    const pathname = e.target.pathname ? e.target.pathname : pathName;
    if (window.location.pathname === pathname) window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    else {history.push('/' + pathname.split("/").pop()); window.scrollTo(0,0);}
  }
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      {/* <div className="container"> */}
      <div className="container">
        <div className="navbar-brand ">
          {/* <Link className="navbar-item has-no-padding-left" to={context.isAuth ? "/" : "/login"}> */}
          <Link className="navbar-item" to="/">
            <img className="logo" src={ServingNowLogo} alt="Logo" />
          </Link>
          <div className="brand-text-container">
            <p className="brand-text">SERVING NOW</p>
            <p className="brand-sub-text">Fast, Fresh, and Free</p>
          </div>
          <Hamburger />
        </div>
        <div id="mainNavbar" className="navbar-menu">
          <div className="navbar-end">
            {/* <div className="navbar-item">
                        <SearchBar />
                    </div> */}
            <Link to="/" className="navbar-item navbar-item-text" onClick={resetScroll}>
              Home
            </Link>
            <Link to="/about" className="navbar-item navbar-item-text" onClick={resetScroll}>
              About Us
            </Link>
            <Link to={context.isAuth ? "/admin" : "/adminlogin"} className="navbar-item navbar-item-text" onClick={resetScroll}>
              Admin
            </Link>
            <Link to={context.isAuth ? "/donate" : "/donateform"} className="navbar-item navbar-item-text" onClick={resetScroll}>
              Donate
            </Link>
            <Link to="/banks" className="navbar-item" onClick={(e) => resetScroll(e,"/feed-the-hungry/banks") }>
              <button className="button navbar-item-text is-success is-outlined" >Get Food</button>
            </Link>
            {context.isAuth && (
              <div className="navbar-item navbar-item-text">
                <CartTotal num={context.cartTotal} />
              </div>
            )}
            {context.isAuth ? (
              <Link to="/login" className="navbar-item navbar-item-text" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="navbar-item navbar-item-text">
                  <span className="icon has-text-success">
                      <FontAwesomeIcon icon={Icons.faUserCircle} style={{fontSize: 22}}/>
                  </span>
                  <span className="has-padding-left-0-8">Login</span>
                
              </Link>
            )}
            
          </div>
        </div>
        {/* </div> */}
      </div>
    </nav>
  );
}
function SearchBar() {
  return (
    <div className="field is-grouped">
      <p
        id="search"
        className="control is-expanded no-bottom-margin has-icons-right"
      >
        <input
          className="input"
          type="search"
          placeholder="Find a food bank"
        ></input>
        <span className="icon is-small has-text-black is-right">
          <FontAwesomeIcon icon={Icons.faSearch} />
        </span>
      </p>
    </div>
  );
}
function CartTotal({ num }) {
  return (
    <Link to="/order/cart" alt="cart button">
      {/* <div className="button add-cart"> */}
        <span className="icon has-text-success">
          <FontAwesomeIcon icon={Icons.faShoppingBasket} />
        </span>
        <span className="has-padding-left-0-5 has-text-success">{num}</span>
      {/* </div> */}
    </Link>
  );
}
function Hamburger() {
  return (
    <a
      role="button"
      className="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="mainNavbar"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  );
}
const totalAmount = (items) => {
  let total = 0;
  if (items.length > 0) {
    items.forEach((x) => {
      total += x.amount;
    });
  }
  return total;
};

export default Header;
