import React from 'react';
import { Link } from 'react-router-dom';
import Icons from 'components/Icons/Icons';

function BankFilters({bankUrl}){
    return (
        <div className='bank-filters'>        
            <div className="buttons">
                {/* <div className="control"> */}
                    <button className="button">
                        <span className="icon tooltip">
                            <Link to={`${bankUrl}/vegetarian`}><img src={Icons.Vegetarian} alt="Placeholder icon" /></Link>
                            <span className="tooltiptext">Vegetarian items only</span>
                        </span>
                    </button>
                    
                {/* </div> */}
                {/* <div className="control"> */}
                    <button className="button">
                        <span className="icon tooltip">
                            <Link to={`${bankUrl}/vegan`}><img src={Icons.Vegan} alt="Placeholder icon" /></Link>
                            <span className="tooltiptext">Vegan items only</span>
                        </span>
                    </button>
                {/* </div> */}
                {/* <div className="control"> */}
                    <button className="button">
                        <span className="icon tooltip">
                            <Link to={`${bankUrl}/gluten-free`}><img src={Icons.GlutenFree} alt="Placeholder icon" /></Link>
                            <span className="tooltiptext">Gluten-free items only</span>
                        </span>
                    </button>
                {/* </div> */}
                {/* <div className="control"> */}
                    <button className="button">
                        <span className="icon tooltip">
                            <Link to={`${bankUrl}/kosher`}><img src={Icons.Kosher} alt="Placeholder icon" /></Link>
                            <span className="tooltiptext">Kosher items only</span>
                        </span>
                    </button>
                {/* </div> */}
            </div>
        </div>

    );
}
export default BankFilters;