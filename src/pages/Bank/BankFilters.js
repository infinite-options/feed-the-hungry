import React from 'react';
import { Link } from 'react-router-dom';
import Icons from 'components/Icons/Icons';

function BankFilters({bankUrl}){
    return (
        <div className='bank-filters'>        
            <div class="tabs">
                <ul>
                    <li class="is-active">
                    <a>
                        <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
                        <span>Vegetarian</span>
                        <p>asdasd</p>
                    </a>
                    </li>
                    <li>
                    <a>
                        <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
                        <span>Vegan</span>
                    </a>
                    </li>
                    <li>
                    <a>
                        <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
                        <span>Gluten-free</span>
                    </a>
                    </li>
                    <li>
                    <a>
                        <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
                        <span>Kosher</span>
                    </a>
                    </li>
                </ul>   
            </div>
        </div>

    );
}
export default BankFilters;