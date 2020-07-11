import React from 'react';
import './style.css';
import NotFound from 'assets/image/404.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from 'components/Icons/Icons';
function ErrorPage() {
    return(
        <div className="not-found-page">
            <div className="not-found-page-body"> 
                <figure class="image is-128x128">
                <img src={NotFound} alt="Not Found"/>
                </figure>   
                <div className="not-found-page-content">
                <p className="title is-6 has-text-grey">Oh no! the page you are looking for doesn't exist.</p>
                <Link to="/"><button className="button is-green"><span className="icon"><FontAwesomeIcon icon={Icons.faLongArrowAltLeft} /></span><span>Back Home</span></button></Link>
                </div>   
            </div>
        </div>
    );
}
export default ErrorPage;