import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "./Product";
import Categories from "./Categories";

const Paginate = ({ itemsPerPage, allproducts, allcategory }) => {

  //product pagination
  function ProductItems({ currentProducts }) {
    return (
      <>
        {currentProducts &&
          currentProducts.map((item) => (
            <div>
              <Product productinfo={item} />
            </div>
          ))}
      </>
    );
  }

  const [productOffset, setProductOffset] = useState(0);

  const endProductOffset = productOffset + itemsPerPage;
  const currentProducts = (allproducts || []).slice(productOffset, endProductOffset);
  const productPageCount = Math.ceil((allproducts?.length || 0) / itemsPerPage);

  const handleProductPageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allproducts.length;
    setProductOffset(newOffset);
  };

  //category pagination
  function CategoryItems({ currentCategories }) {
    return (
      <>
        {currentCategories &&
          currentCategories.map((item) => (
            <div key={item._id}>
              <Categories categoryinfo={item} />
            </div>
          ))}
      </>
    );
  }

  const [categoryOffset, setCategoryOffset] = useState(0);
  const endCategoryOffset = categoryOffset + itemsPerPage;
  const currentCategories = (allcategory || []).slice(categoryOffset, endCategoryOffset);
  const categoryPageCount = Math.ceil((allcategory?.length || 0) / itemsPerPage);

  const handleCategoryPageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allcategory.length;
    setCategoryOffset(newOffset);
  };


  return (
    <>
      {/* Products Section */}
      {" "}
      <ProductItems currentProducts={currentProducts} />
      <ReactPaginate
        pageClassName="border border-gray-500 px-2"
        className="flex justify-center items-center cursor-pointer gap-x-3 absolute bottom-[-65px] left-[50%] right-[50%]"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handleProductPageClick}
        pageRangeDisplayed={5}
        pageCount={productPageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName="bg-black text-white dark:bg-white dark:text-black"
      />

      {/* Categories Section */}
      <CategoryItems currentCategories={currentCategories} />
      <ReactPaginate
        pageClassName="border border-gray-500 px-2"
        className="flex justify-center items-center cursor-pointer gap-x-3 my-6"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handleCategoryPageClick}
        pageRangeDisplayed={5}
        pageCount={categoryPageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName="bg-black text-white dark:bg-white dark:text-black"
      />
    </>
  );
};

export default Paginate;
