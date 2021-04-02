import React from 'react';
import "./dashboard.css"
import {useHistory} from 'react-router-dom'

import{useGlobalStateUpdate} from '../../context/globalContext'

export default function Cart({ cart, setCart }) {
 const history = useHistory()
  const GlobalStateUpdate = useGlobalStateUpdate()
   
   function checkout(){

    GlobalStateUpdate(prev=>({
      ...prev,
      checkoutData:{cart:cart,Total:Total}
    }))
    history.push("./Checkout")
   }
 
  const getTotalSum = () => {
    return cart.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  };
  const Total = getTotalSum()
  console.log("pury paise",Total)

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity = amount;
    setCart(newCart);
  };
  

  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };
  console.log(cart)
  return (
    <>
      <h1>Cart</h1>
      {cart.length > 0 && (
        <button className='btn btn-primary mt-3' onClick={clearCart}>Clear Cart</button>
      )}
      <h2>Total Cost: Pkr:{getTotalSum()}</h2>
      <div className="container">
        <div className="row justify-content-center">
          {cart.map((product, idx) => (
            <div className="col-md-3 mt-4 mx-3 py-3 " style={{ boxShadow: "0 0 10px grey" }} key={idx}>
              
                <img className="card-img-top" width="100%" src={product.image} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{product.product}</h5>
                  <p className="card-text">pkr:{product.price}</p>

                  <input
                    value={product.quantity}
                    onChange={(e) =>
                      setQuantity(
                        product,
                        parseInt(e.target.value)
                      )
                    } /><br/>

                  <button onClick={() => removeFromCart(product)} className="btn btn-primary">
                    Remove
                 </button>
              </div>
            </div>
          ))}
        </div>
    </div>
              <button className='btn btn-primary mt-5' onClick={checkout}>Check Out</button>
      
    </>
  );
}