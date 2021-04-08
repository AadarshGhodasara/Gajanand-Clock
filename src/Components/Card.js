import React, { useEffect, useState } from 'react'
import fire from './Firebase'
import { useSelector } from 'react-redux';
import './Card.css'
import history from './History'
export default function Card({state}) {
    const isLogin = useSelector(state => state);
    const [isAdmin,setIsAdmin] = useState(false)
    useEffect(()=>{
        const CurrentUser = fire.auth().currentUser;
        if(CurrentUser && CurrentUser.uid==='XryKr3kHIdYbl8dmwccR23wmdop1'){
            setIsAdmin(true)
        }
    },[isLogin])
    const handleBuyNowEvent = ( ) => {
        history.push({
                        pathname:'/ShowProductDetails',
                        state:{state}
                    })
    }
    const handleEditProductEvent = ( ) => {
        history.push({
                        pathname:'/EditProductDetails',
                        state:{state}
                    })
    }
    return (
        <div className='card-tag'>
            <div className='card'>
                
                <div className='imgBx'> 
                    <img src={state.url} alt='product_img' />
                </div>
                {/* <div style={{position:'relative',height:'50px'}}></div> */}
                <div className='contentBx'>
                    <h3>{state.productName}</h3>
                    <h2 className='price'>₹ {state.productPrice}</h2>
                    {isAdmin && isLogin? 
                    <button  onClick={handleEditProductEvent} className='buy'>Edit</button>
                    :
                    <button  onClick={handleBuyNowEvent} className='buy'>Buy Now</button>
                    }
                </div>

            </div>
        </div>
    )
}
