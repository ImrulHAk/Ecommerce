import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoChevronDownOutline, IoChevronUp } from "react-icons/io5";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Paginate from "../components/Paginate";

const Shop = () => {
  const [categoryshow, setCategoryshow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  const getCategories = () => {
    axios
      .get("http://localhost:8899/category/allcategory")
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  };

  // Fetch all products
  const getAllproducts = () => {
    axios
      .get("http://localhost:8899/product/products")
      .then((res) => {
        setAllproducts(res.data.products);
        setFilteredProducts(res.data.products); // show all initially
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Filter products by category or show all if null
  const filterProductsByCategory = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    if (categoryTitle === null) {
      setFilteredProducts(allproducts);
    } else {
      const filtered = allproducts.filter(
        (product) => product.category.title === categoryTitle
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    getCategories();
    getAllproducts();
  }, []);

  // Loading skeleton
  const Skeletonloading = () => (
    <div
      role="status"
      className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 lg:w-48 mb-4" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
      <div className="flex items-center mt-4">
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 lg:w-32 mb-2" />
          <div className="lg:w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <main className="pt-20">
      <div className="container">
        <aside className="grid grid-cols-12 gap-y-2 lg:gap-4 xl:gap-8">
          {/* Categories sidebar */}
          <div className="col-span-12 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-md lg:text-xl font-medium">
                    Categories
                  </CardTitle>
                  {categoryshow ? (
                    <IoChevronUp
                      onClick={() => setCategoryshow(!categoryshow)}
                      className="lg:hidden text-xl cursor-pointer"
                    />
                  ) : (
                    <IoChevronDownOutline
                      onClick={() => setCategoryshow(!categoryshow)}
                      className="lg:hidden text-xl cursor-pointer"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className={`${categoryshow ? "block" : "hidden"} lg:block`}>
                <ul>
                  <li
                    className={`mb-3 cursor-pointer ${selectedCategory === null ? "font-semibold text-blue-700" : ""
                      }`}
                    onClick={() => filterProductsByCategory(null)}
                  >
                    All Products
                  </li>
                  {categories.length > 0 ? (
                    categories.map((item, i) => (
                      <li
                        key={item.id || i}
                        className={`mb-3 cursor-pointer hover:text-blue-600 ${selectedCategory === item.title
                            ? "font-semibold text-blue-700"
                            : ""
                          }`}
                        onClick={() => filterProductsByCategory(item.title)}
                      >
                        {item.title}
                        {console.log(item.title)}
                      </li>
                    ))
                  ) : (
                    <p>No categories found.</p>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Product list */}
          <div className="col-span-12 lg:col-span-10 relative">
            <h2 className="mb-[10px] lg:mb-[15px] text-md lg:text-xl font-medium">
              {selectedCategory ? selectedCategory : "All Products"}
            </h2>

            {loading ? (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeletonloading key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                <Paginate allproducts={filteredProducts} itemsPerPage={12} />
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Shop;
