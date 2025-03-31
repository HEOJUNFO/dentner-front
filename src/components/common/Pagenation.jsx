import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * @param {Object} props - The properties object.
 * @param {number} props.total - 항목의 총 개수.
 * @param {number} props.perPage - 한페이지당  개수.
 * @param {number} props.currentPage - 현재 페이지.
 * @param {function} props.onPageChange - 페이지 변경 이벤트.
 * @param {number} props.pageRange - 페이지 네비게이션 개수.
 * @returns {JSX.Element} The Pagination component.
 */
const Pagination = ({ total, perPage, currentPage, onPageChange, pageRange }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [range, setRange] = useState(pageRange || 10);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const resizeListener = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(()=>{
    if (innerWidth <= 767) {
      setRange(5);
    } else {
      setRange(pageRange);
    }
  },[innerWidth])

  useEffect(() => {
    setTotalPages(Math.ceil(total / perPage));
  }, [total, perPage]);

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const halfRange = Math.floor(range / 2);
    let start = currentPage - halfRange;
    let end = currentPage + halfRange - 1;

    //모바일
    if (range == 5) {
      end = currentPage + halfRange
    }

    if (start < 1) {
      start = 1;
      end = Math.min(range, totalPages);
    }

    if (end > totalPages) {
      start = Math.max(1, totalPages - range + 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  if (total === 0) return <></>;
  return (
    <div className="paginate">
      <span>
        <a className="first" onClick={handleFirstPage} disabled={currentPage === 1}>
          처음
        </a>
        <a className="prev" onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
        </a>
        {getPageNumbers().map((page) => {
          if (currentPage === page) {
            return <strong key={`paginate_${page}`}>{page}</strong>;
          } else {
            return (
              <a key={`paginate_${page}`} className={currentPage === page ? 'active' : ''} onClick={() => handlePageChange(page)}>
                {page}
              </a>
            );
          }
        })}
        <a className="next" onClick={handleNextPage} disabled={currentPage === totalPages}>
          다음
        </a>
        <a className="last" onClick={handleLastPage} disabled={currentPage === totalPages}>
          마지막
        </a>
      </span>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageRange: PropTypes.number,
};

Pagination.defaultProps = {
  pageRange: 10,
};

export default Pagination;
