import React, {useState, useContext, useEffect} from 'react';
import { Link, withRouter } from "react-router-dom";
import './header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Icons from 'components/Icons/Icons';
import { OrderContext }  from 'components/Context/OrderContext';
function Header (){
    const context = useContext(OrderContext);

    const handleLogout = () => {
        window.localStorage.removeItem("userInfo");
        context.setIsAuth(false);
    }

    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand ">
                {/* <Link className="navbar-item has-no-padding-left" to={context.isAuth ? "/" : "/login"}> */}
                <Link className="navbar-item has-no-padding-left" to="/">
                    <span className="subtitle is-5 brand-text">
                        Feed The Hungry
                    </span>
                </Link>
                <Hamburger />
            </div>
            <div id="mainNavbar" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <SearchBar />
                    </div>
                    {context.isAuth ? (
                        <Link to="/login" className="navbar-item" onClick={handleLogout}>
                            Logout
                        </Link>
                    ) : (
                        <Link to="/login" className="navbar-item">
                            Login
                        </Link>
                    )}
                    {context.isAuth && (
                        <div className="navbar-item has-no-padding-right">
                            <AddToCart num={context.orderInfo} />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
function SearchBar() {
    return (
        <div className="field is-grouped">
            <p id="search" className="control is-expanded no-bottom-margin has-icons-right">
            <input className="input" type="search" placeholder="Find a food bank"></input>
            <span className="icon is-small has-text-black is-right">
                <FontAwesomeIcon icon={Icons.faSearch}/>
            </span>
            </p>
        </div>
    );
}
function AddToCart({num}) {
    const [total, setTotal] = useState(0);
    // const cart = JSON.parse(window.localStorage.getItem('cart')) || {};
    // const cartItems = cart.items ? cart.items : [];
    // context.setCartInfo(prevState=>({...prevState, total: totalAmount(cartItems), items: cart.items}));
    useEffect(() => {
        getTotal();
        window.addEventListener('storage', getTotal);
    
        return () => {
          window.removeEventListener('storage', getTotal)
        }
    }, [])
    const getTotal = () => {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || {};
        const cartItems = cart.items ? cart.items : [];
        setTotal(totalAmount(cartItems));
    }
    
    return (
        <Link to="/order/cart" alt="cart button">
            <div className="button add-cart">
            <span className="icon shopping-cart">
                <FontAwesomeIcon icon={Icons.faShoppingBasket} />
            </span>
            <span>{total}</span>  
            </div>
        </Link>
    );
}
function Hamburger(){
    return (
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNavbar">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    );
}
const totalAmount = (items) => {
    let total = 0;
    if (items.length > 0) {
        items.forEach(x => {
            total += x.amount;
        });
    }
    return total;
}

export default Header;