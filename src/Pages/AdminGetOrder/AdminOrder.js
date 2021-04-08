import React, {useEffect, useState} from 'react'
import Header from '../AddPhoto/AddPhotoHeader'
import firebase from '../../Components/Firebase'
import Swal from 'sweetalert2';
import SearchIcon from '@material-ui/icons/Search';
import { useParams, Link } from "react-router-dom";
import LoaderModal from '../../Components/Loader/LoaderModal'
import {FormControl} from 'react-bootstrap'
import './AdminOrder.css'
export default function AdminOrder() {
const { id } = useParams();
let temp_user_id = '';
let isUserIdChange=false;
const [data,setData] = useState([])
const [temp,setTemp] = useState([])
const [isLoading,setIsLoading] = useState(false)
const [searchText,setSearchText] = useState('')
    useEffect(() => {
        setIsLoading(true)
        const  CurrentUser = firebase.auth().currentUser;
        // let total = 0
        // if(CurrentUser){
            var starCountRef = firebase.database().ref(`Users/${id}/Orders`);
            starCountRef.on('value', (snapshot) => {
            setData(snapshot.val())
            setIsLoading(false)
            });

        // }
    },[])

    const handleChangeStatusEvent = (e,product) => {
            firebase.database().ref(`Users/${product.user_id}/History/${product.product_access_name}`).update({
                Status:e.target.value
            }).then(()=>{
              firebase.database().ref(`Users/${id}/Orders/${product.user_id}/${product.product_access_name}`).update({
                Status:e.target.value
              }).then(()=>{
                  Swal.fire(
                    'Order Status',
                    'SuccessFul Change Order Status...',
                    'success'
                  )
              }).catch((error)=>console.log(error))
            }).catch((error)=>{
                console.log('ERROR=>',error)
            })
    }

    return (
        <div style={{width: '100%',fontFamily:'Montserrat,sans-serif'}}>
        <Header text={'Orders'} clock={true} />
        <div className="pb-5">
        <div className="container-fluid">
        <div className="row">
        <div className="col-lg-12  bg-white rounded shadow-sm mb-5 tableBody">

          <div className="table-responsive">
          <div style={{padding:'1%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <FormControl 
          onChange={(e)=> setSearchText(e.target.value)} 
          type="text" 
          size='lg' 
          placeholder="Search Product through product name..."
          className='search-bar' 
          />
          <SearchIcon style={{fontSize:'45px'}} />
          </div>
          
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
                    <div className="py-2 text-uppercase">Status</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                  {/* {console.log('DATA RENDER =>',data,Object.values(data))} */}
                {data ? 
                <> 
                {temp_user_id=''}
                {isUserIdChange=false}
                {Object.values(data).map((product)=>(
                  <>
                  {
                    Object.values(product).map((productValues)=>{ 
                      if(productValues.product_name){
                        if((productValues.product_name.toLowerCase()).includes(searchText.toLowerCase())){
                          if(temp_user_id===''){
                            temp_user_id=productValues.user_id
                            isUserIdChange=true
                          }else{
                            if(temp_user_id!==productValues.user_id){
                              temp_user_id=productValues.user_id
                              isUserIdChange=true
                            }else{
                              isUserIdChange=false
                            }
                          }
                          return(
                            <>
                            {/* {console.log('===============================>',isUserIdChange)} */}
                            {isUserIdChange? 
                            <tr>
                              <td className="border-0 align-middle"><strong>USER ID : <Link style={{color:'black'}} to={`/ShowUserDetails/${productValues.user_id}`}>{product.user_id}</Link></strong></td>
                            </tr>: null }
                            <tr>
                              <th scope="row" className="border-0">
                              <div className="p-2">
                                  
                                  <img src={productValues.img_URL} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                  <div className="ml-3 d-inline-block align-middle">
                                  <h5 className="mb-0"> <a href="/" className="text-dark d-inline-block align-middle">{productValues.product_name}</a></h5><span className="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
                                  </div>
                              </div>
                              </th>
                              <td className="border-0 align-middle"><strong>₹{productValues.product_price}</strong></td>
                              <td className="border-0 align-middle">
                                {productValues.no_of_quantity}
                              </td>
                              <td className="align-middle">
                                  <select defaultValue={productValues.Status} onChange={(e)=>handleChangeStatusEvent(e,productValues)} name="cars" id="cars" className='bg-primary text-white p-2'>
                                  <option value="Order Pending">Order Pending</option>
                                  <option value="Order Cancel">Order Cancel</option>
                                  <option value="Order Confirm">Order confirm</option>
                                  <option value="Order In Transition">Order In transition</option>
                                  <option value="Order dilivered">Order Dilivered</option>
                                  </select>
                              </td>
                          </tr>
                            </>
                          )
                           
                        }
                      }

                     })
                  }
                  {/* <tr>
                    <td className="border-0 align-middle"><strong>USER ID : <Link style={{color:'black'}} to={`/ShowUserDetails/${product.user_id}`}>{product.user_id}</Link></strong></td>
                  </tr> */}
                  {/* {Object.values(product).map((product)=>(
                    <>
                    {Object.keys(product).length <=8 ? 
                    <>
                      { (product.product_name.toLowerCase()).includes(searchText.toLowerCase()) ?  
                      <tr>
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
                        {product.no_of_quantity}
                      </td>
                      <td className="align-middle">
                          <select defaultValue={product.Status} onChange={(e)=>handleSelectEvent(e,product)} name="cars" id="cars" className='bg-primary text-white p-2'>
                          <option value="Order Pending">Order Pending</option>
                          <option value="Order Confirm">Order confirm</option>
                          <option value="Order In Transition">Order In transition</option>
                          <option value="Order dilivered">Order Dilivered</option>
                          </select>
                      </td>
                  </tr>
                  : null }
                    </>

                : null}
                    </>
                  ))} */}
                </>
                ))}</>: 
               <tr>
                  <th scope="row" colSpan='4' style={{textAlign:'center'}}>
                    <h2>You have no orders</h2>
                  </th>
                </tr> 
                }
              </tbody>
            </table>
            </div>
            </div>
            </div>
            </div>
            <div className="row py-5 p-4 bg-white rounded shadow-sm  d-flex justify-content-center align-items-center">
      </div>
    </div>
    { isLoading  && <LoaderModal text='Order loading...'  /> }
        </div>
    )
}
