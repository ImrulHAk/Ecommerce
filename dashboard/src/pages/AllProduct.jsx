import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const AllProduct = () => {
  const [products, setProducts]=useState([])
  // const products = [
  //   {
  //     name: "Casual Shoes",
  //     category: "Shoes",
  //     offerPrice: 999,
  //     inStock: true,
  //     image:
  //       "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
  //   },
  //   {
  //     name: "Casual Shoes",
  //     category: "Shoes",
  //     offerPrice: 999,
  //     inStock: false,
  //     image:
  //       "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
  //   },
  //   {
  //     name: "Casual Shoes",
  //     category: "Shoes",
  //     offerPrice: 999,
  //     inStock: true,
  //     image:
  //       "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
  //   },
  // ];

  useEffect(()=>{
axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/products`).then((res)=>{
  setProducts(res.data.products)
})
  },[])

  return (
    <div className="lg:w-[800px]">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product Image</th>
                <th className="px-4 py-3 font-semibold truncate">Product Title</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img src={product.image} alt="Product" className="w-16" />
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3">{product.category.title}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {product.discountprice} Tk
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={product.inStock}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
