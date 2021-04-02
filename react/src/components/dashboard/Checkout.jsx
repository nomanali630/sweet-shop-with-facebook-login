import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalState, useGlobalStateUpdate } from "../../context/globalContext"
function Checkout() {
  let [show, setshow] = useState()
  var GlobalState = useGlobalState()
  console.log("data: ", Number(GlobalState.checkoutData.Total))
  console.log("data: ", GlobalState)
  function order(e) {
    e.preventDefault()
    axios({
      method: "post",
      url: "http://localhost:5000/order",
      data: {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        orderData: GlobalState.checkoutData.cart,
        Total: GlobalState.checkoutData.Total
      },
      withCredentials: true
    }).then((res) => {
      if (res.data.status === 200) {
        setshow(res.data.message)
        console.log(res.data.message)
      } else {
        setshow(res.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div className="Container " style={{ boxShadow: "0 0 10px grey" ,width:"400px" ,margin:"0 auto"} }>
      <h3 className=" col-sm-12 mt-5 pt-3 row justify-content-center">Check Out</h3>
      <div className=" col-sm-12 mt-5 row justify-content-center">
         
        <form onSubmit={order} >
          <div className="form-group">
            {/* <label htmlFor="exampleInputEmail1">Name</label> */}
            <input type="text" className="name" id="name" aria-describedby="emailHelp" placeholder="Name" required />

          </div>
          <div className="form-group">
            {/* <label htmlFor="exampleInputPassword1">Phone</label> */}
            <input type="number" className="phone" id="phone" placeholder="Phone (confirmation)" required />
          </div>
          <div className="form-group">
            {/* <label htmlFor="exampleInputPassword1">Address</label> */}
            <input type="text" className="address" id="address" placeholder="Address" required />
          </div>
          <button type="submit" className="btn btn-outline-success mb-4 container-fluid ">Submit</button>
          {show ? <div class="alert alert-success" role="alert">{show}</div> : null}
        </form>

      </div>
    </div>
  )
}
export default Checkout;