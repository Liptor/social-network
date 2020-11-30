import React, { useState } from "react"
import styles from "./paginator.module.css"

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 15 }) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [] as Array<number>;
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [portionNumber, setPortionNumber] = useState(1);
  const portionCount = Math.ceil(pagesCount / portionSize);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
        {portionNumber > 1 && 
        <button onClick={() => {setPortionNumber(portionNumber - 1)}}>
            PREV
        </button>}

      {pages
      .filter(pageNumber => pageNumber >= leftPortionNumber && pageNumber <= rightPortionNumber)
      .map((pageNumber) => {
        return (
          <span
            className={currentPage === pageNumber && styles.selectedPage}
            onClick={(e) => {
              onPageChanged(pageNumber);
            }}
          >
            {pageNumber}
          </span>
        );
      })}
      {portionCount > portionNumber && 
        <button onClick={() => {setPortionNumber(portionNumber + 1)}}>
            NEXT
        </button>}
    </div>
  );
};

export default Paginator;
