import axios from 'axios'
import React, { useState } from 'react'

function AddProduct() {
    var [show, setShow] = useState()

    function add(event) {
        event.preventDefault()
        var fileInput = document.getElementById("file")

        console.log("kdfgdjf", fileInput);
        var price = document.getElementById("price").value
        var product = document.getElementById("productName").value
        
        var formData= new FormData();
        formData.append("fileInput",fileInput.files[0]);
        formData.append("price",price);
        formData.append("product",product);

        axios({
            method:"post",
            url:"http://localhost:5000/upload",
            data:formData,
            headers:{'Content-Type':'multipart/form-data'},
            withCredentials:true
        }).then((res)=>{
            console.log(res)
            // console.log(res.data.message)
            setShow(res.data.message)
        }).catch((error)=>{
            console.log(error)
        })

    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <form onSubmit={add}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail14">Product Name</label>
                                    <input type="text" className="form-control" id="productName" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail14">Price</label>
                                    <input type="text" className="form-control" id="price" required />
                                </div>
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="file" />
                                        <label className="custom-file-label" for="file">Choose Image</label>
                                    </div>
                                </div><br/>
                                <button type="submit" className=" btn btn-primary">Add Product</button>
                            </div>
                        </form><br/>
                        {show? <div className="alert alert-success" role="alert">{show}</div>:null }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;