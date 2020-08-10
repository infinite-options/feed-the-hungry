import React from 'react';
import Spinner from 'assets/image/Spinner.svg';

function LoadingInventory() {
    return (
        <div className="spinner">
            <figure className="image is-96x96">
                <img src={Spinner} />
            </figure>
        </div>
    );
}
export default LoadingInventory;