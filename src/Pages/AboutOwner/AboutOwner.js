import React from 'react';
import './AboutOwner.css';
import Image from 'react-bootstrap/Image'

function AboutOwner() {
    return(
        <div className='Body'>
            <div className='About-header'>
            <label className='About-header-text'><strong>About Owner</strong></label>
            <div className='aboutOwner-header-hr'>
                    <hr style={{borderTop:'5px solid #00c6a7'}}></hr>
            </div>
            </div>
            <div className='About-tag'> 
                <div className='content-tag'>
                    <p>
                    Nilesh Patel is owner of the company, who also owns 2 different companies having name of "Gajanand" to represent his business. He is masterclass in this business for a very long time period of more than 18 years in "Morbi", which is famous as "ceramic city". He leads his company to many known people of Gujarat to raise his business to another level.
                    </p>
                </div>
                <div className='Owner-img-tag'>
                    <Image src="user.png" thumbnail className='Owner-img' width='350' height='350' />
                </div>
            </div>
        </div>
    )
}

export default AboutOwner;
