import React, { useState } from 'react';
import useStore from '../../Components/hooks/useStore';
import Model from './Modal';
import { isLoading } from '../../Components/hooks/useStore'
import LoaderModel from '../../Components/Loader/LoaderModal';

const ShowImages = () => {
const [ selectedImg , setSelectedImg ] = useState(null);
const [ selectedImgId , setSelectedImgId ] = useState(null);
const { docs } = useStore('images');

    return(
        <div>
            <h1 className='show-img-header'>Show Images</h1>
            <div className='img-grid'>
                { docs && docs.map(doc => (
                    <div 
                        className='img-wrap' key={doc.id}
                        onClick={() => {
                            setSelectedImg(doc.url);
                            setSelectedImgId(doc.id);
                        }}
                    >
                        <img src={doc.url} alt='uploaded pic' />
                        
                    </div>
            ))}
            </div>
            {selectedImg && <Model selectedImg={selectedImg} setSelectedImg={setSelectedImg} imgID={selectedImgId} />}
            { isLoading  && <LoaderModel text='Photo loading...'  /> }
        </div>
    )
}
export default ShowImages;