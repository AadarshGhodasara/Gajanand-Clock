import React, {useState, useEffect} from 'react'
import Header from '../AddPhoto/AddPhotoHeader'
import { useParams } from "react-router-dom";
import history from '../../Components/History'
import firebase, {store} from '../../Components/Firebase'
import Swal from 'sweetalert2';
import './ShowProductDetails.css'

export default function ShowProductDetails() {
    const { id, type } = useParams();
    const [numberOfProduct,setNumberOfProduct] = useState(1)
    const [ProductObject,setProductObject] = useState({})
    useEffect(()=>{
        const docRef = store.collection(type).doc(id);
        docRef.get().then((doc)=>{
            if (doc.exists) {
                setProductObject(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    })
    const handleAddToCart = () =>{
        const  CurrentUser = firebase.auth().currentUser;
        if(CurrentUser){
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
                   <p className='mb-3 text-danger'>
                   {ProductObject? `${!ProductObject.productEnable? 'This product right now not available...' : '' }` : '' }
                   </p>
                   <div className='content-input-tag' >
                   <input 
                    type='number' 
                    disabled={ProductObject.productEnable?false:true}
                    value={numberOfProduct} 
                    onChange={(e) =>{
                        if(e.target.value>=1){
                            setNumberOfProduct(e.target.value)
                        }
                    }} />
                   <button className='btn btn-dark' disabled={ProductObject.productEnable?false:true} onClick={handleAddToCart} >ADD TO CART</button>
                   </div>
               </div>
        </div>
        </>
    )
}