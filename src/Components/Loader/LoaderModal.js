import React from "react";
import LoaderLogo from "../../loader.svg";
import "./LoaderModal.css";

const Modal = ({ text }) => {
  return (
    <div className="loader-first-tag" style={{ zIndex: "1",backgroundColor: "#b3b3b3" }}>
      <div className="loader-sec-tag">
        <img src={LoaderLogo} alt="React Logo" />
        <label className="loader-font-text">
          <strong> {text} </strong>
        </label>
      </div>
    </div>
  );
};

export default Modal;
