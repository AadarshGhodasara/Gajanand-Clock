import React, {useEffect, useState} from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import firebase from '../../Components/Firebase'
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from '../AddPhoto/AddPhotoHeader'
import './Cart.css'
export default function Cart() {
// let Quantity=0
const { id } = useParams();
const [data,setData] = useState([])


const [isAddress,setIsAddress] = useState(false)
const [isUpdateAddress,setIsUpdateAddress] = useState(false)
const [address,setAddress] = useState([])
const [addressLine1,setAddressLine1] = useState('-')
const [addressLine2,setAddressLine2] = useState('-')
const [country,setCountry] = useState('-')
const [state,setState] = useState('-')
const [zipCode,setZipCode] = useState('-')
// const [addressLine1,setAddressLine1] = useState('')
// const [changeNoOfQuantity,setChangeNoOfQuantity] = useState(0)
const [totalPrice,setTotalPrice] = useState(0)
    useEffect(() => {
        // const  CurrentUser = firebase.auth().currentUser;
        // console.log('INNNNNNNN=>',CurrentUser)
        let total = 0
        // if(CurrentUser){
            var starCountRef = firebase.database().ref(`Users/${id}/Cart`);
            starCountRef.on('value', (snapshot) => {
            setData(snapshot.val())
            if(snapshot.val() !== null){
              Object.values(snapshot.val()).map((product)=>{
                total = total +  ( product.product_price*product.no_of_quantity)
              })
              setTotalPrice(total)
              total=0
            }
            });
            starCountRef = firebase.database().ref(`Users/${id}/Address`);
            starCountRef.on('value', (snapshot) => {
              // setData(snapshot.val())
              if(snapshot.val() === 'none'){
                setIsAddress(false)
              }else{
                setAddress(snapshot.val())
                setAddressLine1(snapshot.val().address_line_1); 
                setAddressLine2(snapshot.val().address_line_2);
                setCountry(snapshot.val().country); setZipCode(snapshot.val().zipcode);
                setState(snapshot.val().state)
                setIsAddress(true)
              }
            })
        // }
    },[])

    const handleRemoveItem = (productName,productPrice,noOfQuantity) => {
      // const  CurrentUser = firebase.auth().currentUser;
      setTotalPrice( totalPrice-(productPrice*noOfQuantity) )
      firebase.database().ref(`Users/${id}/Cart/${productName}`).remove();
    }
    const updateProductQuantity = (product,e) => {
      Object.assign(product,{no_of_quantity:e.target.value})
      // const  CurrentUser = firebase.auth().currentUser;
      // if(CurrentUser){
        firebase.database().ref(`Users/${id}/Cart/${product.product_name}`).update({
          no_of_quantity:e.target.value
        })
      // }
    }
    const handleCheckoutEvent = (data) => {
      // const  CurrentUser = firebase.auth().currentUser;
      firebase.database().ref(`Users/XryKr3kHIdYbl8dmwccR23wmdop1/Orders/${id}`).update({
        user_id:id
      })
      
      Object.values(data).map((product)=>{
        const date = new Date()
        Object.assign(product,{status:'Order Pending'})
        Object.assign(product,{product_access_name: product.product_name+` ${date.toUTCString()}`})
        // console.log('Product DETAILS ===>',CurrentUser.uid)
        // console.log('CurrentUser=>',CurrentUser)
          // if(CurrentUser){
          firebase.database().ref(`Users/${id}/History/${product.product_name +` ${date.toUTCString()}`}`).update({
              product_name:product.product_name,
              product_detail:product.product_detail,
              product_price:product.product_price,
              img_URL:product.img_URL,
              no_of_quantity:product.no_of_quantity,
              Status:product.status,
              product_access_name:product.product_access_name
          }).then(()=>{
              Swal.fire(
                  'Add Product',
                  'Your Order SuccessFul Send...',
                  'success'
                ).then(()=>{
                  firebase.database().ref(`Users/${id}/Cart`).remove();
                  setTotalPrice(0)
                })
          }).catch((error)=>{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `${error}`,
              })
          })

          firebase.database().ref(`Users/XryKr3kHIdYbl8dmwccR23wmdop1/Orders/${id}/${product.product_name +` ${date.toUTCString()}`}`).update({
            product_name:product.product_name,
            product_detail:product.product_detail, 
            product_access_name:product.product_access_name,
            product_price:product.product_price,
            img_URL:product.img_URL,
            no_of_quantity:product.no_of_quantity,
            Status:product.status,
            user_id:id
        }).catch((error)=>{
          console.log('ERROR : ',error)
        })
      // }else{
      //     Swal.fire({
      //         icon: 'error',
      //         title: 'Oops...',
      //         text: 'Please Login Or SignUp Your Account...',
      //         footer: '<a href=/login>Login&nbsp</a><label>&nbspor&nbsp</label><a href=/signUp>Sign-up</a>&nbspaccount?',
      //       })
      // }
      })
      // console.log("CHECKOUT DATA=>",data,)
      
    }

    const handleAddressEvent = () => {
      if(addressLine1 === '-' || addressLine1===''){
        setAddressLine1('')
      }
      if(addressLine2 === '-' || addressLine2===''){
        setAddressLine2('')
      }
      if(country === '-' || country===''){
        setCountry('')
      }
      if(state === '-' || state===''){
        setState('')
      }
      if(zipCode === '-' || zipCode===''){
        setZipCode('') 
      }
      if( addressLine1 && addressLine1!=='-' && addressLine2 && addressLine2!=='-' && country && country!=='-' && state && state!=='-' && zipCode && zipCode!=='-'){
        // const  CurrentUser = firebase.auth().currentUser;
        firebase.database().ref(`Users/${id}/Address`).set({
          address_line_1:addressLine1,
          address_line_2:addressLine2,
          zipcode:zipCode,
          state:state,
          country:country
        }).then(()=>{
          if(isUpdateAddress){
            Swal.fire(
              'Update Address',
              'Successful Update Address',
              'success'
            )
            setIsUpdateAddress(false)
          }else{
            Swal.fire(
              'Set Address',
              'Successful Add Address',
              'success'
            )
          }
        })
      }else{

      }

    }

    const handleChangeAddressEvent = (address) => {
      setAddressLine1(address.address_line_1)
      setAddressLine2(address.address_line_2)
      setState(address.state)
      setCountry(address.country)
      setZipCode(address.zipcode)
    }

    return (
        <>
        <Header text={'Cart'} clock={true} />
        <div className="pb-5" style={{fontFamily:'Montserrat,sans-serif'}}>
        <div className="container-fluid">
        <div className="row">
        <div className="col-lg-12 bg-white rounded shadow-sm mb-5 cartTableBody">

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 bg-light">
                    <div className="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data ? 
                <> 
                {Object.values(data).map((product)=>(
                    <tr>
                        {/* { setTotalPrice(totalPrice+(product.product_price*product.no_of_quantity)) } */}
                    <th scope="row" className="border-0">
                    <div className="p-2">
                        
                        <img src={product.img_URL} alt="" width="70" className="img-fluid rounded shadow-sm" />
                        <div className="ml-3 d-inline-block align-middle">
                        <h5 className="mb-0"> <a href="/" className="text-dark d-inline-block align-middle">{product.product_name}</a></h5><span className="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
                        </div>
                    </div>
                    </th>
                    <td className="border-0 align-middle"><strong>₹{product.product_price}</strong></td>
                    <td className="border-0 align-middle">
                      {console.log('UPDATE BEFORE=>',product)}
                      <input 
                        type='number' 
                        value={product.no_of_quantity} 
                        onChange={(e)=>{
                          if(e.target.value>0){
                            updateProductQuantity(product,e)
                          }
                        }}  
                        className='quantityInputBox'
                      />
                    </td>
                    <td className="border-0 align-middle" onClick={() => handleRemoveItem(product.product_name,product.product_price,product.no_of_quantity)}><DeleteIcon /></td>
                </tr>
                ))}</>: 
               <tr>
                  <th scope="row" colSpan='4' style={{textAlign:'center'}}>
                    <h2>Cart Is Empty</h2>
                  </th>
                </tr> 
                }

              </tbody>
            </table>
            </div>
            </div>
            </div>
            </div>
            <div className='container'>
              {/* <div className="mb-3">
                <h4 class="mb-3">Billing Address</h4>
              </div> */}
              {isAddress ?
              <>
               <div className="mb-3 container">
                 <div className='mx-auto shadow p-5 bg-red '>
                  <div className='d-flex justify-content-between'>
                  <h4 className="mb-3">Shipping Address</h4>
                  <button 
                    className='btn btn-primary' 
                    onClick={()=>{
                      setIsAddress(false)
                      setIsUpdateAddress(true)
                      handleChangeAddressEvent(address)
                    }}
                  >Change Address</button>
                  </div>
                  
                  <hr className="mb-4"></hr>
                  <h6>{address.address_line_1}</h6>
                  <h6>{address.address_line_2? address.address_line_2 : null}</h6>
                  <h6>{address.state}</h6>
                  <h6>{address.country}</h6>
                  <h6>{address.zipcode}</h6>
                </div>
               </div>
              </>
              :
              <>
              <div className='mx-auto mb-3 shadow p-5 bg-red'>
              <h4 className="mb-3">Shipping Address</h4>
              <div className="mb-3">
                  <label for="address">Address</label>
                  <input type="text" value={addressLine1!=='-'?addressLine1:''} onChange={(e)=>setAddressLine1(e.target.value)} className="form-control" id="address" placeholder="1234 Main St" required="" />
                  {!addressLine1 ?  <div className="text-danger"> Please enter your shipping address. </div>: null }
                </div>
                <div className="mb-3">
                    <label for="address2">Address 2</label>
                    <input type="text" value={addressLine2!=='-'?addressLine2:''} onChange={(e)=>setAddressLine2(e.target.value)} className="form-control" id="address2" placeholder="Apartment or suite" />
                    {!addressLine2 ?  <div className="text-danger"> Please enter your shipping address. </div>: null }
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <select className="custom-select d-block w-100" defaultValue={country!=='-'?country:''} onChange={(e)=>setCountry(e.target.value)} id="country" required="">
                            <option value="">Choose...</option>
                            <option value="India">India</option>
                        </select>
                        {!country ? 
                        <div className="text-danger"> Please select a valid country. </div>
                        : null }
                    </div>
                    <div className="col-md-4 mb-3">
                        <label for="state">State</label>
                        <select className="custom-select d-block w-100" defaultValue={state!=='-'?state:''} onChange={(e)=>setState(e.target.value)} id="state" required="">
                            <option value="">Choose...</option>
                            <option value="Gujarat">Gujarat</option>
                        </select>
                        {!state ? 
                        <div className="text-danger"> Please provide a valid state. </div>
                        : null }
                    </div>
                    <div className="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" value={zipCode!=='-'?zipCode:''} className="form-control" id="zip" onChange={(e)=>setZipCode(e.target.value)} placeholder="" required="" />
                        {!zipCode ? 
                        <div className="text-danger"> Zip code required. </div>
                        : null }
                    </div> 
                </div>
              {isUpdateAddress ? 
              <div className='d-flex justify-content-around'>
              <button className="btn btn-warning col-5" onClick={handleAddressEvent} >Update Address</button>
              <button className="btn btn-secondary col-5" onClick={()=>setIsAddress(true)} >Cancel</button>
              </div>
              :
              <button class="btn btn-primary btn-lg btn-block" onClick={handleAddressEvent}>Add Address</button> 
              }
              </div>
              </>
              }  
            </div>
            <div className="row py-5 p-4 bg-white rounded shadow-sm  d-flex justify-content-center align-items-center">
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div className="p-4">
                  <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                  <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Payment Method</strong><strong>Cash On Delivery</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>₹{totalPrice}</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>₹00.00</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                      <h5 className="font-weight-bold">₹{totalPrice}</h5>
                    </li>
                  </ul><button onClick={()=>handleCheckoutEvent(data)} disabled={totalPrice && Object.values(address).length ? false : true} className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</button>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}
