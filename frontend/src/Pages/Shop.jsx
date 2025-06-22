import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IoChevronDownOutline, IoChevronUp } from "react-icons/io5";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Paginate from "../components/Paginate";

const Shop = () => {
  const { categoryTitle } = useParams();
  const [categoryshow, setCategoryshow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const getAllproducts = () => {
    axios
      .get("http://localhost:8899/product/products")
      .then((res) => {
        setAllproducts(res.data.products);
        setFilteredProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredProducts(allproducts);
    } else {
      const filtered = allproducts.filter(
        (product) => product.category.title === category
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    getCategories();
    getAllproducts();
  }, []);

  useEffect(() => {
    if (categoryTitle && allproducts.length > 0) {
      const decodedTitle = decodeURIComponent(categoryTitle);
      filterProductsByCategory(decodedTitle);
    }
  }, [categoryTitle, allproducts]);

  const Skeletonloading = () => (
    <div
      role="status"
      className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700" />
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 lg:w-48 mb-4" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
    </div>
  );

  return (
    <main className="pt-20">
      <div className="container">
        <aside className="grid grid-cols-12 gap-y-2 lg:gap-4 xl:gap-8">
          {/* Sidebar */}
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
                    className={`mb-3 cursor-pointer ${selectedCategory === null ? "font-semibold text-blue-700" : ""}`}
                    onClick={() => filterProductsByCategory(null)}
                  >
                    All Products
                  </li>
                  {categories.map((item, i) => (
                    <li
                      key={item.id || i}
                      className={`mb-3 cursor-pointer hover:text-blue-600 ${selectedCategory === item.title ? "font-semibold text-blue-700" : ""
                        }`}
                      onClick={() => filterProductsByCategory(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
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
