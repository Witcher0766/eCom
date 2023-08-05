import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styles from './CheckoutForm.module.css';
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from '../../assets/loader.gif';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";


    const  CheckoutForm = () =>  {
  const stripe = useStripe();
  const elements = useElements();


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);


  const saveOrder = () => {

    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleTimeString()
    const orderConfig = {
      userID, 
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate()
    }

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART())
      toast.success("Order Saved")
      navigate("/checkout-success")
    } catch(error) {
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {

      return;
    }

    setIsLoading(true);


    const confirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://ecom-service-qpf5.onrender.com/checkout-success",
      },
      redirect: "if_required"
    })
    .then((result) => {
        // ok - paymentIntent bad - error
        if(result.error) {
            toast.error(result.error.message);
            setMessage(result.error.message);
        }
        if(result.paymentIntent) {
            if(result.paymentIntent.status === "succeeded") {
                setIsLoading(false)
                toast.success("Payment successful");
                saveOrder();
            }
        }
    });
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
        <section>
            <div className={`container ${styles.checkout}`}>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <Card cardClass={styles.card}>
                    <CheckoutSummary />
                    </Card>
                </div>
                <div>
                    <Card cardClass={`${styles.card} ${styles.pay}`}>
                    <h3>Stripe Checkout</h3>
                    <PaymentElement id={styles["payment-element"]} options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit"
      className={styles.buttonPayment}
      >
        <span id="button-text">
          {isLoading ? (<img src={spinnerImg} alt="Loading...." style={{width: "20px"}}/>) 
          : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id={styles["payment-message"]}>{message}</div>}
                    </Card>
                </div>
            </form>
            </div>
        </section>
    </>
  );
}


export default CheckoutForm;