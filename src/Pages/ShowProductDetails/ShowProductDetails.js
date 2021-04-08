import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom"
import Header from '../AddPhoto/AddPhotoHeader'
import history from '../../Components/History'
import firebase from '../../Components/Firebase'
import Swal from 'sweetalert2';
import './ShowProductDetails.css'

export default function ShowProductDetails() {
    const location = useLocation();
    const [numberOfProduct,setNumberOfProduct] = useState(1)
    const ProductObject =  location.state? location.state.state : {}
    const handleAddToCart = () =>{
        // history.push({pathname:'/Cart'})
        const  CurrentUser = firebase.auth().currentUser;
        // console.log('==>',numberOfProduct , ' ==== ',CurrentUser)
        if(CurrentUser){
            // console.log('DONE ====>',CurrentUser.uid)
            firebase.database().ref(`Users/${CurrentUser.uid}/Cart/${ProductObject.productName}`).update({
                product_name:ProductObject.productName,
                product_detail:ProductObject.productDetail,
                product_price:ProductObject.productPrice,
                img_URL:ProductObject.url,
                no_of_quantity:numberOfProduct
            }).then(()=>{
                Swal.fire(
                    'Add Product',
                    'Your Product Add Successfully...',
                    'success'
                  )
            }).catch((error)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error}`,
                })
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login Or SignUp Your Account...',
                footer: '<a href=/login>Login&nbsp</a><label>&nbspor&nbsp</label><a href=/signUp>Sign-up</a>&nbspaccount?',
              })
        }
    }
    return (
        <>
        <Header text={'Product Details'} clock={true} />
        <div className='body-show-product-details'> 
               <div className='first-img-tag'>
                   <div className='inner-first-tag'>
                   <img src={ProductObject.url} alt='productImg' className={ProductObject.productType==='Frame'? 'first-frame-img-tag' : 'first-clock-img-tag'} />
                   </div>
                    
               </div>
               <div className='second-content-tag'>
                   <h6>{ProductObject ? ProductObject.productName : ''}</h6>
                   <h6>₹ {ProductObject ? ProductObject.productPrice : ''}</h6>
                   <h2>Best {ProductObject.productType} For Home Decoration</h2>
                   <p className='second-content-tag-p'>
                       {ProductObject ? ProductObject.productDetail : ''}
                        A product detail page (PDP) is a web page on an eCommerce site that presents the description of a specific product in view. The details displayed often include size, color, price, shipping information, reviews, and other relevant information customers may want to know before making a purchase. Typically, this information is presented alongside an actual photo of the item, as well as an “add to cart” button.
                   </p>
                   <div className='content-input-tag' >
                   <input 
                    type='number' 
                    value={numberOfProduct} 
                    onChange={(e) =>{
                        if(e.target.value>=1){
                            setNumberOfProduct(e.target.value)
                        }
                    }} />
                   <button className='btn btn-dark' onClick={handleAddToCart} >ADD TO CART</button>
                   </div>
               </div>
        </div>
        </>
    )
}


// import React, { Component } from 'react'

// export default class ShowProductDetails extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             numberOfProduct:0
//         }
//     }
//      handleAddToCart = () =>{
//         console.log('==>',this.state.numberOfProduct)
//     }
//     componentDidMount(){
//         console.log('PROPS====>',this.props)
//     }
//     render() {
//         return (
//             <div className='body-show-product-details'>
//             <div className='first-img-tag'>
//                  <img src='demo.png' />
//             </div>
//             <div className='second-content-tag'>
//                 <h6>product Name</h6>
//                 <h6>product Price</h6>
//                 <h2>Best Clock For home decoration</h2>
//                 <p>
//                     A product detail page (PDP) is a web page on an eCommerce site that presents the description of a specific product in view. The details displayed often include size, color, price, shipping information, reviews, and other relevant information customers may want to know before making a purchase. Typically, this information is presented alongside an actual photo of the item, as well as an “add to cart” button.
//                 </p>
//                 <div className='content-input-tag' >
//                 <input type='number' value={this.state.numberOfProduct} onChange={(e) => this.setState({numberOfProduct:e.target.value})} />
//                 <button className='btn btn-dark' onClick={this.handleAddToCart}>ADD TO CART</button>
//                 </div>
//             </div>
//             </div>
//         )
//     }
// }
