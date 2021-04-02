import axios from 'axios';
import React, { useEffect, useState } from 'react';






export default function Products({ setCart, cart }) {
  
  const [products,setproducts] = useState([]);
  useEffect(()=>{
    axios({
      method:"get",
      url:"http://localhost:5000/getproducts",
      withCredentials:true
    }).then((res)=>{
      setproducts(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.product === item.product
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  // const [category, setCategory] = useState(HOME_GARDEN);

  // const getProductsInCategory = () => {
  //   return products.filter(
  //     (product) => product.category === category
  //   );
  // };

  return (
    <>
      <h1>PRODUCTS</h1><br></br>
      {/* Select a category :
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value={HOME_GARDEN}>{HOME_GARDEN}</option>
        <option value={ElectricItems}>{ElectricItems}</option>
      </select> */}
      <div className="container">
        <div className="row justify-content-center">
          {products.map((product, idx) => (
            <div className="col-md-3 mt-4 mx-3 py-3" style={{ boxShadow: "0 0 10px grey" }} key={idx}>
                <img className="card-img-top" src={product.image} width="100%" alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{product.product}</h5>
                  <p className="card-text">pkr:{product.price}</p>
                  <button onClick={() => addToCart(product)} className="btn btn-primary">
                    Add to Cart
           </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
  );
}