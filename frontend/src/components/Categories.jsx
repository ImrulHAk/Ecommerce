import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [sliceCategory, setSliicesCategory] = useState([]);
  const [showAllCategory, setShowAllCategory] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // get all categories
  useEffect(() => {
    axios
      .get("http://localhost:8899/category/allcategory")
      .then((res) => {
        setSliicesCategory(res.data.data.slice(0, 10));
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleCategoryClick = (title) => {
    navigate(`/shop/${encodeURIComponent(title)}`);
  };

  const handleShowAllCategory = () => {
    setShowAllCategory(true);
  };

  const displayedCategories = showAllCategory ? categories : sliceCategory;

  return (
    <section className="mt-10 container">
      <h2 className="text-lg lg:text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {displayedCategories.map((cat) => (
          <Card
            key={cat._id}
            onClick={() => handleCategoryClick(cat.title)}
            className="cursor-pointer text-center hover:shadow-lg transition"
          >
            <CardContent>
              <img
                src={cat.image}
                alt={cat.title}
                className="mx-auto h-full w-full object-cover"
              />
            </CardContent>
            <CardTitle className="text-base">{cat.title}</CardTitle>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        {!loading && !showAllCategory && (
          <Button
            onClick={handleShowAllCategory}
            variant="outline"
            className="w-[300px]"
          >
            Show All
          </Button>
        )}
      </div>
    </section>
  );
};

export default Categories;