import React from 'react';
import './AddClockPhoto.css';
import { storage , store , timestamp  } from '../../Components/Firebase';
import LoaderModel from '../../Components/Loader/LoaderModal';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/AddAPhoto';
// import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import history from '../../Components/History';
import AddPhotoHeader from './AddPhotoHeader';
import Swal from 'sweetalert2';
// import { FormControl , FormLabel } from 'react-bootstrap';
const types = ['image/png' , 'image/jpeg'];



class AddPhoto extends React.Component {
    constructor(props) {
        super(props);
         this.state = { 
             pictures: [] ,
             image : '',
             url : '',
             productName:'',
             productDetail:'',
             productPrice:'',
             productType:'',
             selectFile:'',
             imageId:null,
             isUpload:null,
             isDelete:null
        };
    }


      uploadImage = () => {
        const {selectFile} = this.state;
        if(selectFile && types.includes(selectFile.type)){
            this.setState({url:'',isUpload:1});
            let url='';
            const image = selectFile;
            const uploadTask = storage.ref(`${this.state.productType}/${image.name}`).put(image);
            const collectionRef = store.collection(`${this.state.productType}`);
            uploadTask.on('state_changed',
            (snapshot) => {
                // progress function
            },
            (error) => {
                // error function
                console.log(error);
            },
            async () => {
                // complete function
                await storage.ref(`${this.state.productType}`).child(image.name).getDownloadURL()
                .then((imgUrl) => {
                    url = imgUrl;
                    this.setState({url : imgUrl});
                    // alert('Image successfully upload...')
                })
                const createAt = timestamp();
                const {productName, productDetail, productPrice, productType} = this.state
                collectionRef.add({ url , createAt, productName, productDetail, productPrice, productType }).then(
                    (docRef) => {
                        this.setState({imageId : docRef.id});
                    }
                );  
                Swal.fire(
                    'Clock Image upload',
                    'Your Clock Image successfully upload...',
                    'success'
                  ).then(()=>{
                    this.setState({isUpload:null,productName:'',productDetail:'',
                    productType:'',productPrice:''});
                    document.getElementById("uploadFile").value = "";
                  });
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Not Supported format...',
              })
            this.setState({url:'',isUpload:null});
        }

    }

    deleteImg = () => {
        if( this.state.url){
            this.setState({isDelete:1});
            // storage.refFromURL
            store.collection('images').doc(this.state.imageId).delete().then(()=>{
            }).catch((err)=>{
                console.log(err);
            })
            let image = storage.refFromURL(this.state.url);
            image.delete().then(() => {
                this.setState({isDelete:null , url:'',imageId:null});
                // collectionRef.
                Swal.fire(
                    'Clock Image Delete',
                    'Your Clock Image successfully Delete...',
                    'success'
                  );
                console.log('delete');
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }
    goback = () => {
        history.push({pathname:'/'})
    }

    render(){
        const {isUpload, isDelete,productName,productDetail,productPrice,productType} = this.state;
        return(
            <>
                <AddPhotoHeader text='Add Product' clock={true} />  
                <div className='addPhoto-body'>
                    {/* <div className='addPhoto-outter-tag'>              
                        <div className='upload-img-tag'>
                            <input 
                                type="file" 
                                name="uploadfile" 
                                onChange={this.uploadImg} 
                                id="img" 
                                style={{display:'none'}}
                            />
                            <input 
                                type="button" 
                                onClick={this.deleteImg} 
                                id="del" 
                                style={{display:'none'}}
                            />  
                            <div className='show-img-tag'>
                                <img src={url || 'https://via.placeholder.com/400x300'} alt="Upload logo" className={ url ? 'img-tag' : 'default-img-tag'} />
                            </div>                      
                            <div className='btn-tag'>
                                    <Button 
                                        className='upload-btn' 
                                        variant="contained" 
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        <label className='btn-text-css' htmlFor="img">Add</label>
                                    </Button>
                                <Button 
                                        className='upload-btn' 
                                        variant="contained" 
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                    >
                                        <label className='btn-text-css' htmlFor='del' >Delete</label>
                                    </Button>
                            </div>
                        </div>
                    </div> */}
                    {/* <div>
                        <FormLabel className='label-css' >Product Name</FormLabel>
                        <FormControl type="text" size='lg' placeholder="" onChange={(e)=>this.setState({productName:e.target.value})} />                            
                    </div>
                    <div className='mt-2'>
                        <FormLabel className='label-css' >Product Details</FormLabel>
                        <FormControl type="text" size='lg' placeholder="" onChange={(e)=>this.setState({productDetail:e.target.value})}/>                            
                    </div>
                    <div className='mt-2'>
                        <FormLabel className='label-css' >Product Type</FormLabel><br/>                    
                        <select class="form-select form-select-lg  mb-2" aria-label=".form-select-lg example" onChange={(e)=>this.setState({productType:e.target.value})}>
                            <option selected>Select Product Type</option>
                            <option value="Clock">Clock</option>
                            <option value="Frame">Frame</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <FormLabel className='label-css' >Product Price</FormLabel>
                        <FormControl type="number" size='lg' placeholder="" onChange={(e)=>this.setState({productPrice:e.target.value})}/>                            
                    </div>
                    <div className='mt-4'>
                        {/* <FormLabel className='label-css' >Product Image File</FormLabel> */}
                        {/* <FormControl type="file" style={{color:'white'}} size='lg' placeholder="" onChange={(e)=>this.setState({selectFile:e.target.files?.[0]}) } />                            
                    </div>
                    <div class="mt-4">
                        <button class="btn btn-primary" style={{width:'100%'}} type="button" onClick={this.uploadImg}>ADD</button>
                    </div> */} 
                    
                    <div className="container mt-5">
                    <div className="mx-auto shadow p-5 bg-red addPhotoTableBody">
                        <h2 className="text-center mb-4">Add Product</h2>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Product Name"
                            name="name"
                            value={productName}
                            onChange={(e)=>this.setState({productName:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Product Details"
                            name="username"
                            value={productDetail}
                            onChange={(e)=>this.setState({productDetail:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Product Price"
                            name="phone"
                            value={productPrice}
                            onChange={(e)=>this.setState({productPrice:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                                <select 
                                    className="form-select form-select-lg  mb-2" 
                                    aria-label=".form-select-lg example" 
                                    value={productType} 
                                    // defaultValue={productType}
                                    onChange={(e)=>this.setState({productType:e.target.value})} 
                                >
                                    <option value=''>Select Product Type</option>
                                    <option value="Clock">Clock</option>
                                    <option value="Frame">Frame</option>
                                </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="file" 
                                id='uploadFile'
                                style={{color:'black'}} 
                                className="form-control-file" 
                                onChange={(e)=>{
                                    console.log('____======>',e.target.files)
                                    this.setState({selectFile:e.target.files?.[0]})
                                }} 
                            />
                        </div>
                        <button className="btn btn-primary btn-block" onClick={this.uploadImage}>Add Product</button>
                    </div>
                    </div>
                    
                    { isUpload && <LoaderModel text='Photo Uploading...'  /> }
                    { isDelete && <LoaderModel text='Photo Deleteing...'  /> }
                </div>
            </>
        );
    }
}

export default AddPhoto;



    