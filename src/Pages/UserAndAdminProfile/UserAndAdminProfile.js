import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../AddPhoto/AddPhotoHeader";
import firebase, { storage } from "../../Components/Firebase";
import LoaderModel from "../../Components/Loader/LoaderModal";
import userImage from "../../Components/img/userImage.jpg";
import "./UserAndAdminProfile.css";
import Swal from "sweetalert2";
import axios from "axios";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/bootstrap.css";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
export default function UserAndAdminProfile() {
  const { id } = useParams();
  const types = ["image/png", "image/jpeg"];
  const [data, setData] = useState();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userName, setUserName] = useState("-");
  const [fullName, setFullName] = useState("-");
  const [emailId, setEmailId] = useState("-");
  const [emailTempId, setTempEmailId] = useState();
  const [isAddress, setIsAddress] = useState(false);
  const [isUpdateAddress, setIsUpdateAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressLine1, setAddressLine1] = useState("-");
  const [addressLine2, setAddressLine2] = useState("-");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Gujarat");
  const [zipCode, setZipCode] = useState("-");
  const [iszipCodeChange, setIsZipCodeChange] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("-");
  const [landmark, setLandmark] = useState("-");
  const [prevLandmark, setprevLandmark] = useState("-");
  const [city, setCity] = useState("-");
  const [arrayOfPostOffice, setArrayOfPostOffice] = useState([]);
  const [landmarkOptions, setLandmarkOptions] = useState([]);
  const [userImageUrl, setUserImageUrl] = useState();
  const [userImageFile, setUserImageFile] = useState();
  const [isUserImageChnage, setIsUserImageChange] = useState(false);
  const [UserImageFileName, setUserImageFileName] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    console.log("-------------");
    if (id === "CymHA6isY3aNB4eKcWji4RDYij73") {
      var starCountRef = firebase.database().ref(`Admin/${id}`);
      setIsAdmin(true);
    } else {
      var starCountRef = firebase.database().ref(`User/${id}`);
      setIsAdmin(false);
      console.log("6++++++++++++++");
    }
    setIsUploading(true);
    starCountRef.on("value", (snapshot) => {
      setData(snapshot.val());
      console.log("///////");
      if (snapshot.val().user_image_url !== "none") {
        setUserImageUrl(snapshot.val().user_image_url);
        let image = storage.refFromURL(snapshot.val().user_image_url);
        setUserImageFileName(image.name);
      } else {
        setUserImageUrl(snapshot.val().user_image_url);
      }
      console.log("ADD*****", snapshot.val());
      setUserName(snapshot.val().user_name);
      setFullName(snapshot.val().Full_Name);
      setEmailId(snapshot.val().Email);
      setTempEmailId(snapshot.val().Email);
      if (snapshot.val().Address !== "none") {
        setAddress(snapshot.val().Address);
        setprevLandmark(snapshot.val().Address.Landmark);
        console.log("ADD**********************************");
        setIsAddress(true);
      } else {
        setIsAddress(false);
      }
    });
    setIsUploading(false);
  }, []);

  useEffect(() => {
    let temp = [];
    if (arrayOfPostOffice.length && arrayOfPostOffice[0].State === "Gujarat") {
      setCity(arrayOfPostOffice[0].Block);
      arrayOfPostOffice.map((val) => {
        if (val.BranchType === "Sub Post Office") {
          temp.push(val.Name);
        }
      });
      setLandmarkOptions(temp);
    }
  }, [arrayOfPostOffice]);

  useEffect(() => {
    if (!zipCode) {
      setCity("");
      setLandmarkOptions([]);
    }
  }, [zipCode]);

  const handleAddressEvent = () => {
    console.log("phoneNumber =>", phoneNumber);
    if (addressLine1 === "-" || addressLine1 === "") {
      setAddressLine1("");
    }
    if (addressLine2 === "-" || addressLine2 === "") {
      setAddressLine2("");
    }
    if (zipCode === "-" || zipCode === "") {
      setZipCode("");
    }
    if (phoneNumber === "-" || phoneNumber === "") {
      setPhoneNumber("");
    }
    if (
      landmark === "-" ||
      landmark === "" ||
      (iszipCodeChange && prevLandmark === landmark)
    ) {
      setLandmark("");
      setIsZipCodeChange(false);
    }

    if (
      addressLine1 &&
      addressLine1 !== "-" &&
      addressLine2 &&
      addressLine2 !== "-" &&
      zipCode &&
      zipCode !== "-" &&
      phoneNumber &&
      phoneNumber !== "-" &&
      landmark &&
      landmark !== "-" &&
      city &&
      city !== "-" &&
      !(iszipCodeChange && prevLandmark === landmark)
    ) {
      // const  CurrentUser = firebase.auth().currentUser;
      firebase
        .database()
        .ref(`User/${id}/Address`)
        .set({
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          phoneNumber: phoneNumber,
          zipcode: zipCode,
          Landmark: landmark,
          City: city,
          state: state,
          country: country,
        })
        .then(() => {
          if (isUpdateAddress) {
            Swal.fire("Update Address", "Successful Update Address", "success");
            setIsUpdateAddress(false);
            setIsAddress(true);
          } else {
            Swal.fire("Set Address", "Successful Add Address", "success");
          }
        });
    } else {
    }
  };
  const handleDeleteImage = async () => {
    let image = await storage.refFromURL(userImageUrl);
    image.delete();
  };
  const updatePersonalInformation = async () => {
    setIsUpdating(true);
    let text = "Profile Details change Successful";
    if (isUserImageChnage) {
      if (userImageUrl) {
        handleDeleteImage();
      }
      await storage.ref(`UserImage/${userImageFile.name}`).put(userImageFile);
      await storage
        .ref(`UserImage/`)
        .child(userImageFile.name)
        .getDownloadURL()
        .then((imgUrl) => {
          firebase.database().ref(`User/${id}`).update({
            user_image_url: imgUrl,
          });
        })
        .catch((err) => console.log(err));

      setIsUserImageChange(false);
    }
    if (emailTempId !== undefined && emailId !== emailTempId) {
      firebase
        .auth()
        .currentUser.updateEmail(emailId)
        .then(() => {
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(function () {
              // Email sent.
              text =
                text +
                "And Email Verification Link Sent In Your New Email Id...";
              if (userName && emailId && fullName) {
                firebase
                  .database()
                  .ref(`User/${id}`)
                  .update({
                    Full_Name: fullName,
                    user_name: userName,
                    Email: emailId,
                  })
                  .then((data) => {
                    //success callback
                    Swal.fire(
                      "Update Profile Details",
                      `${text}`,
                      "success"
                    ).then(() => {
                      setIsEditProfile(false);
                      setIsUpdating(false);
                    });
                  });
              }
            })
            .catch(function (error) {
              // An error happened.
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error}`,
              }).then(() => {
                setIsEditProfile(false);
                setIsUpdating(false);
              });
              console.log(error);
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          }).then(() => {
            setIsEditProfile(false);
            setIsUpdating(false);
          });
        });
    } else {
      if (userName && emailId && fullName) {
        firebase
          .database()
          .ref(`User/${id}`)
          .update({
            Full_Name: fullName,
            user_name: userName,
            Email: emailId,
          })
          .then((data) => {
            //success callback
            Swal.fire("Update Profile Details", `${text}`, "success").then(
              () => {
                setIsEditProfile(false);
                setIsUpdating(false);
              }
            );
          });
      }
    }
  };
  const handleCancelEvent = () => {
    setIsEditProfile(false);
  };
  const handleChangePersonalInformation = (data) => {
    setUserName(data.user_name);
    setEmailId(data.Email);
    setFullName(data.Full_Name);
    let image = storage.refFromURL(data.user_image_url);
    setUserImageFileName(image.name);
  };
  const handleChangeAddressEvent = async (address) => {
    setAddressLine1(address.address_line_1);
    setAddressLine2(address.address_line_2);
    setState(address.state);
    setCountry(address.country);
    setZipCode(address.zipcode);
    setPhoneNumber(address.phoneNumber);
    await axios(`https://api.postalpincode.in/pincode/${address.zipcode}`).then(
      (result) => {
        if (result.data[0].Status === "Success") {
          setArrayOfPostOffice(result.data[0].PostOffice);
        }
      }
    );
    setLandmark(address.Landmark);
  };

  return (
    <>
      <Header text={"Profile"} clock={true} />
      <div className="shadow container mb-5">
        {!isEditProfile ? (
          <div className="mb-3 mt-5 ">
            <div className="  p-5 bg-red ">
              <div className="d-flex justify-content-between">
                <h4 className="mb-3">Personal Information</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    //   setIsAddress(false)
                    setIsEditProfile(true);
                    handleChangePersonalInformation(data);
                  }}
                >
                  Edit Profile
                </button>
              </div>
              <hr className="mb-4"></hr>
              <div className="userProfiletag">
                <div className="userProfileContant p-5">
                  <h6>UserName : {data ? data.user_name : ""}</h6>
                  <br />
                  <h6>Full Name : {data ? data.Full_Name : ""}</h6>
                  <br />
                  <h6>Email : {data ? data.Email : ""}</h6>
                  <br />
                  <h6>Address : {data ? data.Email : ""}</h6>
                </div>
                <div className="useProfileImageTag p-5">
                  {console.log("userImageUrl===>", userImageUrl)}
                  <img
                    src={userImageUrl !== "none" ? userImageUrl : userImage}
                    alt="User_Image"
                    className="user-img"
                  />
                  {/* <button className='btn btn-primary mt-5' >Edit Image</button> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-3 mt-5 container">
            <div className="mx-auto mb-3  p-5 bg-red">
              <h4 className="mb-3">Edit Personal Information</h4>
              <hr></hr>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    value={userName !== "-" ? userName : ""}
                    className="form-control"
                    onChange={(e) => setUserName(e.target.value)}
                    id="userName"
                    placeholder="John123"
                    required=""
                  />
                  {!userName ? (
                    <div className="text-danger"> Username is required. </div>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName !== "-" ? fullName : ""}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    placeholder="John Doe"
                  />
                  {!fullName ? (
                    <div className="text-danger"> Full Name is required. </div>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="emailId">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    value={emailId !== "-" ? emailId : ""}
                    onChange={(e) => setEmailId(e.target.value)}
                    id="emailId"
                    placeholder="example@gmail.com"
                    required=""
                  />
                  {!emailId ? (
                    <div className="text-danger"> Username is required. </div>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="emailId">User Image</label>
                  <br />
                  <button
                    onClick={() => {
                      document.getElementById("uploadUserImage").click();
                      return false;
                    }}
                  >
                    Change Photo
                  </button>
                  <label style={{ marginLeft: "1%" }}>
                    {UserImageFileName ? UserImageFileName : "none"}
                  </label>
                  <input
                    type="file"
                    id="uploadUserImage"
                    style={{ display: "none" }}
                    className="form-control-file"
                    onChange={(e) => {
                      if (types.includes(e.target.files?.[0].type)) {
                        setIsUserImageChange(true);
                        setUserImageFile(e.target.files?.[0]);
                        setUserImageFileName(e.target.files?.[0].name);
                      } else {
                        setIsUserImageChange(false);
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Not Supported format...",
                        });
                      }
                    }}
                  />
                </div>
              </div>
              {/* <hr></hr>
            <h5>Shipping Address</h5> */}
              {/* <AddressComponent 
                
                addressLine1Props={addressLine1}
                addressLine2Props={addressLine2}
                zipCodeProps={zipCode}
                landmarkProps={landmark}
                phoneNumberProps={phoneNumber}  
                isUpdateProps={true} 
                btnText='Profile Details'
                handleCancelEvent={handleCancelEvent}
                handleUpdateDetails={handleUpdateDetails}
            /> */}
              <div className="d-flex justify-content-around mt-5">
                <button
                  className="btn btn-warning col-5"
                  onClick={updatePersonalInformation}
                >
                  Update personal Information
                </button>
                <button
                  className="btn btn-secondary col-5"
                  onClick={handleCancelEvent}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {!isAdmin ? (
          <>
            {!isAddress ? (
              <div className="mb-0 container">
                <div className="mx-auto mb-3  p-5 bg-red">
                  <h4 className="mb-3">Shipping Address</h4>
                  <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      value={addressLine1 !== "-" ? addressLine1 : ""}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required=""
                    />
                    {!addressLine1 ? (
                      <div className="text-danger">
                        {" "}
                        Please enter your shipping address.{" "}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address2">Address 2</label>
                    <input
                      type="text"
                      value={addressLine2 !== "-" ? addressLine2 : ""}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                    />
                    {!addressLine2 ? (
                      <div className="text-danger">
                        {" "}
                        Please enter your shipping address.{" "}
                      </div>
                    ) : null}
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="phoneNumber">Phone No.</label>
                      <input
                        type="tel"
                        value={phoneNumber !== "-" ? phoneNumber : ""}
                        className="form-control"
                        id="zip"
                        pattern="[6-9]{1}-[0-9]{9}"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder=""
                        required
                      />
                      {/* <PhoneInput
                        country={"in"}
                        disableDropdown={true}
                        value={phoneNumber !== "-" ? phoneNumber : ""}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      /> */}
                      {!phoneNumber ? (
                        <div className="text-danger">
                          {" "}
                          Phone Number required.{" "}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        value={zipCode !== "-" ? zipCode : ""}
                        className="form-control"
                        id="zip"
                        onChange={(e) => {
                          setZipCode(e.target.value);
                          if (address) {
                            setIsZipCodeChange(true);
                          }
                          axios(
                            `https://api.postalpincode.in/pincode/${e.target.value}`
                          ).then((result) => {
                            if (result.data[0].Status === "Success") {
                              setArrayOfPostOffice(result.data[0].PostOffice);
                            }
                          });
                        }}
                        placeholder=""
                        required=""
                      />
                      {!zipCode ? (
                        <div className="text-danger"> Zip code required. </div>
                      ) : null}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="zip">Landmark</label>
                      <select
                        className="custom-select d-block w-100"
                        defaultValue={landmark !== "-" ? landmark : ""}
                        onChange={(e) => setLandmark(e.target.value)}
                        id="country"
                        required=""
                      >
                        <option value="">Choose...</option>
                        {landmarkOptions.length
                          ? landmarkOptions.map((val) => (
                              <option value={`${val}`} key={val}>
                                {val}
                              </option>
                            ))
                          : null}
                      </select>
                      {/* <input type="text" value={district!=='-'?district:''} className="form-control" id="zip" onChange={(e)=>setZipCode(e.target.value)} placeholder="" required="" /> */}
                      {!landmark ? (
                        <div className="text-danger"> Distric required. </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="address2">City</label>
                      <input
                        type="text"
                        value={city !== "-" ? city : ""}
                        disabled={true}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control"
                        id="city"
                        placeholder="City Name"
                      />
                      {/* {!city ?  <div className="text-danger"> City required. </div>: null } */}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state">State</label>
                      <select
                        className="custom-select d-block w-100"
                        disabled={true}
                        defaultValue={state !== "-" ? state : "Gujarat"}
                        onChange={(e) => setState(e.target.value)}
                        id="state"
                        required=""
                      >
                        <option value="">Choose...</option>
                        <option value="Gujarat">Gujarat</option>
                      </select>
                      {!state ? (
                        <div className="text-danger">
                          {" "}
                          Please provide a valid state.{" "}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="country">Country</label>
                      <select
                        className="custom-select d-block w-100"
                        disabled={true}
                        defaultValue={country !== "-" ? country : "India"}
                        onChange={(e) => setCountry(e.target.value)}
                        id="country"
                        required=""
                      >
                        <option value="">Choose...</option>
                        <option value="India">India</option>
                      </select>
                      {!country ? (
                        <div className="text-danger">
                          {" "}
                          Please select a valid country.{" "}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {isUpdateAddress ? (
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-warning col-5"
                        onClick={handleAddressEvent}
                      >
                        Update Address
                      </button>
                      <button
                        className="btn btn-secondary col-5"
                        onClick={() => setIsAddress(true)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      onClick={handleAddressEvent}
                    >
                      Add Address
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="mx-auto  p-5 bg-red ">
                  <div className="d-flex justify-content-between">
                    <h4 className="mb-3">Shipping Address</h4>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setIsAddress(false);
                        setIsUpdateAddress(true);
                        handleChangeAddressEvent(address);
                      }}
                    >
                      Change Address
                    </button>
                  </div>
                  <hr className="mb-4"></hr>
                  <h6>{address?.address_line_1}</h6>
                  <h6>{address?.address_line_2}</h6>
                  <div className="d-flex">
                    <h6>{address?.Landmark}</h6>
                    <h6>, {address?.City}</h6>
                  </div>
                  <div className="d-flex">
                    <h6>{address?.state}</h6>
                    <h6>, {address?.country}</h6>
                  </div>
                  <h6>{address?.zipcode}</h6>
                  <h6>Ph: 0{address?.phoneNumber}</h6>
                </div>
              </div>
            )}
          </>
        ) : null}
        <div className="w-25 p-4"></div>
        {isUpdating && <LoaderModel text="Update details..." />}
        {isUploading && <LoaderModel text="Upload Product Details..." />}
      </div>
      <div className="profile-footer">
        <Footer />
      </div>
    </>
  );
}
