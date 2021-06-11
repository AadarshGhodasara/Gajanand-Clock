import React from 'react'
import './NotFoundPage.css'
import history from '../../Components/History'
export default function NotFoundPage() {

    const handleHomeEvent = () => {
        history.push({pathname:'/home'})
    } 
    return (
        <div className='notFound-page-body'>
                <div className="glitch">
                    <div className="text">PAGE NOT FOUND</div>
                    <button className='notFound-btn' onClick={handleHomeEvent}>Back to home</button>
                </div>
        </div>
    )
}
