import React from 'react';
import './AddPhotoHeader.css';
import white_back from '../../Components/img/white_back.svg'
import black_back from '../../Components/img/black_back.svg'
import history from '../../Components/History';
function AddPhotoHeader({ text , clock }) {
    const goback = () => {
        // console.log('back');
        history.goBack();
    }
    return(
        <div className={clock ? 'addclockphoto-header-tag' : 'addframephoto-header-tag' }>
            <div className='first-tag' onClick={goback} >
                <img src={clock ? white_back : black_back} alt='back icon' />
            </div>
            <div className='middle-tag'>
                <label className='addphoto-header-text'>
                    <strong>{text}</strong>
                </label>
            </div>
            <div className='first-tag'>
            </div>
        </div>
    )

}

export default AddPhotoHeader;