import React from 'react'
import styles from './Loader.module.css';
import loaderImg from '../../assets/loader.gif';
import ReactDOM  from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
    <div className={styles.loader}>
    <img src={loaderImg} alt="Loading..." />
    </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader