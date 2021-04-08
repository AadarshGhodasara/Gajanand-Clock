import React, {useEffect, useState} from 'react'
import history from '../../Components/History'
import { store, storage } from '../../Components/Firebase'
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import AddPhotoHeader from '../AddPhoto/AddPhotoHeader'
import LoaderModal from '../../Components/Loader/LoaderModal'
export default function EditProductDetails(props) {
    const types = ['image/png' , 'image/jpeg'];
    const location = useLocation();
    const [isProductImageChange,setIsProductImageChange] = useState(false)
    const [productId,setProductId] = useState('')
    const [productName,setProductName] = useState('')
    const [productPrice,setProductPrice] = useState(0  )
    const [productDetail,setProductDetail] = useState('')
    const [productType,setProductType] = useState('')
    const [productImgUrl,setProductImgUrl] = useState('')
    const [productFileName,setProductFileName] = useState('')
    const [productFile,setProductFile] = useState()
    const [isUpdate,setIsUpdate] = useState(true)
    useEffect(()=>{
        console.log('PROPS ==>',location.state.state)
        if(location.state.state){
            setProductId(location.state.state.id)
            setProductName(location.state.state.productName)
            setProductDetail(location.state.state.productDetail)
            setProductPrice(location.state.state.productPrice)
            setProductType(location.state.state.productType)
            setProductImgUrl(location.state.state.url)
            let image = storage.refFromURL(location.state.state.url);
            setProductFileName(image.name)
            console.log('IMAGES =>',image)

          }
    },[])

    const  updateProductDetails = async() => {
      setIsUpdate(false)
      let tempUrl = ''
      console.log('UPDATE PRODUCT DETAILS =>>>',isProductImageChange)
      if( productName || productDetail || productPrice || isProductImageChange){
        if(isProductImageChange){
          if(types.includes(productFile.type)){
          let image = storage.refFromURL(productImgUrl);
          image.delete()  
          await storage.ref(`${productType}/${productFile.name}`).put(productFile);
          await storage.ref(`${productType}`).child(productFile.name).getDownloadURL()
          .then((imgUrl) => {
              setProductImgUrl(imgUrl)
              tempUrl=imgUrl
          }).catch((err)=>{
            console.log('ERROR=>',err)
          })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Not Supported format...',
            }).then(()=>{
              let image = storage.refFromURL(location.state.state.url);
              setProductFileName(image.name)
            })
          }
        }
        store.collection(`${productType}`).doc(`${productId}`).update({
          productDetail:productDetail,
          productName:productName,
          productPrice:productPrice,
          productType:productType,
          url:tempUrl 
        }).then(()=>{
          Swal.fire(
            'Update Product Details',
            'successfully update product details...',
            'success'
          ).then(()=>{
            setIsUpdate(true)
          });
        }).catch((error)=>console.log('ERROR ==>',error));

      }
      
      let image = storage.refFromURL(tempUrl);
      setProductFileName(image.name)
      setIsProductImageChange(false)
    }

    const deleteProduct = () => {
      Swal.fire({
        title: 'Are you sure delete this product from online store?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          store.collection(`${productType}`).doc(`${productId}`).delete().then(()=>{
            let image = storage.refFromURL(productImgUrl);
            image.delete().then(() => {
                Swal.fire(
                    'Delete Product',
                    `Your ${productType} product successfully delete...`,
                    'success'
                  ).then(()=>{
                    history.push({ 
                      pathname: '/home',
                      });
                  })
            }).catch((error) => {
                console.log(error.message);
            })
          }).catch((err)=>{
              console.log(err);
          })
        }
      })
    }
    
    return (
        <>
    <AddPhotoHeader text='Edit Product Details' clock={true} />
    <div className="container mt-5">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Product Details</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="name"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Details"
              name="username"
              value={productDetail}
              onChange={e => setProductDetail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Price"
              name="phone"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
                {/* {console.log('====>',productType)} */}
                <select className="form-select form-select-lg  mb-2" aria-label=".form-select-lg example" value={productType} disabled >
                    <option >Select Product Type</option>
                    <option value="Clock">Clock</option>
                    <option value="Frame">Frame</option>
                </select>
          </div>
          {console.log('DEFAULT NAME=>',productFileName)}
          <div className="form-group">
                  <button 
                    onClick={() => {
                        document.getElementById('uploadFile').click()
                        return false
                      }
                    }
                  >Change Photo</button>
                  <label style={{marginLeft:'1%'}}>{productFileName}</label>
                  <input 
                    type="file" 
                    id='uploadFile'
                    style={{display:'none'}} 
                    className="form-control-file"
                    title='LOL'
                    onChange={(e)=>{
                      setIsProductImageChange(true)
                      setProductFile(e.target.files?.[0])
                      setProductFileName(e.target.files?.[0].name)
                      console.log('LOL====>',e.target.files?.[0])
                    }} 
                  />
          </div>
          <button className="btn btn-warning btn-block" onClick={updateProductDetails}>Update Product Details</button>
          <button className="btn btn-danger btn-block" onClick={deleteProduct}>Delete Product</button>
      </div>
      { !isUpdate && <LoaderModal text='Product Details Updating...'  /> }
    </div>
    </>
    )
}


// import React, { Component } from 'react'

// export default class EditProductDetails extends Component {
    
//     constructor(props){
//         super(props)
//     }
//     componentDidMount(){
//         console.log('PROPS=>',this.props)
//     }
//     render() {
//         return (
//             <>
//         <div className="container">
//           <div className="w-75 mx-auto shadow p-5">
//             <h2 className="text-center mb-4">Edit Product Details</h2>
//             <form >
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   placeholder="Enter Product Name"
//                   name="name"
//                 //   value={name}
//                 //   onChange={e => onInputChange(e)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   placeholder="Enter Product Details"
//                   name="username"
//                 //   value={username}
//                 //   onChange={e => onInputChange(e)}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   placeholder="Enter Product Price"
//                   name="phone"
//                 //   value={phone}
//                 //   onChange={e => onInputChange(e)}
//                 />
//               </div>
//               <div className="form-group">
//                     <select className="form-select form-select-lg  mb-2" aria-label=".form-select-lg example" >
//                         <option selected>Select Product Type</option>
//                         <option value="Clock">Clock</option>
//                         <option value="Frame">Frame</option>
//                     </select>
//               </div>
//               <div className="form-group">
//                 <input type="file" style={{color:'black'}} className="form-control-file" id="exampleFormControlFile1"></input>
//               </div>
//               <button className="btn btn-warning btn-block">Update Product Details</button>
//             </form>
//           </div>
//         </div>
//         </>
//         )
//     }
// }
