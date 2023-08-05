import { useEffect, useState } from 'react'
import styles from './Header.module.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa';
import {HiOutlineMenuAlt3} from 'react-icons/hi';
import {auth} from '../../firebase/config';
import {onAuthStateChanged, signOut } from "firebase/auth";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux part
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice';






const logo = (
  <div className={styles.logo}>
  <Link to="/">
  <h2>
    e<span>Com</span>
  </h2>
  </Link>
  </div>
)


const activeLink = ({isActive}) => 
(isActive ? `${styles.active}` : "")

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [dispalyName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const navigate = useNavigate();
const cartTotalQuantity = useSelector(selectCartTotalQuantity)

useEffect(() => {
  dispatch(CALCULATE_TOTAL_QUANTITY())
}, [])

  const dispatch = useDispatch();

  const fixNavbar = () => {
    if(window.scrollY > 50) {
      setScrollPage(true)
    }
    else {
  setScrollPage(false)
    }
  }
  window.addEventListener("scroll", fixNavbar)

  // currently sigin users
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // console.log(user.displayName);

        if(user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setDisplayName(uName);
        }
        else {
          setDisplayName(user.displayName);
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : dispalyName,
          userID: user.uid,
        }))
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, dispalyName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const hideMenu = () => {
    setShowMenu(false);
  }

  const logoutUser = () => {
   signOut(auth).then(() => {
    toast.success("Successfully logout");
    navigate("/");
      }).catch((error) => {
        toast.error(error.message);
    });
  }


  const cart = (
    <span className={styles.cart} >
        <Link to="/cart">
          Cart
          <FaShoppingCart /><p>{cartTotalQuantity}</p>
        </Link>
        </span>
  )



  return (
    <header className={scrollPage ? ` ${styles.fixed}` : null}>
    <div className={styles.header}>
    {logo}

    <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
    <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : 
    `${styles["nav-wrapper"]}`}
    onClick={hideMenu}
    >
    </div>

      <ul onClick={hideMenu}>
      <li>
      <AdminOnlyLink>
      <Link to="/admin/home">
        <button className={styles.btnAdmin}>Admin</button>
        </Link>
        </AdminOnlyLink>
      </li>
      <li className={styles["logo-mobile"]}>
        {logo}
        <FaTimes size={22} color='#fff' onClick={hideMenu}/>
      </li>
      <li>
        <NavLink to="/" className={activeLink}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={activeLink}>
        Contact Us
        </NavLink>
      </li>
      </ul>
      
      <div className={styles["header-right"]} onClick={hideMenu}>
      <span className={styles.links}>
      <ShowOnLogin>
      <a href="#home" style={{color: "var(--fav-blue)"}}><FaUserCircle size={16}/>Hi, {dispalyName}</a>
      </ShowOnLogin>
      <ShowOnLogout>
      <NavLink to="/login" className={activeLink}>Login</NavLink>
      </ShowOnLogout>
      {/* <NavLink to="/register" className={activeLink}>Register</NavLink> */}
      <ShowOnLogin>
      <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
      </ShowOnLogin>
      <ShowOnLogin>
      <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
      </ShowOnLogin>
      </span>
      {cart}
      </div>
      </nav>

      <div className={styles["menu-icon"]}>
      {cart }
      <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>
    </div>
    </header>
  )
}

export default Header