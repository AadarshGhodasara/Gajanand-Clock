import React from 'react';
import './ShowImages.css';
import Button from '@material-ui/core/Button';
import { storage , store } from '../../Components/Firebase';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
const Modal = ({selectedImg , setSelectedImg ,imgID}) => {

    console.log('1 =>',selectedImg);
    console.log('2 =>',setSelectedImg);
    console.log('3 =>',imgID);
    const handelClick = (e) => {
        console.log('=>',e);
        if(e === 'delete'){
            setSelectedImg(null);
        }else{
            if(e.target.classList.contains('backdrop')){
                setSelectedImg(null);
            }
        }
 
    }
    const deleteimg = () => {
        
        if( selectedImg !== '' ){
            // this.setState({isDelete:1});
            // storage.refFromURL
            store.collection('images').doc(imgID).delete().then(()=>{
                console.log('delete...');
            }).catch((err)=>{
                console.log(err);
            })
            let image = storage.refFromURL(selectedImg);
            image.delete().then(() => {
                handelClick('delete')
                console.log('delete..');
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    return(
        <div className="backdrop" onClick={handelClick}>
            <img src={selectedImg} alt='enlarged pic' />
            <Button 
                onClick={deleteimg}
                variant="contained" 
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                <label style={{width:'100%'}} htmlFor='del' >Delete</label>
            </Button>
        </div>
    )
}

export default Modal;