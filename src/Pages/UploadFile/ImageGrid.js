import React,{useState} from 'react';
import useFirestore from './useFirestore';
import Modal from './Modal';
import { motion } from 'framer-motion';
const ImageGrid = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedImgId , setSelectedImgId ] = useState(null);
    const {docs} = useFirestore('upload_image');
    console.log(docs);
    return(
        <>
        <div className='img-grid'>
            {docs && docs.map((doc)=>(
                    <motion.div className='img-wrap' key={doc.id}
                        layout
                        onClick={()=>{
                            setSelectedImg(doc.url);
                            setSelectedImgId(doc.id);
                        }}      
                    >
                        <img src={doc.url} alt='images' />
                    </motion.div>
                ))}
        </div>
        {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} imgID={selectedImgId} />}
        </>
    )

}

export default ImageGrid;