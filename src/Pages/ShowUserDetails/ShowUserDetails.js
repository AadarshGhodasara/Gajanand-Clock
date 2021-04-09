import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import firebase from '../../Components/Firebase'
import Header from '../AddPhoto/AddPhotoHeader'
import './ShowUserDetails.css'
export default function ShowUserDetails() {
    const { id } = useParams();
    const [userData,setUserData] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        if(id){
          setIsLoading(false)
          var starCountRef = firebase.database().ref(`Users/${id}`);
          starCountRef.on('value', (snapshot) => {
          setUserData(snapshot.val())
          console.log("History DATA ==>",snapshot.val().Address.address_line_1)
          setIsLoading(true)
          });
        }
    },[])
    return (
    <>
        <Header text={'User Details'} clock={true} />
        <div className="container py-4">
        {/* <Link className="btn btn-primary" to="/">
          back to Home
        </Link> */}
        {/* {console.log('----------*****------------>',userData.Address.address_line_1)} */}
        <h1 className='user-id-text'>User Id: {id}</h1>
        <hr />
        <ul className="list-group w-80">
          <li className="list-group-item">User name: <strong>{userData?.user_name}</strong> </li>
          <li className="list-group-item">Name: <strong>{userData?.Full_Name}</strong></li>
          <li className="list-group-item">Email: <strong>{userData?.Email}</strong></li>
          <li className="list-group-item">
            {/* Shipping Address: */}
            <div className="mb-3 container">
                 <div className='mx-auto shadow p-5 bg-red userAddressTableBody'>
                  <div className='d-flex justify-content-between'>
                  <h4 className="mb-3">Shipping Address</h4>
                  </div>
                  
                  <hr className="mb-4"></hr>
                  <h6>{userData?.Address?.address_line_1}</h6>
                  <h6>{userData?.Address?.address_line_2}</h6>
                  <h6>{userData?.Address?.state}</h6>
                  <h6>{userData?.Address?.country}</h6>
                  <h6>{userData?.Address?.zipcode}</h6>
                </div>
               </div>
          </li>
          {/* <li className="list-group-item">phone: </li> */}
          {/* <li className="list-group-item">website: </li> */}
        </ul>
      </div>
    </>
    )
}
