import React, { useEffect, useState } from "react";
import "./ShowClockImages.css";
import useStore from "../../Components/hooks/useStore";
import { Button } from "react-bootstrap";
import { isLoading } from "../../Components/hooks/useStore";
import LoaderModel from "../../Components/Loader/LoaderModal";
import Card from "../../Components/Card";
import AOS from "aos";
import "aos/dist/aos.css";

function ShowClockImages() {
  const [numOfImg, setNumOfImg] = useState(4);
  const [tempNumOfImg, setTempNumOfImg] = useState(0);
  const { docs } = useStore("Clock");

  const ShowMoreImg = () => {
    setNumOfImg(numOfImg + tempNumOfImg);
  };
  const ShowLessImg = () => {
    setNumOfImg(numOfImg - tempNumOfImg);
  };

  useEffect(() => {
    AOS.init({
      offset: 180,
      duration: 1000,
    });
    setNumberOfClockImages();
  }, []);

  const setNumberOfClockImages = () => {
    if (window.innerWidth < 600) {
      setNumOfImg(3);
      setTempNumOfImg(3);
    } else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      setNumOfImg(4);
      setTempNumOfImg(4);
    } else if (window.innerWidth > 1200) {
      setNumOfImg(3);
      setTempNumOfImg(3);
    }
  };

  window.addEventListener("resize", setNumberOfClockImages);

  return (
    <div className="show-clock-body">
      <div
        className="show-clock-header"
        data-aos="fade-left"
        data-aos-easing="ease-in-out"
      >
        <label className="Show-Clock-header-text">
          <strong>Clock Modal</strong>
        </label>
        <div className="showClock-header-hr">
          <hr style={{ borderTop: "5px solid #00c6a7" }}></hr>
        </div>
      </div>
      <div className="show-clock-tag">
        <div className="clock-img-grid">
          {docs &&
            docs.slice(0, numOfImg).map((doc) => (
              <div data-aos="fade-right" data-aos-easing="ease-in-out">
                <Card key={doc.url} state={doc} />
              </div>
            ))}
        </div>
        {isLoading && <LoaderModel text="Photo loading..." />}
      </div>
      <div className="btn-tag">
        {numOfImg < docs.length && (
          <Button variant="primary" size="lg" onClick={ShowMoreImg}>
            View More
          </Button>
        )}
        {numOfImg >= docs.length && (
          <Button variant="primary" size="lg" onClick={ShowLessImg}>
            View less
          </Button>
        )}
      </div>
    </div>
  );
}

export default ShowClockImages;
