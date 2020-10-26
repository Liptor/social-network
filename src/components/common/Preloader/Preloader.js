import React from 'react';
import preloader from './../../../assets/Images/Spinner-0.5s-137px.svg'

let Preloader = (props) => {
    return (<div style={ {backgroundColor: 'white'} }>
        <img src={ preloader } />
    </div>)
}

export default Preloader;
