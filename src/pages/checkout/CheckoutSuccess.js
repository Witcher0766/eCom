import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <>
      <section>
        <div className='container'>
        <h1>Checkout Successful</h1>
        <p>Thank you for your purchase</p>
        <br />
        
          <button className='btn-success'>
          <Link to="/order-history">
          View Order Status
          </Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default CheckoutSuccess