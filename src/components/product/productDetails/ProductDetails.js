import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db} from '../../../firebase/config';
import { toast } from 'react-toastify';
import styles from './ProductDetails.module.css';
import loader from '../../../assets/loader.gif';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice';


const ProductDetails = () => {
  const {id} = useParams()
  // console.log(id);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart.id === id)

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id
  })

  const getProduct = async () => {

    const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  // console.log("Document data:", docSnap.data());
  const obj = {
    id: id,
    ...docSnap.data()
  }
  setProduct(obj)
} else {
  toast.error("Product not found")
  // console.log("No such document!");
}
  }

  
  useEffect(() => {
    getProduct()
  }, [])

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const decreaseCart = () => {
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }
  

  return (
    <section className={styles.container}>
      <div className={`container ${styles.product}`}>
      <h2>Product Details</h2>
      <div>
        <Link to="/#products">&larr; Back To Products</Link>
      </div>
      {
        product === null ? (
          <img src={loader} alt="loading" style={{width: "50px"}} />
        ) : (
          <>
            <div className={styles.details}>
            <div className={styles.img}>
            <img src={product.imageURL} alt={product.name} />
            </div>
            <div className={styles.content}>
            <h3>{product.name}</h3>
            <p className={styles.price}>{`$${product.price}`}</p>
            <p>{product.desc}</p>
            <p>
              <b>SKU</b> {product.id}
            </p>
            <p>
              <b>Brand</b> {product.brand}
            </p>
            <div className={styles.count}>
            {isCartAdded < 0 ? null : (
              <>
              <button className={styles.addbtn}
            onClick={() => decreaseCart(product)}
            >-</button>
            <p>
              <b>{cart.cartQuantity}</b>
            </p>
            <button className={styles.addbtn}
            onClick={() => addToCart(product)}
            >+</button>  
              </>
            )}
            </div>
            <button className={styles.addTo}
            onClick={() => addToCart(product)}
            >Add To Cart</button>
            </div>

            </div>
          </>
        )
      }
      </div>
    </section>
  )
}


export default ProductDetails