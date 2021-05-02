import React, { useEffect } from "react";
import "./AboutOwner.css";
import Image from "react-bootstrap/Image";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutOwner() {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  });
  return (
    <div className="Body">
      <div
        className="About-header"
        data-aos="fade-left"
        data-aos-easing="ease-in-out"
      >
        <label className="About-header-text">
          <strong>About Owner</strong>
        </label>
        <div className="aboutOwner-header-hr">
          <hr style={{ borderTop: "5px solid #00c6a7" }}></hr>
        </div>
      </div>
      <div className="About-tag">
        <div
          className="content-tag"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
        >
          <p>
            Nilesh Patel is owner of the company, who also owns 2 different
            companies having name of "Gajanand" to represent his business. He is
            masterclass in this business for a very long time period of more
            than 18 years in "Morbi", which is famous as "ceramic city". He
            leads his company to many known people of Gujarat to raise his
            business to another level.
          </p>
        </div>
        <div
          className="Owner-img-tag"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
        >
          <Image
            src="user.png"
            thumbnail
            className="Owner-img"
            width="350"
            height="350"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutOwner;
