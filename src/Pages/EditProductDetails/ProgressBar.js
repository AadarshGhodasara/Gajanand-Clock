import React, { useEffect, useState } from 'react'
import useStorage from './useStorage';

const ProgressBar = ({file, setFile}) => {
    const {url, progress} = useStorage(file);

    useEffect(()=>{

        if(url){
            setFile(null);
        }

    },[url, setFile]);

    return(
        <div className='progress-bar' style={{width:progress+'%'}}></div>
    )
}

export default ProgressBar;