import React, { useState } from "react";
import "./SignUp.css";
import fire from "../../Components/Firebase";
import history from "../../Components/History";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, FormLabel } from "react-bootstrap";
import Link from "@material-ui/core/Link";
import Swal from "sweetalert2";
import LoaderModal from "../../Components/Loader/LoaderModal";
import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const SignUp = () => {
  const [Email, setEmail] = useState("");
  // const [ phoneNumber , setPhoneNumber ] = useState('');
  const [Pass, setPass] = useState("");
  const [userName, setUserName] = useState("");
  const [Confirm_Pass, setRePass] = useState("");
  const [Name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(null);

  function handleSignUpEvent() {
    if (!(Pass === Confirm_Pass)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password Not Match...",
      }).then(() => {
        setPass("");
        setRePass("");
      });
    } else {
      if (userName && Name && Email && Pass && Confirm_Pass) {
        setIsSignUp(1);
        fire
          .auth()
          .createUserWithEmailAndPassword(Email, Pass)
          .then(async function () {
            const CurrentUser = fire.auth().currentUser;
            CurrentUser.sendEmailVerification()
              .then(function () {
                fire
                  .database()
                  .ref("User/" + CurrentUser.uid)
                  .set({
                    Full_Name: Name,
                    user_name: userName,
                    Email: Email,
                    Address: "none",
                    Cart: "none",
                    user_image_url: "none",
                  })
                  .then((data) => {
                    //success callback
                    Swal.fire(
                      "Sign Up",
                      "Sign Up Successful And Verification Link Sent In Your Email...",
                      "success"
                    ).then(() => {
                      setEmail("");
                      setName("");
                      setPass("");
                      setRePass("");
                    });
                    setIsSignUp(null);
                    history.push({
                      pathname: "/login",
                    });
                  })
                  .catch((error) => {
                    console.log("error ", error);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: `${error}`,
                    });
                    setIsSignUp(null);
                  });
              })
              .catch(function (error) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${error}`,
                });
                console.log(error);
                setIsSignUp(null);
              });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
            setIsSignUp(null);
            // console.log('->',error);
          });
        // setIsSignUp(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "enter all details",
        });
      }
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <div className="SignUpOutterTag">
        <div className="SignUpTag">
          <div className="SignUp-logo-css">
            <Avatar
              style={{
                color: "black",
                backgroundColor: "#f48fb1",
                height: "50px",
                width: "50px",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <label className="SignUp-header">Sign Up</label>
          <div className="inputTag">
            <FormLabel className="label-css">Username</FormLabel>
            {/* <FormControl
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="name"
              size="lg"
              placeholder="Full Name"
            /> */}
            <Input
              style={{
                padding: "1.5%",
                width: "100%",
              }}
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <FormLabel className="label-css">Full Name</FormLabel>
            {/* <FormControl
              value={Name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              size="lg"
              placeholder="Full Name"
            /> */}
            <Input
              style={{
                padding: "1.5%",
                width: "100%",
              }}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <FormLabel className="label-css">Email</FormLabel>
            {/* <FormControl
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              size="lg"
              placeholder="Email"
            /> */}
            <Input
              style={{
                padding: "1.5%",
                width: "100%",
              }}
              placeholder="Email Id"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div className='inputTag'>
                            <FormLabel className='label-css'>Phone No.</FormLabel>
                            <FormControl value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} type="tel" size='lg' placeholder="Phone Number" />
                        </div> */}
          <div className="inputTag">
            <FormLabel className="label-css">Password</FormLabel>
            <Input.Password
              visibilityToggle={true}
              style={{
                padding: "1.5%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="inputTag">
            <FormLabel className="label-css">Confirm Password</FormLabel>
            <Input.Password
              visibilityToggle={true}
              style={{
                padding: "1.5%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              placeholder="Confirm Password"
              onChange={(e) => setRePass(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="inputTag" style={{ marginTop: "5%" }}>
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              type="button"
              onClick={handleSignUpEvent}
            >
              SIGN UP
            </button>
          </div>
          <div className="LoginLabelTag">
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
      {isSignUp && <LoaderModal text="Sign Up Processing..." />}
    </div>
  );
};

export default SignUp;
