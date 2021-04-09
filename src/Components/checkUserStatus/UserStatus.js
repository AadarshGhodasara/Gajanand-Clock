import React from 'react';
import firebase from '../Firebase';
import history from '../History';
import LoaderModal from '../Loader/LoaderModal';
import { useDispatch , useSelector } from 'react-redux';
import { setLogin , setLogout} from '../action/setLogged';
import './checkUserStatus.css';


function UserStatus() {

    const dispatch = useDispatch();
    const isLogin = useSelector(state => state);

    const CheckUserStatus = () =>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            dispatch(setLogin());
            window.localStorage.setItem('isLoading',isLogin);
            history.push({pathname:'/home'});
            } else {
                dispatch(setLogout());
                history.push({pathname:'/home'});
            }
          });
    }
    CheckUserStatus();
    return(
        <div style={{height:window.innerHeight}} className='loader-tag'>
            <LoaderModal text='Checking User Status...' />
        </div>
    );
}

export default UserStatus;