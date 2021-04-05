import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button , Form , Nav , Navbar , FormControl ,Link} from "react-dom";
import "./signup.css"
import axios from "axios";
import {
  useHistory
} from "react-router-dom";
// import { useState } from 'react';


function Signup() {
  var url = "http://localhost:5000"
  let history = useHistory()
  let [show, setshow  ] = useState()
  let [showSucess, setshowsucces  ] = useState()
  

  function sign(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var Data = {
      name: name,
      email: email,
      phone: phone,
      password: password
    }
    axios({
      method: "post",
      url: url + "/auth/signup",
      data: Data,
      withCredentials: true
    }).then((response) => {
      if (response.data.status === 200) {
        // history.push("/login")        
        setshowsucces(response.data.message)
      }else{
        setshow(response.data.message)
      }
      console.log(response.data.message)
    }).catch((error) => {
      console.log(error);
    });

  }


  return (
    <div className="main">
      <h1 className="sign">Signup</h1><br></br>
      <form onSubmit={sign}>
        <div className="form-group text-center ">
          
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" required />

        </div>
        <div className="form-group text-center">
          
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />

        </div>
        <div className="form-group text-center">
          
          <input type="number" className="form-control" id="phone" aria-describedby="emailHelp" placeholder="Enter phone" required />

        </div>
        <div className="form-group text-center">
        
          <input type="password" className="form-control" id="password" placeholder="Password" required />
        </div>

        <button type="submit" className="btn btn-primary container-fluid mb-3 ">Sign up</button><br></br>
        {show?<div class="alert alert-danger" role="alert">{show}</div>:null}

        {showSucess? <div class="alert alert-success" role="alert"> {showSucess}       
          <span style={{cursor: "pointer"}} onClick={()=>{
           history.push("/login")
         }}> : Login</span> </div>:null}

      </form>

    </div>
  )

}

export default Signup;
