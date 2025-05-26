import axios from "axios";
import React, { useEffect, useState } from "react";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);


  // Fetch products
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/product/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/product/deleteproduct/${id}`
      );
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Open modal
  const handleView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Submit edit
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/category/allcategory`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const {
      _id,
      title,
      description,
      sellingprice,
      discountprice,
      stock,
      color,
      category,
      imageFiles
    } = selectedProduct;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sellingprice", sellingprice);
    formData.append("discountprice", discountprice);
    formData.append("stock", stock);
    formData.append("color", color);
    formData.append("category", category);

    if (imageFiles?.length) {
      for (let file of imageFiles) {
        formData.append("files", file); // backend should handle `req.files`
      }
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/product/updateproduct/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data.data;
      setProducts((prev) =>
        prev.map((prod) => (prod._id === _id ? updated : prod))
      );
      setIsModalOpen(false);
      alert("Product updated successfully");
    } catch (err) {
      console.error("Edit error:", err);
    }
  };


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
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={
                          Array.isArray(product.image)
                            ? product.image[0]
                            : product.image
                        }
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.title.slice(0, 10)}...</td>
                  <td className="px-4 py-3">{product.category?.title}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {product.discountprice} Tk
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleView(product)}
                        className="cursor-pointer text-green-500 text-[16px] font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="cursor-pointer text-red-500 text-[16px] font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleEditSubmit}
              className="bg-white p-6 rounded-md w-[400px] space-y-4 shadow-lg"
              encType="multipart/form-data"
            >
              <h2 className="text-lg font-bold mb-2">Edit Product</h2>

              <input type="text" value={selectedProduct.title}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                className="w-full border p-2 rounded" placeholder="Product Title" />

              <textarea type="text" value={selectedProduct.description}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                className="w-full border p-2 rounded" placeholder="Description" />

              <input type="number" value={selectedProduct.sellingprice}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, sellingprice: e.target.value })}
                className="w-full border p-2 rounded" placeholder="Selling Price" />

              <input type="number" value={selectedProduct.discountprice}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, discountprice: e.target.value })}
                className="w-full border p-2 rounded" placeholder="Discount Price" />

              <input type="number" value={selectedProduct.stock}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                className="w-full border p-2 rounded" placeholder="Stock" />

              <input type="text" value={selectedProduct.color}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                className="w-full border p-2 rounded" placeholder="Color" />

              <select
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value="">Select Category **</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, files: e.target.files })}
                  className="w-full border p-2 rounded"
                />
                <h2 className="text-sm text-gray-500">Maximum (1-4) images can be updated at a time</h2>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-1 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
