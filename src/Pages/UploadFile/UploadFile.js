import React, { useState } from 'react';
import './UploadFile.css';
import ProgressBar from './ProgressBar';
import Swal from 'sweetalert2'; 
import ImageGrid from './ImageGrid';

export default function UploadFile() {

    const [file,setFile] = useState(null);
    const types = ['image/png' , 'image/jpeg'];

    const changeHandler = (e) => {
        let select = e.target.files?.[0];
        if(select && types.includes(select.type)){
            setFile(select);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Select an images file (png or jpeg)',
              })
        }
    }

    return (
        <form>
            <div className='upload-header'>
                <h3>Upload Images</h3>
            </div>
            <h4>Upload image</h4>
            <label>
                <input type='file' onChange={changeHandler} />
                <span>+</span>
            </label>
            <div className='output'>
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} /> }
                <ImageGrid />
            </div>
        </form>
    )
}
