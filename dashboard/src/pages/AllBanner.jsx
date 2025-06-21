import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBanner = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBanners = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/banner/fetchallbanner`)
      .then((res) => setBanners(res.data.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/banner/deletebanner/${id}`);
      setBanners(banners.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleView = (banner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description, imageFile } = selectedBanner;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/banner/updatebanner/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = res.data.data;
      setBanners((prev) =>
        prev.map((b) => (b._id === _id ? updated : b))
      );

      setIsModalOpen(false);
      alert("Banner updated successfully!");
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="lg:w-[800px]">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Banners</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Banner Image</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {banners.map((banner) => (
                <tr key={banner._id} className="border-t border-gray-500/20">
                  <td className="px-4 py-3">
                    <div className="border border-gray-300 rounded p-2 w-fit">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleView(banner)}
                        className="text-green-500 text-[16px] font-semibold cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
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
        {isModalOpen && selectedBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleEditSubmit}
              className="bg-white p-6 rounded-md w-[400px] space-y-4 shadow-lg"
              encType="multipart/form-data"
            >
              <h2 className="text-lg font-bold mb-2">Edit Banner</h2>

              {/* File Upload */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setSelectedBanner((prev) => ({
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

export default AllBanner;
