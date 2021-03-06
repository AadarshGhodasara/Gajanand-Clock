import React, { useEffect, useState } from "react";
import Header from "../AddPhoto/AddPhotoHeader";
import firebase, { timestamp } from "../../Components/Firebase";
import Swal from "sweetalert2";
import LoaderModal from "../../Components/Loader/LoaderModal";
import { useParams } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import "./ProductHistory.css";
const Footer = React.lazy(() => import("../../Components/Footer/Footer"));
export default function ProductHistory() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(async () => {
    setIsLoading(true);
    const CurrentUser = firebase.auth().currentUser;
    // let total = 0
    // if(CurrentUser){
    var starCountRef = firebase.database().ref(`User/${id}/History`);
    await starCountRef.on("value", (snapshot) => {
      setData(snapshot.val());
      console.log(snapshot.val());
      setIsLoading(false);
    });
    // }
  }, []);

  const handleRemoveItem = (productName, productStatus) => {
    const CurrentUser = firebase.auth().currentUser;
    // const temp = new Date()
    if (
      productStatus !== "Order dilivered" &&
      productStatus !== "Order Cancel"
    ) {
      if (productStatus !== "Order In Transition") {
        Swal.fire({
          title: "Are you sure cancel Order?",
          text: "You won't be able to revert this order!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
          if (result.isConfirmed) {
            firebase
              .database()
              .ref(`User/${id}/History/${productName}`)
              .remove()
              .then(() => {
                firebase
                  .database()
                  .ref(
                    `Admin/CymHA6isY3aNB4eKcWji4RDYij73/Orders/${id}/${productName}`
                  )
                  .remove()
                  .then(() => {
                    Swal.fire(
                      "Order Cancel!",
                      "Your Order has been Canceled.",
                      "success"
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You Cannot Cancel Order because order in transition.",
        });
      }
    } else {
      Swal.fire({
        title: "Are you sure delete Order from history?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          firebase
            .database()
            .ref(`User/${id}/History/${productName}`)
            .remove()
            .then(() => {
              Swal.fire(
                "Deleted order from history!",
                "Your order has been deleted from history.",
                "success"
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "Montserrat,sans-serif",backgroundColor: "white" }}>
      {/* <label>LOL</label> */}
      <Header text={"Order History"} clock={true} />
      <div className="pb-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 bg-white rounded shadow-sm mb-5 productHistoryTableBody">
              <div className="table-responsive-lg">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Status</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {console.log('DATA RENDER =>',data,Object.values(data))} */}
                    {data ? (
                      <>
                        {Object.values(data).map((product) => (
                          <tr key={product.product_name}>
                            <th scope="row" className="border-0">
                              <div className="p-2" style={{ width: "350px" }}>
                                <img
                                  src={product.img_URL}
                                  alt=""
                                  width="70"
                                  className="img-fluid rounded shadow-sm"
                                />
                                <div className="ml-3 d-inline-block align-middle">
                                  <h5 className="mb-0">
                                    {" "}
                                    <a
                                      href={`/Clock/Details/${product.product_id}`}
                                      className="text-dark d-inline-block align-middle"
                                    >
                                      {product.product_name}
                                    </a>
                                  </h5>
                                  <span className="text-muted font-weight-normal font-italic d-block">
                                    Category: Wall {product.product_type}
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td className="border-0 align-middle">
                              <strong>₹{product.product_price}</strong>
                            </td>
                            <td className="border-0 align-middle">
                              {product.no_of_quantity}
                              {/* <input type='number' value={product.no_of_quantity}  style={{width:'4vw',marginLeft:'1%',marginRight:'1%'}}/> */}
                            </td>
                            <td className="align-middle w-25">
                              <label
                                className={`text-white  pl-5 pr-5 pt-2 pb-2 
                        ${
                          product.Status === "Order Pending"
                            ? "bg-warning text-dark"
                            : `
                        ${
                          product.Status === "Order Confirm"
                            ? "bg-secondary"
                            : `
                        ${
                          product.Status === "Order In Transition"
                            ? "bg-dark"
                            : `
                        ${
                          product.Status === "Order Cancel"
                            ? "bg-danger"
                            : "bg-success"
                        }`
                        }`
                        }`
                        }`}
                                style={{ width: "300px", textAlign: "center" }}
                              >
                                {product.Status}
                              </label>
                            </td>
                            <td
                              className="border-0 align-middle"
                              onClick={() =>
                                handleRemoveItem(
                                  product.product_access_name,
                                  product.Status
                                )
                              }
                            >
                              <DeleteIcon />
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <th
                          scope="row"
                          colSpan="5"
                          style={{ textAlign: "center" }}
                        >
                          <h2>You have no orders</h2>
                          <h6>Start Shopping</h6>
                        </th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="p-3 pl-5 mb-2 bg-danger text-dark w-100">
              <label className="text-white">
                * After transition of order you cannot cancel order.
                <br />* After confirmation of order, item will be shipped within 2-3 business days.
              </label>
            </div>
          </div>
        </div>
        {isLoading && <LoaderModal text="Product Loading..." />}
      </div>
      <div className="user-product-history-footer">
        <Footer />
      </div>
    </div>
  );
}
