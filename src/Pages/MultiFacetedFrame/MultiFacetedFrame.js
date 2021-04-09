import React, { useState } from 'react'
import './MultiFacetedFrame.css';

const Img = [
    './frame_2.jpg','./frame_3.png',
]

export default function MultiFacetedFrame() {
    const [selectImg,setSelectImg] = useState(Img[0]);
    return (
        <div className='outter'>
            <img src='./user.png' alt='Upload Img' style={{border:'20px solid transparent',borderImage:`url(${selectImg}) 15% round`}} />
            <div className='frame-tag'>
                {
                    Img.map((img,index)=>(
                        <img 
                        src={img} 
                        key={index}
                        style= {selectImg === img ? {border:'4px solid purple',padding:'5px'} :{}} 
                        alt='Frame Img'
                        onClick={()=>{setSelectImg(img)}}
                        />
                    ))
                }
                
            </div>
        </div>
    )
}
