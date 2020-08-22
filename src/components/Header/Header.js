import React, { useContext, useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "components/Icons/Icons";
import { OrderContext } from "components/Context/OrderContext";
import ServingNowLogo from "assets/image/ServingNow_Logo_Green.png";

function Header() {
  const history = useHistory();
  const location = useLocation();
  const context = useContext(OrderContext);
  const [activeNav, setActiveNav] = useState("");
  const [isActive, setIsActive] = useState(false); // for toggling navbar-burger

  // set active navbar-item
  useEffect(() => {
    setActiveNav(location.pathname);
  },[location])

  const handleLogout = () => {
    console.log(window);
    if (window.FB && JSON.parse(window.localStorage.getItem("userInfo")).social === "Facebook") window.FB.logout();
    window.localStorage.removeItem("userInfo");
    context.setIsAuth(false);
  };

  // scroll back to top when user clicks a menu item that is the same as the page he/she is on
  const resetScroll = (e, pathName="") => {
    e.preventDefault();
    const pathname = e.target.pathname ? e.target.pathname : pathName;
    if (window.location.pathname === pathname) window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    else {history.push('/' + pathname.split("/").pop()); window.scrollTo(0,0);}
  }
  // toggle navbar-burger
  const handleClick = () => {
    setIsActive(!isActive);
  }
  return (
    <nav
      className={activeNav === "/banks" ? "navbar is-light-green" : "navbar is-white" }
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand ">
          {/* <Link className="navbar-item has-no-padding-left" to={context.isAuth ? "/" : "/login"}> */}
          <Link className="navbar-item" to="/" onClick={resetScroll}>
            <img className="logo" src={ServingNowLogo} alt="Logo" />
          </Link>
          <div className="brand-text-container">
            <p className="brand-text">SERVING NOW</p>
            <p className="brand-sub-text">Fast, Fresh, and Free</p>
          </div>
          <a
      role="button"
      className={isActive ? "navbar-burger burger is-active" : "navbar-burger burger"}
      aria-label="menu"
      aria-expanded="false"
      data-target="mainNavbar"
      onClick={handleClick}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
        </div>
        <div id="mainNavbar" className={isActive ? "navbar-menu is-active" : "navbar-menu"}>
          <div className="navbar-end">
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
            <div  className="navbar-item">
              <button className="button navbar-item-text get-food-nav-btn" onClick={(e) => resetScroll(e,"/feed-the-hungry/banks") }><Link to="/banks"> Get Food</Link> </button>
            </div>
            {context.isAuth && (
              <div className="navbar-item navbar-item-text">
                <CartTotal num={context.orderTotal} />
              </div>
            )}
            {context.isAuth ? (
              <Link to="/login" className="navbar-item navbar-item-text" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="navbar-item navbar-item-text">
                  <span className="icon has-text-green">
                      <FontAwesomeIcon icon={Icons.faUserCircle} style={{fontSize: 22}}/>
                  </span>
                  <span className="has-padding-left-0-8">Login</span>
                
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}

function CartTotal({ num }) {
  return (
    <Link to="/order/cart" alt="cart button">
        <span className="icon has-text-green">
          <FontAwesomeIcon icon={Icons.faShoppingBasket} />
        </span>
        <span className="has-padding-left-0-5 has-text-green">{num}</span>
    </Link>
  );
}

export default Header;
