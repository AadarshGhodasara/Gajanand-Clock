import React, { useEffect, useState } from 'react';
import './Home.css';
import {  Nav  } from 'react-bootstrap';
import brg2 from '../../Components/img/pic2.png'
import brg3 from '../../Components/img/pic3.png'
import {Carousel} from 'react-bootstrap'
import background from "../../Components/img/hero-side-bg.png"; 
const { Link } = Nav;


export default function Home() {
    const [isControls,setIsControls] = useState(false)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const changeWidth = () => {
        if(window.innerWidth >=769){
            setIsControls(true);
        }else{
            setIsControls(false);
        }
    }
    const handleReadMoreEvent = () => {
        window.scrollTo(0,725)
    }
    const handleContactUsEvent = () => {
        window.scrollTo(0,3800)
    }
    window.addEventListener('resize',changeWidth)
    return (
        <>
        <div className='back' style={{height:'100vh',display:'flex',flexDirection:'row',fontFamily:'Montserrat,sans-serif'}}>  
        <div className='home-contant-outter-tag'>
                    <div className='home-left-tag'>
                        <div className='home-left-inner-tag'>
                            <span className='first-span-tag'>THE LATEST</span>
                            <span className='span-tag'>Clock Design</span>
                            <p className='contentParagraph'>It is the time you have wasted for your rose that makes your rose so important</p>
                            <div className='btn-tag'>
                                <a href='#About'>
                                <button className='btn-1' onClick={()=>handleReadMoreEvent()}>Read More</button>
                                </a>
                                <button className='btn-2' onClick={()=>handleContactUsEvent()} style={{marginLeft:'1%'}}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                    <div className='black-round-outter'>
                        {/* <div className='black-round'> */}
                        <Carousel>
                        <Carousel.Item>
                        <div className='black-round-outter'>
                        <div className='black-round'>
                            <img
                                className="d-block w-100"
                                src={brg2}
                                alt="First slide"
                                style={{maxWidth:'80%'}}
                            />                       
                        </div> 
                        </div>   
                        </Carousel.Item>
                        <Carousel.Item>
                        <div className='black-round-outter'>
                        <div className='black-round'>
                            <img
                                className="d-block w-100"
                                src={brg3}
                                alt="First slide"
                                style={{maxWidth:'80%'}}
                            />                       
                        </div> 
                        </div>                           
                        </Carousel.Item>
                        </Carousel>
                        {/* </div> */}
                    </div>  
                </div>
            {/* <Carousel controls={isControls}	 style={{height:'100vh',display:'flex',flexDirection:'row'}}>
                <Carousel.Item>
                <div className='home-contant-outter-tag'>
                    <div className='home-left-tag'>
                        <div className='home-left-inner-tag'>
                            <span className='first-span-tag'>THE LATEST</span>
                            <span className='span-tag'>Clock Design</span>
                            <p className='contentParagraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                            <div className='btn-tag'>
                                <button className='btn-1'>Read More</button>
                                <button className='btn-2' style={{marginLeft:'1%'}}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                    <div className='black-round-outter'>
                        <div className='black-round'>
                                <img
                                    className="d-block w-100"
                                    src={brg2}
                                    alt="First slide"
                                    style={{maxWidth:'80%'}}
                                />
                        </div>
                    </div>  
                </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className='home-contant-outter-tag'>
                    <div className='home-left-tag'>
                        <div className='home-left-inner-tag'>
                            <span className='first-span-tag'>THE LATEST</span>
                            <span className='span-tag'>Clock Design</span>
                            <p className='contentParagraph'>2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                            <div className='btn-tag'>
                                <button className='btn-1'>Read More</button>
                                <button className='btn-2' style={{marginLeft:'1%'}}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                    <div className='black-round-outter'>
                        <div className='black-round'>
                                <img
                                    className="d-block w-100"
                                    src={brg2}
                                    alt="First slide"
                                    style={{maxWidth:'80%'}}
                                />
                        </div>
                    </div>  
                </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className='home-contant-outter-tag'>
                    <div className='home-left-tag'>
                        <div className='home-left-inner-tag'>
                            <span className='first-span-tag'>THE LATEST</span>
                            <span className='span-tag'>Clock Design</span>
                            <p className='contentParagraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                            <div className='btn-tag'>
                                <button className='btn-1'>Read More</button>
                                <button className='btn-2' style={{marginLeft:'1%'}}>Contact Us</button>
                            </div>
                        </div>
                    </div>
                    <div className='black-round-outter'>
                        <div className='black-round'>
                                <img
                                    className="d-block w-100"
                                    src={brg3}
                                    alt="First slide"
                                    style={{maxWidth:'80%'}}
                                />
                        </div>
                    </div>  
                </div>
                </Carousel.Item>
            </Carousel> */}
        </div>
        </>
    )
}
