import React, { Suspense } from "react";
import Loader from "../../Components/Loader/LoaderModal";
import ShowClockImages from "../ShowClockImages/ShowClockImages";
import ShowFrameImages from "../ShowFrameImages/ShowFrameImages";
const Header = React.lazy(() => import("../../Components/Header/Header.js"));
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
const Home = React.lazy(() => import("../Home/Home"));
const AboutOwner = React.lazy(() => import("../AboutOwner/AboutOwner"));
const Service = React.lazy(() => import("../Service/Service"));
const ContactUs = React.lazy(() => import("../ContactUs/ContactUs"));

function Content(props) {
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
    <Suspense fallback={<Loader text="Loading..." />}>
      <Header />
      <section id="Home" style={{backgroundColor:'white'}}>
        <Home />
      </section>
      <section id="About" style={{backgroundColor:'white'}}>
        <AboutOwner />
      </section>
      <section id="Service">
        <Service />
      </section>
      <section id="ShowClockImages">
        <ShowClockImages />
      </section>
      <section id="ShowFrameImages">
        <ShowFrameImages />
      </section>
      <section id="ContactUs">
        <ContactUs />
      </section>
      <section id="Footer">
        <Footer />
      </section>
    </Suspense>
</div>
  );
}

export default Content;
