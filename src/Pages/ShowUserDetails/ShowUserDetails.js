import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../Components/Firebase";
import Header from "../AddPhoto/AddPhotoHeader";
import LoaderModal from "../../Components/Loader/LoaderModal";
import "./ShowUserDetails.css";
export default function ShowUserDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      var starCountRef = firebase.database().ref(`User/${id}`);
      starCountRef.on("value", (snapshot) => {
        setUserData(snapshot.val());
        setIsLoading(false);
      });
    }
  }, []);
  return (
    <>
      <Header text={"User Details"} clock={true} />
      <div className="container py-4">
        <h1 className="user-id-text">User Id: {id}</h1>
        <hr />
        <ul className="list-group w-80">
          <li className="list-group-item">
            User name: <strong>{userData?.user_name}</strong>{" "}
          </li>
          <li className="list-group-item">
            Name: <strong>{userData?.Full_Name}</strong>
          </li>
          <li className="list-group-item">
            Email: <strong>{userData?.Email}</strong>
          </li>
          <li className="list-group-item">
            Phone Number: <strong>{userData?.Address?.phoneNumber}</strong>
          </li>
          <li className="list-group-item">
            <div className="mb-3 container">
              <div className="mx-auto shadow p-5 bg-red userAddressTableBody">
                <div className="d-flex justify-content-between">
                  <h4 className="mb-3">Shipping Address</h4>
                </div>

                <hr className="mb-4"></hr>
                <h6>{userData?.Address?.address_line_1}</h6>
                <h6>{userData?.Address?.address_line_2}</h6>
                <div className="d-flex">
                  <h6>{userData?.Address?.Landmark}</h6>
                  <h6>, {userData?.Address?.City}</h6>
                </div>
                <div className="d-flex">
                  <h6>{userData?.Address?.state}</h6>
                  <h6>, {userData?.Address?.country}</h6>
                </div>
                <h6>{userData?.Address?.zipcode}</h6>
              </div>
            </div>
          </li>
        </ul>
        {isLoading && <LoaderModal text="User Address Loading..." />}
      </div>
    </>
  );
}
