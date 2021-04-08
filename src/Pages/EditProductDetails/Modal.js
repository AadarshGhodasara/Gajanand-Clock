import React from 'react';
import './UploadFile.css';
import { motion } from 'framer-motion';
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
            store.collection('upload_image').doc(imgID).delete().then(()=>{
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
        <motion.div className="backdrop" onClick={handelClick}>
            <motion.img src={selectedImg} alt='enlarged pic'
                initial={{y:'-100vh'}}
                animate={{y:0}}
            />
            <Button 
                onClick={deleteimg}
                variant="contained" 
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
        </motion.div>
    )
}

export default Modal;