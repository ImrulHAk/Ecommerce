import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Product from "../components/Product";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [categoryshow, setCategoryshow] = useState(false);
  const [allproducts, setAllproducts] = useState([]);
  const [sliceProduct, setSliicesProduct] = useState([]);
  const [showAllProduct, setShowAllProduct] = useState(false);

  const allCategories = [
    {
      name: "Laptop",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif",
    },
    {
      name: "Mobile",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/45155316145b8a3c470eec879287505c.jpg_400x400q75.avif",
    },
    {
      name: "AirPods",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/66566444ed41e0d8ee68e5b84eb15ac6.jpg_400x400q75.avif",
    },
    {
      name: "Perfume",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/02c59e007d26033ac73c137f8b0bf4a5.jpg_400x400q75.avif",
    },
    {
      name: "Watch",
      image:
        "https://img.drz.lazcdn.com/static/bd/p/80f4324a5a119b7ece07430e3fe2d3d2.jpg_400x400q75.avif",
    },
  ];

  // get all products
  function getAllproducts() {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setSliicesProduct(res.data.products.slice(0, 8));
        setAllproducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllproducts();
  }, []);

  let handleShowAllProduct = () => {
    setShowAllProduct(true);
  };

  return (
    <main className="pt-20">
      <div className="container">
        <aside className="grid grid-cols-12 gap-y-2 lg:gap-4 xl:gap-8">
          <div className=" col-span-12 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-md lg:text-xl font-medium">
                    Categories
                  </CardTitle>
                  {categoryshow ? (
                    <IoChevronUp
                      onClick={() => setCategoryshow(!categoryshow)}
                      className="lg:hidden text-xl"
                    />
                  ) : (
                    <IoChevronDownOutline
                      onClick={() => setCategoryshow(!categoryshow)}
                      className="lg:hidden text-xl"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent
                className={`${categoryshow ? "block" : "hidden"} lg:block`}
              >
                <ul>
                  {allCategories.map((item) => (
                    <li className="mb-3 cursor-pointer">{item.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h2 className="mb-[10px] lg:mb-[15px] text-md lg:text-xl font-medium">
              All Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {showAllProduct
                ? Array.isArray(allproducts) &&
                  allproducts.map((item, i) => (
                    <Product key={item.id || i} productinfo={item} />
                  ))
                : Array.isArray(sliceProduct) &&
                  sliceProduct.map((item, i) => (
                    <Product key={item.id || i} productinfo={item} />
                  ))}
            </div>
            <div className="flex justify-center mt-10">
              {!showAllProduct && (
                <Button
                  onClick={handleShowAllProduct}
                  variant="outline"
                  className="w-[300px]"
                >
                  Show All
                </Button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Shop;
