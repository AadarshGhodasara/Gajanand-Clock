import React, { useEffect, useState } from "react";
import "./ContactUs.css";
import { Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import AOS from "aos";
import LoaderModal from "../../Components/Loader/LoaderModal";
import "aos/dist/aos.css";

const ContactUs = () => {
  const [isMailSent, setIsMailSent] = useState(false);
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  });
  const handleSendEmailEvent = (e) => {
    e.preventDefault();
    setIsMailSent(true);
    emailjs
      .sendForm(
        "service_c1haowq",
        "template_hvxta7j",
        e.target,
        "user_PkGvOVMKJrZ3K5udlcntm"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire(
            "Send Message",
            "Your Mail has been send. Thank you for connecting.",
            "success"
          ).then(() => {
            setIsMailSent(false);
          });
        },
        (error) => {
          console.log(error.text);
          setIsMailSent(false);
        }
      );
    e.target.reset();
  };
  return (
    <div className="ContactUs-body">
      <div
        className="ContactUs-header"
        data-aos="fade-left"
        data-aos-easing="ease-in-out"
      >
        <label className="ContactUs-header-text">
          <strong>Contact Us</strong>
        </label>
        <div className="ContactUs-header-hr">
          <hr style={{ borderTop: "5px solid #00c6a7" }}></hr>
        </div>
      </div>
      <div className="ContactUs-tag">
        <div
          className="message-tag"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
        >
          <div className="message-inner-tag">
            <Form
              className="form-tag message-inner-tag"
              onSubmit={handleSendEmailEvent}
            >
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  className="decoration"
                  name="name"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="decoration"
                  name="email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="Your Message"
                  className="decoration"
                  rows={5}
                  name="message"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                SEND
              </Button>
            </Form>
          </div>
        </div>
        <div
          className="address-tag"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d910.2447178400624!2d70.79964182920413!3d22.75406099906811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ1JzE0LjYiTiA3MMKwNDgnMDAuNyJF!5e1!3m2!1sen!2sin!4v1617277217044!5m2!1sen!2sin"
            className="iframe-map"
            title="IMAP"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      {isMailSent && <LoaderModal text="Mail Send processing.." />}
    </div>
  );
};

export default ContactUs;
