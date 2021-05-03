import React, { useState, useEffect } from "react";
import "./ShowFrameImages.css";
import useStore from "../../Components/hooks/useStore";
import { Button } from "react-bootstrap";
import { isLoading } from "../../Components/hooks/useStore";
import LoaderModel from "../../Components/Loader/LoaderModal";
import Card from "../../Components/Card";
import AOS from "aos";
import "aos/dist/aos.css";
function ShowFrameImages({ text, styles }) {
  const [numOfImg, setNumOfImg] = useState(4);
  const [tempNumOfImg, setTempNumOfImg] = useState(0);
  const { docs } = useStore("Frame");
  var temp;

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
    setNumberFrameOfImages();
  }, []);

  const setNumberFrameOfImages = () => {
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
  const ShowMoreImg = () => {
    console.log("temp===>", tempNumOfImg);
    setNumOfImg(numOfImg + tempNumOfImg);
  };
  const ShowLessImg = () => {
    setNumOfImg(numOfImg - tempNumOfImg);
  };

  window.addEventListener("resize", setNumberFrameOfImages);

  return (
    <div className="show-frame-body">
      <div
        className="show-frame-header"
        data-aos="fade-left"
        data-aos-easing="ease-in-out"
      >
        <label className="Show-frame-header-text">
          <strong>Frame Modal</strong>
        </label>
        <div className="showFrame-header-hr">
          <hr style={{ borderTop: "5px solid #00c6a7" }}></hr>
        </div>
      </div>
      <div className="show-frame-tag">
        <div className="frame-img-grid">
          {docs &&
            docs.slice(0, numOfImg).map((doc) => (
              <div data-aos="fade-right" data-aos-easing="ease-in-out">
                <Card key={doc.url} state={doc} />
              </div>
            ))}
        </div>

        {isLoading && <LoaderModel text="Photo loading..." />}
      </div>
      <div className="view-more-btn-tag">
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

export default ShowFrameImages;
