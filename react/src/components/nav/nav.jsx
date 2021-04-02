import { Link } from "react-router-dom"
import Logout from './logout'

import { useGlobalState } from "../../context/globalContext"

function Nav() {
  const GlobaleState = useGlobalState()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {
            (GlobaleState.loginStatus === true && GlobaleState.role === "admin") ?
              <div>
                <ul className="navbar-nav mr-auto">

                  <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Addproduct">Add Product</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/orderhistory">Order History <span className="sr-only">(current)</span></Link>
                  </li>

                  <div style={{ marginLeft: "900px" }} >
                    <Logout />
                  </div>
                </ul>

              </div> : null}
          {
            (GlobaleState.loginStatus === true && GlobaleState.role === "user") ?
              <div>
                <ul className="navbar-nav mr-auto">

                  <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myOrders">my orders</Link>
                  </li>
                  <div style={{ marginLeft: "1000px" }} >
                    <Logout />
                  </div>
                </ul>

              </div> : null}


          {(GlobaleState.loginStatus === false) ?

            <div>
              <form className="form-inline my-2 my-lg-0 "  >
                {/* <button className="btn btn-outline-success my-2 my-sm-0 " type="submit">
                  <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
                </button>
                <button className="btn btn-outline-success my-2 my-sm-0 ml-3" type="submit">
                  <Link className="nav-link" to="/signup">Signup <span className="sr-only">(current)</span></Link>
                </button> */}
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Log In</Link>
                  </li>
                </ul>


              </form>
            </div> : null
          }
        </div>
      </nav>
    </div>
  )

}

export default Nav