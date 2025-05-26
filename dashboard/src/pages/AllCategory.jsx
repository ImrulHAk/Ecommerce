import axios from "axios";
import React, { useEffect, useState } from "react";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories
  const fetchCategories = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/category/allcategory`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/category/deletecategory/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Open edit modal
  const handleView = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description, imageFile } = selectedCategory;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) formData.append("file", imageFile);

      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/category/updatecategory/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", res.data);
      const updated = res.data.data;

      setCategories((prev) =>
        prev.map((cat) => (cat._id === _id ? updated : cat))
      );

      setIsModalOpen(false);
      alert("Category updated successfully!");
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="lg:w-[800px]">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Categories</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Category Image</th>
                <th className="px-4 py-3 font-semibold truncate">Category Title</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {categories.map((cat) => (
                <tr key={cat._id} className="border-t border-gray-500/20">
                  <td className="px-4 py-3">
                    <div className="border border-gray-300 rounded p-2 w-fit">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">{cat.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleView(cat)}
                        className="text-green-500 text-[16px] font-semibold cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-red-500 text-[16px] font-semibold cursor-pointer"
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
        {isModalOpen && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleEditSubmit}
              className="bg-white p-6 rounded-md w-[400px] space-y-4 shadow-lg"
              encType="multipart/form-data"
            >
              <h2 className="text-lg font-bold mb-2">Edit Category</h2>

              <input
                type="text"
                value={selectedCategory.title}
                onChange={(e) =>
                  setSelectedCategory({ ...selectedCategory, title: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Title"
                required
              />

              <textarea
                value={selectedCategory.description}
                onChange={(e) =>
                  setSelectedCategory({ ...selectedCategory, description: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Description"
                rows={3}
              />

              {/* File Upload */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setSelectedCategory(prev => ({
                        ...prev,
                        imageFile: e.target.files[0],
                      }));
                    }
                  }}
                  className="w-full border p-2 rounded"
                />
                <h2 className="text-sm text-gray-500">Maximum 1 image can be updated</h2>

              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
