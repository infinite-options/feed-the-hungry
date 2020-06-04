import React from 'react';
import { Link } from "react-router-dom";
import './header.css';
//import icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Icons from '../icons/Icons';


function Header (){
    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand ">
                <a className="navbar-item has-no-padding-left" href="#">
                    <span className="subtitle is-5 brand-text">
                        Feed The Hungry
                    </span>
                </a>
                {/* navbar-burger: toggles the navbar menu on touch devices */}
                <Hamburger />
            </div>
            <div id="mainNavbar" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/banks" className="navbar-item">
                        Food Banks
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <SearchBar />
                    </div>
                    <Link to="#" className="navbar-item">
                        Login
                    </Link>
                    <div className="navbar-item has-no-padding-right">
                        <AddToCart />
                    </div>

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
            <span class="icon is-small has-text-black is-right">
                <FontAwesomeIcon icon={Icons.faSearch}/>
            </span>
            </p>
        </div>
    );
}
function AddToCart() {
    return (
        <a href="/cart" alt="cart button">
            <div className="button add-cart">
            <span>Cart</span>   
            <span className="icon shopping-cart is-small">
                <FontAwesomeIcon icon={Icons.faShoppingCart} />
            </span>
            <span>0</span>  
            </div>
        </a>
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
export default Header;