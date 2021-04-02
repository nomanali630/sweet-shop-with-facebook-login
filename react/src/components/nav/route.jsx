
// import react from "react";
import {
    HashRouter as Router,
    Redirect,
    Route,

} from "react-router-dom";
import AdminDashboard from '../Admin/admin'
import AddProduct from '../Admin/AddProduct'


import Login from "./../login/login";
import Signup from "./../signup/signup";
import Dashboard from "./../dashboard/dashboard";
import Checkout from "../dashboard/Checkout"
import Myorders from '../dashboard/myOrders'

import { useGlobalState } from "../../context/globalContext"
import Nav from './nav'
function Rout() {
    const GlobalState = useGlobalState()
    console.log(GlobalState)
    return (
        <div>
            <Router>
            <Nav />

                {GlobalState.role === null ?
                    <div>
                        <Route exact path="/">
                            <Signup />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </div> : null}

                {GlobalState.role === "user" ?
                    <div>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/checkout">
                            <Checkout />
                        </Route>
                        <Route path="/myOrders">
                            <Myorders />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </div> : null}
                    {GlobalState.role === "admin" ?
                    <div>
                        <Route exact path="/">
                            <AdminDashboard />
                        </Route>
                        <Route  path="/addproduct">
                            <AddProduct />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                        
                    </div> : null}
            </Router>
        </div>
    )
}
export default Rout;