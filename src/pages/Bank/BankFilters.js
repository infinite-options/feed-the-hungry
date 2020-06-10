import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icons from 'components/Icons/Icons';

function BankFilters({bankUrl}){
    const [activeTab, setActiveTab] = useState('all');
    const HandleClickTab = (event, tabName) => {
        event.preventDefault();
        setActiveTab(tabName);
    }
    return (
        <div className='bank-filters'>        
            <div className="tabs is-right">
                <ul>
                    <li className={activeTab == 'all' ? 'is-active': ''} onClick={(e) => HandleClickTab(e, "all")}>
                        <Link to={`${bankUrl}`} >
                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                            <span>All</span>
                        </Link>
                    </li>
                    <li className={activeTab == 'vegetarian' ? 'is-active': ''} onClick={(e) => HandleClickTab(e, "vegetarian")}>
                        <Link to={`${bankUrl}?type=vegetarian`} >
                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                            <span>Vegetarian</span>
                        </Link>
                    </li>
                    <li className={activeTab == 'vegan' ? 'is-active' : ''} onClick={(e) => HandleClickTab(e, "vegan")}>
                        <Link to={`${bankUrl}?type=vegan`}>
                            <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
                            <span>Vegan</span>
                        </Link>
                    </li>
                    <li className={activeTab == 'gluten-free' ? 'is-active' : ''} onClick={(e) => HandleClickTab(e, "gluten-free")}>
                        <Link to={`${bankUrl}?type=gluten-free`}>
                            <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                            <span>Gluten-free</span>
                        </Link>
                    </li>
                    <li className={activeTab == 'kosher' ? 'is-active' : ''} onClick={(e) => HandleClickTab(e, "kosher")}>
                        <Link to={`${bankUrl}?type=kosher`}>
                            <span className="icon is-small"><i className="far fa-file-alt" aria-hidden="true"></i></span>
                            <span>Kosher</span>
                        </Link>
                    </li>
                </ul>   
            </div>
        </div>

    );
}

export default BankFilters;