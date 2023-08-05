import React, { useState } from 'react'
import styles from './Pagination.module.css';


const Pagination = ({currentPage, setCurrentPage, productsPerPage, totalProducts}) => {

    const pageNumbers = [] // limit the page numbers shown
    const totalPages = totalProducts / productsPerPage;

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0)


    // paginate
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // got to next page
    const pageinateNext = () => {
        setCurrentPage(currentPage + 1);
        // show next set of page numbers
        if(currentPage +1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    
    // got to previous page
    const pageinatePrev = () => {
        setCurrentPage(currentPage - 1);
        if(currentPage -1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    
    for(let i=1; i<=Math.ceil(totalProducts/productsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <>
        <ul className={styles.pagination}>
            <li onClick={pageinatePrev} className={
                currentPage === pageNumbers[0] ? `${styles.hidden}` : null
            }>Prev</li>
            {pageNumbers.map((number) => {

                if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                    return (
            <li key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? `${styles.active}` : null}
            >{number}</li>
                )
                }
            })}

            <li onClick={pageinateNext} className={
                currentPage === pageNumbers[pageNumbers.length -1]
                ? `${styles.hidden}`
                : null
            }>Next</li>
            <p>
                <b className={styles.page}>{`page ${currentPage}`}</b>
                <span>{` of `}</span>
                <b>{`${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    </>
  )
  
}

export default Pagination