import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import { FacebookLoginButton } from "react-social-login-buttons";

import "./login.css"
import {
  useHistory
} from "react-router-dom"
import { useGlobalStateUpdate } from '../../context/globalContext'

function Login() {
  var GlobaleStateUpdate = useGlobalStateUpdate()
  let url = "http://localhost:5000";
  let [show, setshow] = useState();
  let history = useHistory();

  function login(event) {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5000/auth/login",
      data: {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      },
      withCredentials: true
    }).then((response) => {
      if (response.data.status === 200) {
        GlobaleStateUpdate(prev => ({
          ...prev,
          loginStatus: true,
          user: response.data.user,
          role: response.data.user.role
        }))
        // history.push("/dashboard")
        console.log(response.data.message)
      } else {
        history.push("/login")
        setshow(response.data.message)
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <div className="main">
      <h1 className="sign">Login</h1><br></br>
      <form onSubmit={login}>
        <div className="form-group text-center">

          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group text-center">

          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary container-fluid mb-3">Login</button><br></br>
        
        {show ? <div class="alert alert-danger" role="alert">{show}
        </div> : null}
      </form>
      <a href='http://localhost:5000/auth/facebook'><FacebookLoginButton /></a>
    </div>
  )
}

export default Login;