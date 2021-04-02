import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Myorders() {
    const [myOrder, setMyOrder] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/myOrders',
            withCredentials: true
        }).then((res) => {
            setMyOrder(res.data.data)
            console.log(res.data)
            
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    console.log("mera maal",myOrder)
    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>My Orders</h1>
                <div className='row justify-content-center'>
                {myOrder.length === 0 ?
                        <>
                            <div>loading</div>
                            <div></div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </>
                        : null}


                    { 
        
                        myOrder.map((value, index) => {
                            {console.log('value is ',value)}
                            return (
                                <div className='col-md-6 mr-2 mt-4 py-3 px-3' style={{ boxShadow: '0 0 10px grey' }}>
                                    {
                                        value.orders.map((v, i) => {
                                            return (
                                                <div>
                                                    <div className='row'>
                                                        <div className='col-md-4'>{v.product}:</div>
                                                        <div className='col-md-4 text-center'>{v.quantity}kg</div>
                                                        <div className='col-md-4 text-right'>pkr: {v.price}</div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <hr />
                                    <div>
                                        <span>Total Amount:</span>
                                        <span className='float-right'>{value.total} PKR</span>
                                    </div>
                                    <div>
                                        <span>Status:</span>
                                        <span className='float-right'>{value.status}</span>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}
export default Myorders;