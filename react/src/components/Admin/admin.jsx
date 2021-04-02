import axios from "axios"
import { useEffect, useState } from "react"
import "./admin.css"
import { useHistory } from 'react-router-dom';



function AdminDashboard() {

    var [getorder, setgetorder] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/getOrder",
            withCredentials: true,
        }).then((res) => {
            console.log(res.data)
            setgetorder(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    function updateStatus(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateStatus',
            data: {
                id: id,
                status: "Order confirmed"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    function del (id){
        axios({
            method:'post',
            url:'http://localhost:5000/delete',
            data:{
                id:id
            },
            withCredentials:true
        }).then((res)=>{
            console.log(res.data)
            alert(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    console.log("order:", getorder)
    return (
        <div>

            <div className="container">
                <h2 className="text-center mt-5 mb-5">Customer orders</h2>
                <div className="row justify-content-center">
                    {getorder.map((value, index) => {
                        return (
                            <div className='col-md-5 mr-2 ml-2 mt-4 py-3 px-3' style={{ boxShadow: "0 0 10px grey" }}>
                                <div>
                                    <span>Name:</span>
                                    <span className="float-right">{value.name}</span>
                                </div>
                                <div>
                                    <span>Address:</span>
                                    <span className="float-right">{value.address}</span>
                                </div>
                                <div>
                                    <span>Phone:</span>
                                    <span className="float-right">{value.phone}</span>
                                </div><hr />
                                {value.orders.map((value, index) => {
                                    return (
                                        <div>

                                            <div>
                                                <span>Name:</span>
                                                <span className="float-right">{value.product}</span>
                                            </div>
                                            <div>
                                                <span> Cost:</span>
                                                <span className="float-right">Pkr:{value.price}</span>
                                            </div><hr />

                                        </div>
                                    )
                                })}
                                <div>
                                    <span>Total Cost:</span>
                                    <span className="float-right">Pkr:{value.total}</span>
                                </div>
                                <div >
                                    <span className='float-right mt-2'>
                                        <button className="btn btn-outline-success" onClick={() => {
                                            updateStatus(value._id)
                                        }} >Confirm Order</button>
                                    </span>
                                    <span className='float-left mt-2'>
                                        <button className="btn btn-outline-success" onClick={() => {
                                            del(value._id)
                                        }} >Delete</button>
                                    </span>
                                </div>
                            </div>

                        )

                    })}

                </div>
            </div>

        </div>

    )
}
export default AdminDashboard;