import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([""]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sellingprice: "",
    discountprice: "",
    stock: "",
    category: "",
  });
  const [categories, setCategories] = useState([])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const files = [...images];
    files[index] = e.target.files[0];
    setImages(files);
  };

  const handleColorChange = (e, index) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  const addColorField = () => {
    setColors([...colors, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("sellingprice", formData.sellingprice);
      data.append("discountprice", formData.discountprice);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      console.log(formData)
      // Append colors array
      colors.forEach((color) => data.append("color", color));

      // Append images
      images.forEach((img) => {
        if (img) data.append("images", img); // Note: backend should match "files"
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/product/createproduct`, // <-- your API endpoint
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product created successfully!");

      // Reset all fields after successful submission
      setFormData({
        title: "",
        description: "",
        sellingprice: "",
        discountprice: "",
        stock: "",
        category: "",
      });
      setImages([]);
      setColors([""]);
    } catch (error) {
      console.error(error);
      alert("Error creating product!");
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/category/allcategory`)
      .then((res) =>
        setCategories(res.data.data)
      )
  }, [])

  return (
    <div className="flex flex-col justify-between bg-white">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium">Product Images *</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      images[index]
                        ? URL.createObjectURL(images[index])
                        : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="title">
            Product Name *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="description">
            Product Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Price Fields */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="sellingprice">
              Selling Price *
            </label>
            <input
              id="sellingprice"
              type="number"
              value={formData.sellingprice}
              onChange={handleInputChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="discountprice">
              Discount Price *
            </label>
            <input
              id="discountprice"
              type="number"
              value={formData.discountprice}
              onChange={handleInputChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="stock">
            Stock *
          </label>
          <input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Available stock"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Colors */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="colors">
            Colors *
          </label>
          {colors.map((color, index) => (
            <input
              key={index}
              type="text"
              placeholder="Enter color"
              value={color}
              onChange={(e) => handleColorChange(e, index)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addColorField}
            className="text-indigo-600 font-medium mt-2"
          >
            + Add Another Color
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
