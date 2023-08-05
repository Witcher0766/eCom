import React, {useState} from 'react'
import styles from './auth.module.css';
import loginImg from "../../assets/login.gif";
import {Link, useNavigate} from 'react-router-dom';
import {FaGoogle} from "react-icons/fa";
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from '../../firebase/config';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { selectPreviousURL } from '../../redux/slice/cartSlice';


const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const previousURL = useSelector(selectPreviousURL);


  const redirectUser = () => {
    if(previousURL.includes("cart")) {
      return navigate("/cart")
    }
    else {
      navigate("/")
    }
  }

  const loginUser = (e) => {
    e.preventDefault();
    // console.log(email, password);
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // const user = userCredential.user;
    setIsLoading(false)
    toast.success("Login successful..!!")
    redirectUser()
  })
  .catch((error) => {
    toast.error(error.message);
    setIsLoading(false)
  });
  };


  //Login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    toast.success("Login is successfully..!!")
    redirectUser()
  }).catch((error) => {
    toast.error(error.message)
  });
  }

  return (
    <>
    {/* <ToastContainer /> */}
    {isLoading && <Loader/>}
    <section className={styles.container}>
    <div className={styles.img}>
    <img src={loginImg} alt="login-img" />
    </div>
    <div className={styles.form}>
    <h2>Login</h2>
    <form onSubmit={loginUser}>
        <input 
        type="text" 
        placeholder='Email' 
        required
        value={email}  
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        placeholder='Password' 
        required 
        value={password}  
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className={styles.btn}>Login</button>
        <div className={styles.links}>
        <Link to="/reset">Reset Password</Link>
        </div>
        <p>-- or --</p>
    </form>
    <button onClick={signInWithGoogle}  className={styles.btn1}><FaGoogle color="#fff" />Login with Google</button>
    <span className={styles.register}>
    <p>Don't have an account?</p>
    <Link to="/register">Register</Link>
    </span>

    </div>
    </section>
    </>
  )
}

export default Login