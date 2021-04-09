import React  from 'react';
import './ContactUs.css';
import { Form , Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const ContactUs = () => {

    const handleSendEmailEvent = (e) => {
        e.preventDefault();
        emailjs.sendForm(
                        process.env.REACT_APP_SERVICE_ID,
                        process.env.REACT_APP_TEMPLATE_ID,
                        e.target,
                        process.env.REACT_APP_USER_ID)
          .then((result) => {
              console.log(result.text);
              Swal.fire(
                'Send Message',
                'Your Mail has been send. Thank you for connecting.',
                'success'
              );
            
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
    } 
    return(
        <div className='ContactUs-body'>
            <div className='ContactUs-header'>
                <label className='ContactUs-header-text'><strong>Contact Us</strong></label>    
                <div className='ContactUs-header-hr'>
                <hr style={{borderTop:'5px solid #00c6a7'}}></hr>
                </div>
            </div>
            <div className='ContactUs-tag'>
                <div className='message-tag'>
                     <div className='message-inner-tag'>   
                        <Form className='form-tag message-inner-tag' onSubmit={handleSendEmailEvent}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Full Name" className='decoration'  name='name'/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Control type="email" placeholder="Email" className='decoration'  name='email'/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Control as="textarea" placeholder='Your Message' className='decoration' rows={5} name='message'/>
                        </Form.Group>
                        <Button variant="primary" type='submit'>SEND</Button>
                        </Form>
                    </div>
                </div>
                <div className='address-tag'>
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d910.2447178400624!2d70.79964182920413!3d22.75406099906811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ1JzE0LjYiTiA3MMKwNDgnMDAuNyJF!5e1!3m2!1sen!2sin!4v1617277217044!5m2!1sen!2sin" 
                    className='iframe-map'
                    title='IMAP' 
                    allowFullScreen="" 
                    loading="lazy"></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;