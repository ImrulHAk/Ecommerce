import React, { useState } from "react";
import axios from "axios";

const AddBanner = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

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
        "http://localhost:8899/banner/addbanner",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Banner added successfully!");
      setFormData({ image: null });
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("Failed to add banner.");
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
          <p className="text-base font-medium">Banner Image *</p>
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

export default AddBanner;
