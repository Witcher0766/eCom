import React, { useState } from 'react'
import styles from './CheckoutDetails.module.css';
import Card from '../../components/card/Card';
import { CountryDropdown } from 'react-country-region-selector';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS} from '../../redux/slice/checkoutSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';


const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
}

const CheckoutDetails = () => {

  const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
  const [billingAddress, setBillingAddress] = useState({...initialAddressState});

  const handleShipping = (e) => {
    const {name, value} = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    })
  }
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleBilling = (e) => {
    const {name, value} = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(shippingAddress)
    // console.log(billingAddress)
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))
    navigate("/checkout");
  }

  return (

    <>
      <section>
        <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form  onSubmit={handleSubmit}>
        <div>
          <Card cardClass = {styles.card}>
          <h3>Shipping Address</h3>
          <label >Recipient Name</label>
          <input type="text" 
            placeholder="Recipient Name"
            name="name"
            value={shippingAddress.name}
            required
            onChange={(e) => handleShipping(e)}
          />
          <label >Address line 1</label>
          <input type="text" 
            placeholder="Address line 1"
            name="line1"
            value={shippingAddress.line1}
            required
            onChange={(e) => handleShipping(e)}
          />
          <label >Address line 2</label>
          <input type="text" 
            placeholder="Address line 2"
            name="line2"
            value={shippingAddress.line2}
            onChange={(e) => handleShipping(e)}
          />
          <label >City</label>
          <input type="text" 
            placeholder="City"
            name="city"
            required
            value={shippingAddress.city}
            onChange={(e) => handleShipping(e)}
          />
          <label >State</label>
          <input type="text" 
            placeholder="State"
            name="state"
            required
            value={shippingAddress.state}
            onChange={(e) => handleShipping(e)}
          />
          <label >Postal Code</label>
          <input type="text" 
            placeholder="Postal Code"
            name="postal_code"
            required
            value={shippingAddress.postal_code}
            onChange={(e) => handleShipping(e)}
          />
          <CountryDropdown
            valueType="short"
            className={styles.select}
            value={shippingAddress.country}
            onChange={(val) => handleShipping({
              target: {
                name: "country",
                value: val,
              }
            })}
          />
          <label >Phone</label>
          <input type="text" 
            placeholder="Phone"
            name="phone"
            required
            value={shippingAddress.phone}
            onChange={(e) => handleShipping(e)}
          />
          </Card>

          {/* Billing address  */}

          <Card cardClass = {styles.card}>
          <h3>Billing Address</h3>
          <label >Recipient Name</label>
          <input type="text" 
            placeholder="Name"
            name="name"
            value={billingAddress.name}
            required
            onChange={(e) => handleBilling(e)}
          />
          <label >Address line 1</label>
          <input type="text" 
            placeholder="Address line 1"
            name="line1"
            value={billingAddress.line1}
            required
            onChange={(e) => handleBilling(e)}
          />
          <label >Address line 2</label>
          <input type="text" 
            placeholder="Address line 2"
            name="line2"
            value={billingAddress.line2}
            onChange={(e) => handleBilling(e)}
          />
          <label >City</label>
          <input type="text" 
            placeholder="City"
            name="city"
            required
            value={billingAddress.city}
            onChange={(e) => handleBilling(e)}
          />
          <label >State</label>
          <input type="text" 
            placeholder="State"
            name="state"
            required
            value={billingAddress.state}
            onChange={(e) => handleBilling(e)}
          />
          <label >Postal Code</label>
          <input type="text" 
            placeholder="Postal Code"
            name="postal_code"
            required
            value={billingAddress.postal_code}
            onChange={(e) => handleBilling(e)}
          />
          <CountryDropdown
            valueType="short"
            className={styles.select}
            value={billingAddress.country}
            onChange={(val) => handleBilling({
              target: {
                name: "country",
                value: val,
              }
            })}
          />
          <label >Phone</label>
          <input type="text" 
            placeholder="Phone"
            name="phone"
            required
            value={billingAddress.phone}
            onChange={(e) => handleBilling(e)}
          />
          <button type='submit'
          className={styles.checkoutButton}
          >
            <Link to="/order-history">
            Proceed To Checkout
            </Link>
          </button>
          </Card>
        </div>
        <div>
          <Card cardClass={styles.card}>
          <CheckoutSummary />
          </Card>
        </div>
        </form>
        </div>
      </section>
    </>
  )
}

export default CheckoutDetails