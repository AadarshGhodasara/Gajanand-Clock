import React from 'react';
import './Service.css';
// import Image from 'react-bootstrap/Image'


function AboutOwner() {
    return(
        <div className='ServiceBody'>
            <div className='service-header'>
            <label className='service-header-text'><strong>Our Service</strong></label>
            <div className='service-header-hr'>
                    <hr style={{borderTop:'5px solid #00c6a7'}}></hr>
            </div>
            </div>
            <div className='service-tag'> 
                <div className='box-tag'>
                    <div className='box-img-tag'>
                    <img src='./clock.svg' alt="React Logo" className='img-css'/>
                    </div>
                    <div className='service-text-tag'>
                        <label className='service-box-header'> <strong> Clock Manufacturing </strong> </label>
                        <p className='text-css'>
                        This company manufacturing clocks of different styles including royal style to modern age style as well. Clocks having different kinds of frame and in also different kind of shapes which creates very good impression as house decoration.
                        </p>
                    </div>
                </div>
                <div className='box-tag'>
                    <div className='box-img-tag'>
                    <img src='./frame.svg' alt="React Logo" className='img-css'/>
                    </div>
                    <div className='service-text-tag'>
                        <label className='service-box-header'> <strong> Photo Frame </strong> </label>
                        <p className='text-css'>
                        This company manufacturing frames for the photos and wallpapers so that interior designing of house looks more nicer compare to normal photo hang on wall. Frames are kind of plastic so low weight, easy removal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutOwner;

                    