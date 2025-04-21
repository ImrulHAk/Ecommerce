import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "./Product";

const Paginate = ({ itemsPerPage, allproducts }) => {
  const items = allproducts;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
              <Product productinfo={item} />
            </div>
          ))}
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      {" "}
      <Items currentItems={currentItems} />
      <ReactPaginate
        pageClassName="border border-gray-500 px-2"
        className="flex justify-center items-center cursor-pointer gap-x-3 absolute bottom-[-55px] left-[50%] right-[50%]"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName="bg-black text-white dark:bg-white dark:text-black"
      />
    </>
  );
};

export default Paginate;
