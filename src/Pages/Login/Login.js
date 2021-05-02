import React, { useState } from "react";
import "./Login.css";
import fire from "../../Components/Firebase";
import history from "../../Components/History";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, FormLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Components/action/setLogged";
import Swal from "sweetalert2";
import Link from "@material-ui/core/Link";
import LoaderModel from "../../Components/Loader/LoaderModal";

import { Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  function handleLoginEvent() {
    setIsLogin(true);
    // console.log(pass,'==',email)
    if (email && pass) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(async function () {
          const CurrentUser = fire.auth().currentUser;
          console.log("IF ============================>");
          console.log(
            "CurrentUser.emailVerified==>",
            CurrentUser.emailVerified
          );
          if (CurrentUser.emailVerified === false) {
            history.push({ pathname: "/login" });
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email Not Verified...",
            }).then(() => {
              setIsLogin(false);
            });
          } else {
            console.log("ELSE ============================>");
            Swal.fire("Login", "Successful Login...", "success").then(() => {
              //   console.log('USER===>',CurrentUser.uid)
              window.localStorage.setItem("userId", CurrentUser.uid);
              setIsLogin(false);
              // if(email==='nilesh.gajanand03@gmail.com'&&pass==='Admin@0000'){
              dispatch(setLogin());
              // }
              history.push({ pathname: "/home" });
            });
          }
        })
        .catch((error) => {
          console.log(" ============================>");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          }).then(() => {
            setIsLogin(false);
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "enter all details",
      }).then(() => {
        setIsLogin(false);
      });
    }
  }

  return (
    <div className="Login-body">
      <div className="tabelOutterTag">
        <div className="tabelTag">
          <div className="logo-css">
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

          <label className="form-header">Login</label>
          <div className="inputTag">
            <FormLabel className="label-css">Email address</FormLabel>
            {/* <FormControl
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              size="lg"
              placeholder="Email"
            /> */}
            <Input
              allowClear
              style={{
                padding: "1.5%",
                width: "100%",
              }}
              placeholder="Email Id"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputTag">
            <FormLabel className="label-css">Password</FormLabel>
            <Input.Password
              allowClear
              visibilityToggle={true}
              style={{
                padding: "1.5%",
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
          <div className="inputTag" style={{ marginTop: "4%" }}>
            <Button
              variant="contained"
              fullWidth={true}
              color="primary"
              onClick={handleLoginEvent}
            >
              SIGN IN
            </Button>
            {/* <input type="Submit" onClick={submitLogin}  /> */}
          </div>
          <div className="signUpLabelTag">
            <div>
              <Link href="/signUp" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </div>
            <div>
              <Link href="/home" variant="body2">
                Back To Home?
              </Link>
            </div>
            <div>
              <Link href="/forgotPassword" variant="body2">
                Forgot Your Password?
              </Link>
            </div>
          </div>
          {isLogin && <LoaderModel text="Login Processing..." />}
        </div>
      </div>
    </div>
  );
};
export default Login;
