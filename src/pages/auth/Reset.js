import React, { useState } from 'react'
import styles from './auth.module.css';
import resetImg from "../../assets/forgot.gif";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../firebase/config';
import Loader from '../../components/loader/Loader';


const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
  .then(() => {
    setIsLoading(false)
    toast.success("Check your email for a reset link")
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });
  }

  return (
    <>
    {isLoading && <Loader />}
    <section className={styles.container}>
    <div className={styles.img}>
    <img src={resetImg} alt="login-img" />
    </div>
    <div className={styles.form}>
    <h2>Reset</h2>
    <form onSubmit={resetPassword}>
        <input 
        type="text" 
        placeholder='Email' 
        required
         value={email} 
         onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className={styles.btn}>Reset Password</button>

        <div className={styles.links1}>
       <p> <Link to="/login">Login</Link></p>
       <p> <Link to="/register">Register</Link></p>
        </div>
    </form>
    </div>
    </section>
    </>
  )
}

export default Reset