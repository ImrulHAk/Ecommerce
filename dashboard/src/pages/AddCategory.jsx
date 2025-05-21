import React, { useState } from "react";
import axios from "axios";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const res = await axios.post(
        "http://localhost:8899/category/createcategory",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Category created successfully!");
      setFormData({ title: "", description: "", image: null });
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category.");
    }
  };

  return (
    <div className="flex flex-col w-[500px] justify-between bg-white">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium">Category Image *</p>
          <label htmlFor="image">
            <input
              accept="image/*"
              type="file"
              id="image"
              hidden
              onChange={handleImageChange}
              required
            />
            <img
              className="max-w-24 cursor-pointer mt-2"
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              alt="Upload preview"
              width={100}
              height={100}
            />
          </label>
        </div>

        {/* Category Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="title">
            Category Name *
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

        {/* Category Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="description">
            Category Description
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

export default AddCategory;
