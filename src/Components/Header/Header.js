import React, { useState, useEffect } from "react";
import "./Header.css";
// import './style.css'
// import './responsive.css'
// import './bootsnav.css'
// import './linearicons.css'
import { Navbar, Nav } from "react-bootstrap";
import history from "../History";
import fire from "../Firebase";
import Swal from "sweetalert2";
import userImage from "../img/userImage.jpg";
// import Navbar from '../Navbar/Navbar'
import firebase from "../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../action/setLogged";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
import { Badge } from "antd";
import "antd/dist/antd.css";
const { Brand, Collapse, Toggle } = Navbar;
const { Link } = Nav;

function Header() {
  const [currentUserId, setCurrentUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [navExpanded, setNavExpanded] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [windowInnerWidth, setWindowInnerWidth] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState("");
  const [webStorageAdmin, setWebStorageAdmin] = useState(false);
  const isLogin = useSelector((state) => state);
  const [noOfProductInCart, setNoOfProductInCart] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let tempId;
    setWindowInnerWidth(window.innerWidth);
    changeHeaderBackground();
    const CurrentUser = fire.auth().currentUser;
    if (CurrentUser) {
      tempId = CurrentUser.uid;
      setCurrentUserId(CurrentUser.uid);
    } else {
      if (window.localStorage.getItem("userId")) {
        tempId = window.localStorage.getItem("userId");
        setCurrentUserId(tempId);
      }
    }
    console.log("tempId=>", tempId);
    if (tempId) {
      // setCurrentUserId(CurrentUser.uid)
      if (tempId === "CymHA6isY3aNB4eKcWji4RDYij73") {
        var starCountRef = fire.database().ref(`Admin/${tempId}`);
      } else {
        var starCountRef = fire.database().ref(`User/${tempId}`);
      }

      starCountRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          setUserName(snapshot.val().user_name);
          setUserImageUrl(snapshot.val().user_image_url);
        }
      });
    }
    const isAdminConst = window.localStorage.getItem("isAdmin");
    if (
      isAdminConst === "true" ||
      (CurrentUser && CurrentUser.uid === "CymHA6isY3aNB4eKcWji4RDYij73")
    ) {
      window.localStorage.setItem("isAdmin", true);
      setWebStorageAdmin(window.localStorage.getItem("isAdmin"));
      setIsAdmin(true);
    } else {
      window.localStorage.setItem("isAdmin", false);
      setWebStorageAdmin(window.localStorage.getItem("isAdmin"));
      setIsAdmin(false);
    }
    setWebStorageAdmin(window.localStorage.getItem("isAdmin"));
  }, [isLogin]);

  useEffect(() => {
    const CurrentUser = fire.auth().currentUser;
    if (CurrentUser) {
      var starCountRef = firebase
        .database()
        .ref(`User/${CurrentUser.uid}/Cart`);
      starCountRef.on("value", (snapshot) => {
        console.log("Cart******=>", snapshot.val(), "=?", CurrentUser.uid);
        if (snapshot.val() !== null && Object.keys(snapshot.val()).length) {
          let total = 0;
          Object.values(snapshot.val()).map((item) => {
            total = total + item.no_of_quantity;
          });
          console.log("TOTAl=>", total);
          setNoOfProductInCart(total);
        }
      });
    }
  }, []);

  const changeHeaderBackground = () => {
    if (window.innerWidth <= 769) {
      if (window.scrollY >= 20) {
        setNavBar(true);
      } else {
        setNavBar(false);
      }
    } else {
      if (window.scrollY >= 80) {
        setNavBar(true);
      } else {
        setNavBar(false);
      }
    }
  };
  const checkExapnd = () => {
    if (windowInnerWidth < 768) {
      if (navExpanded) {
        changeHeaderBackground();
        setNavExpanded(false);
      } else {
        setNavBar(true);
        setNavExpanded(true);
      }
    }
  };
  const setWidth = () => {
    setWindowInnerWidth(window.innerWidth);
  };

  window.addEventListener("load", setWidth);
  window.addEventListener("resize", setWidth);
  window.addEventListener("scroll", changeHeaderBackground);
  const handleLoginEvent = () => {
    history.push({ pathname: "/login" });
  };
  const handleLogoutEvent = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        window.localStorage.setItem("isAdmin", false);
        setWebStorageAdmin(false);
        setIsAdmin(false);
        Swal.fire("Sign-out...", "Successful Sign-out...", "success").then(
          () => {
            dispatch(setLogout());
            history.push({ pathname: "/home" });
          }
        );
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  const handleCartEvent = () => {
    history.push({ pathname: `/User/Cart/${currentUserId}` });
  };
  const handleAddProductEvent = () => {
    history.push({ pathname: "/AddClockImages" });
  };
  const handleProductHistoryEvent = () => {
    history.push({ pathname: `/User/Order/History/${currentUserId}` });
  };
  const handleOrderedEvent = () => {
    history.push({ pathname: `/Admin/Order/${currentUserId}` });
  };
  const handleSignUpEvent = () => {
    history.push({ pathname: "/signUp" });
  };
  const handleProfileEvent = () => {
    history.push({ pathname: `/profile/${currentUserId}` });
  };

  // const AddFrame = () => {
  //     history.push({pathname:'/AddFrameImages'});
  // }
  return (
    <div className="header-body">
      <Navbar
        fixed="top"
        expand="md"
        expanded={navExpanded}
        onToggle={checkExapnd}
        className={navBar ? "navbar active" : "navbar"}
      >
        <Brand href="#Home">Gajanand Clock</Brand>
        <Toggle aria-controls="responsive-navbar-nav" />
        <Collapse id="responsive-navbar-nav" className="collapse">
          <Nav>
            {/* <Link onSelect={checkExapnd} style={{color:'white'}}  href="#Home">Home</Link> */}
            <Link onSelect={checkExapnd} href="#About">
              About
            </Link>
            <Link onSelect={checkExapnd} href="#Service">
              Service
            </Link>
            <Link onSelect={checkExapnd} href="#ShowClockImages">
              Clock
            </Link>
            <Link onSelect={checkExapnd} href="#ShowFrameImages">
              Frame
            </Link>
            {isAdmin === true || webStorageAdmin === true ? (
              <Nav>
                <Link
                  onSelect={checkExapnd}
                  onClick={handleAddProductEvent}
                  href="/AddClockImages"
                >
                  Add Product
                </Link>
                <Link
                  onSelect={checkExapnd}
                  onClick={handleOrderedEvent}
                  href="#"
                >
                  Orders
                </Link>
              </Nav>
            ) : null}

            <Link onSelect={checkExapnd} href="#ContactUs">
              Contact Us
            </Link>
            {isLogin && isAdmin !== true && webStorageAdmin !== true ? (
              <Link
                onSelect={checkExapnd}
                onClick={handleProductHistoryEvent}
                href="#"
              >
                Order History
              </Link>
            ) : null}
          </Nav>
          <Nav>
            {isLogin && windowInnerWidth > 769 ? (
              <>
                <Link onClick={handleProfileEvent}>
                  <img
                    src={userImageUrl !== "none" ? userImageUrl : userImage}
                    style={{
                      borderRadius: "50%",
                      height: "35px",
                      width: "35px",
                      marginTop: "-15%",
                    }}
                  />
                </Link>
                <Link onSelect={checkExapnd} onClick={handleProfileEvent}>
                  Hello, {userName}
                </Link>
              </>
            ) : null}
            {isLogin && isAdmin !== true && webStorageAdmin !== true ? (
              <>
                {windowInnerWidth > 769 ? (
                  <Link
                    onSelect={checkExapnd}
                    onClick={handleCartEvent}
                    href="#"
                  >
                    <Badge dot={noOfProductInCart ? true : false} size="small">
                      <ShoppingCartSharpIcon style={{ color: "white" }} />
                    </Badge>
                  </Link>
                ) : (
                  <Link
                    onSelect={checkExapnd}
                    onClick={handleCartEvent}
                    href="#"
                  >
                    Cart
                  </Link>
                )}
              </>
            ) : null}
            {isLogin ? (
              <Link onSelect={checkExapnd} onClick={handleLogoutEvent} href="#">
                Logout
              </Link>
            ) : (
              <>
                <Link onSelect={checkExapnd} onClick={handleSignUpEvent}>
                  Sign Up
                </Link>
                {windowInnerWidth > 770 ? (
                  <Link onSelect={checkExapnd}>/</Link>
                ) : null}
                <Link onSelect={checkExapnd} onClick={handleLoginEvent}>
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    // <Navbar />
  );
}

export default Header;
