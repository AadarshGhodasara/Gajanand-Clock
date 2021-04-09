import React from 'react'
import './Home.css'
import background from "../../Components/img/hero-side-bg.png"; 
import brg from '../../Components/img/pic.jpg'
import brg2 from '../../Components/img/pic2.png'
import brg3 from '../../Components/img/pic3.png'
import {Carousel} from 'react-bootstrap'
export default function test() {
    return (
        <>
        <div className='back' style={{height:'100vh',display:'flex',flexDirection:'row'}}>  
            <Carousel style={{height:'100vh',display:'flex',flexDirection:'row',width:"100vw"}}>
                <Carousel.Item>
                <div className='home-contant-outter-tag'>
                    <div className='home-left-tag'>
                        <div className='home-left-inner-tag'>
                            <span className='first-span-tag'>THE LATEST</span>
                            <span className='span-tag'>Clock Design</span>
                            {/* <h4>Best Clock For Home Decoration</h4> */}
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
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
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
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
            </Carousel>
        </div>
        </>
    )
}
