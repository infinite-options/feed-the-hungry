import React from 'react';
import './style.css';
import Loading from 'assets/image/loading.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icons from 'components/Icons/Icons';
function LoadingPage() {
    return(
        <div className="not-found-page">
            <div className="not-found-page-body"> 
                {/* <figure class="image is-128x128">
                <img src={Loading} alt="Not-found image"/>
                </figure>    */}
                <div className="not-found-page-content">
                <div className="icon">
                    <FontAwesomeIcon icon={Icons.faCircleNotch} style={{fontSize:50}}spin />
                </div>
                <div className="space-1"></div>
                <p className="title is-6 has-text-grey">Page is loading...</p>
                
                {/* <Link to="/"><button className="button is-green"><span className="icon"><FontAwesomeIcon icon={Icons.faLongArrowAltLeft} /></span><span>Back Home</span></button></Link> */}
                </div>   
            </div>
        </div>
    );
}
export default LoadingPage;