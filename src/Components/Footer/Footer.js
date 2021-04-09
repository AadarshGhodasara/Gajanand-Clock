import React from 'react'
import './Footer.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
export default function Footer() {
    return (
        <div className='footer-body'>
            <div className='footer-header'>
               <label>Gajanand Clock</label>
            </div>
            <div className='footer-content-tag'>
                <div className='first-content-tag'>
                    <label><strong>About Factory</strong></label>
                        <div  className='footer-address-tag'>
                            <div className='footer-address-tag-icon'>
                                <LocationOnIcon style={{ color: 'white' }} />
                            </div>
                            <p>
                                Morbi-Rajkot Highway,<br />
                                Manpasand Way-Bridge,<br />
                                At. Virpar, Dist. Morbi-1.
                            </p>
                        </div>
                        <div className='footer-address-tag'>
                            <div className='footer-address-tag-icon'>
                            <PhoneIcon style={{ color: 'white' }} />
                            </div>
                            <a href="tel:+917435820724">+91 74358 20724</a>
                            {/* <p> +91 74358 20724 </p>x */}
                        </div>
                        <div className='footer-address-tag'>
                            <div className='footer-address-tag-icon'>
                            <EmailIcon style={{ color: 'white' }} />
                            </div>
                            <p>gajanandframe@gmail.com</p>
                        </div>
                </div>
                <div className='second-tag'>
                    <label><strong>Information</strong></label>
                    <p>If any clients want to order in big chunk then, Gajanand clock happily eager to accept the order though products are not being manufactured for a long time.</p>
                      
                </div>
                <div className='thrid-content-tag'>
                    <label><strong>Connect With Us</strong></label>
                    <div className='social-media-icon-tag'>
                        {/* <a href='www.facebook.com'> */}
                            <FacebookIcon style={{ color: 'white',marginTop:'1%' }} fontSize='large'/>
                        {/* </a> */}
                        
                        <InstagramIcon style={{ color: 'white',marginTop:'3%' }} fontSize='large'/>
                        <TwitterIcon style={{ color: 'white',marginTop:'3%' }} fontSize='large'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
