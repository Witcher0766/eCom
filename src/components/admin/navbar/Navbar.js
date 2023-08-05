import React from 'react'
import styles from './NavbarAdmin.module.css';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import {selectUserName} from '../../../redux/slice/authSlice';
import { NavLink } from 'react-router-dom';


const activeLink = ({isActive}) => 
(isActive ? `${styles.active}` : "")

const Navbar = () => {

  const userName = useSelector(selectUserName);

  return (
    <>
      <div className={styles.navbar}>
      <div className={styles.user}>
      <FaUserCircle size={40} color='#fff' />
      {userName}
      </div>
      <nav>
      <ul>
        <li>
          <NavLink to="/admin/home" className={activeLink}>
            Home
          </NavLink>
          </li>
       <li>
       <NavLink to="/admin/all-products" className={activeLink}>
            View Products
          </NavLink>
       </li>
         <li>
         <NavLink to="/admin/add-product/ADD" className={activeLink}>
          Add Product
          </NavLink>
         </li>
         <li>
         <NavLink to="/admin/orders" className={activeLink}>
          Orders
          </NavLink>
         </li>
       
      </ul>
      </nav>
      </div>
    </>
  )
}

export default Navbar