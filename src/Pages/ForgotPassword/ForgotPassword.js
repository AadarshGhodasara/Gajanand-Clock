import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl , FormLabel } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import firebase from '../../Components/Firebase'
import Link from '@material-ui/core/Link';
import Swal from 'sweetalert2';
import LoaderModel from '../../Components/Loader/LoaderModal';
export default function ForgotPassword() {
    const [email,setEmail] = useState('')
    const [isForgotPassword,setIsForgotPassword] = useState(false)
    const handleForgotPassEvent = () => {
        setIsForgotPassword(true)
        if(email){
            firebase.auth().sendPasswordResetEmail(email).then(function() {
              // Email sent.
              Swal.fire(
                'Forgot Password?',
                'Successful Email sent in your id...',
                'success'
              ).then(()=>{
                setIsForgotPassword(false)
              })
            }).catch(function(error) {
              // An error happened.
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              }).then(()=>{
                setIsForgotPassword(false)
              })
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter Email Address...',
              }).then(()=>{
                setIsForgotPassword(false)
              })
        }
    }
    return (
        <div className='Login-body'>
        <div className="tabelOutterTag" >
            
            <div className='tabelTag'>
                <div className='logo-css'>
                <Avatar style={{
                        color:'black',
                        backgroundColor:'#f48fb1',
                        height:'50px',
                        width:'50px'
                        }}>
                    <LockOutlinedIcon />
                </Avatar>
                </div>

                <label className='form-header'>Forgot Your Password?</label>
                <h5 className='text-white' style={{textAlign:'center'}}>No Worries! Enter your email and we will send you a reset.</h5>
                <div className='inputTag'>
                    <FormLabel className='label-css'>Email address</FormLabel>
                    <FormControl onChange={(e)=> setEmail(e.target.value)} type="email" size='lg' placeholder="Email" />
                </div>
                <div className='inputTag' style={{marginTop:'4%'}}>
                    <Button variant="contained" fullWidth={true} color="primary" 
                    onClick={handleForgotPassEvent}
                    >
                        Send Request
                    </Button>
                    {/* <input type="Submit" onClick={submitLogin}  /> */}
                </div>
                <div className='signUpLabelTag'>
                        <div>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </div>
                        <div>
                            <Link href="/signUp" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                </div>
                { isForgotPassword && <LoaderModel text='Forgot Password Processing...'  /> }
            </div>
        </div>
        </div>
    )
}
