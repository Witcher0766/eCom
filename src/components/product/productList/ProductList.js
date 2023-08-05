import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.css';
import {BsFillGridFill} from 'react-icons/bs';
import {FaListAlt} from 'react-icons/fa';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

const ProductList = ({products}) => {

  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("latest")

  const filteredProducts = useSelector(selectFilteredProducts);


  // pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(9);
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({products, sort}))
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [dispatch, products, search]);


  return (
    <>
      <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
      <div className={styles.icons}>
      <BsFillGridFill 
      size={22}
      color = "var(--fav-blue)"
      onClick={() => setGrid(true)}
       />
       <FaListAlt 
        size={24}
        color='#0066d4'
        onClick={() => setGrid(false)}
       />
       <p>
        <b>{filteredProducts.length}</b> Products found.
       </p>
      </div>

      <div>
        <Search value={search} onChange={(e) => setSearch(e.target.value)}  
        />
      </div>

      <div className={styles.sort}>
      <label >
      Sort By:
      </label>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="lowest-price">Lowest Price</option>
        <option value="highest-price">Highest Price</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
      </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>

      {products.length === 0 ? (
        <p>
        No product found.
        </p>
      ) : (
        <>
        {
          currentProducts.map((product) => {
          
            return (
              <div key={product.id}>
              <ProductItem {...product} grid={grid} product={product} />
              </div>
            )
          })
        }
        </>
      )}

      </div>
      <Pagination 
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      productsPerPage={productsPerPage}
      totalProducts = {filteredProducts.length}
       />
      </div>
    </>
  )
}

export default ProductList