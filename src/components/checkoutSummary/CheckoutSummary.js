import React from 'react'
import styles from './CheckoutSummary.module.css';
import { UseSelector, useSelector } from 'react-redux';
import {selectCartItems, selectCartTotalAmount, selectCartTotalQuantity} from "../../redux/slice/cartSlice";
import { Link } from 'react-router-dom';
import Card from '../card/Card';

const CheckoutSummary = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <>
    <div>
        <h3>Checkout Summary</h3>
        <div>
            {cartItems.length === 0 ? (
             <>
             <p>No Item in your cart.</p>
                <button className={styles.backbtn}>
                    <Link to="/#products">Back To Shop</Link>
                </button>
             </>
            ) : (
                <>
                    <div>
                    <p>
                    <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                    </p>
                    <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{cartTotalAmount.toFixed(2)}</h3>
                    </div>
                    {
                        cartItems.map((item, index) => {
                            const {id, name, price, cartQuantity} = item;
                            return (
                                <Card key={id} cardClass={styles.card}>
                                <h4>Product: {name}</h4>
                                <p>Quantity: {cartQuantity}</p>
                                <p>Unit price: {price}</p>
                                <p>Set price: {price * cartQuantity}</p>
                                </Card>
                            )
                        })
                    }
                    </div>
                </>
            )}
        </div>
    </div>
    </>
  )
}

export default CheckoutSummary