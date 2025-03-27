import React from "react";
import Product from "./Product";

const Featuresproduct = () => {
  const featuresproduct = [
    {
      name: "Red Hat",
      href: "#",
      image: "https://bundui-images.netlify.app/products/04.jpeg",
      price: "$28",
      category: "Clothing",
    },
    {
      name: "Red Hat",
      href: "#",
      image: "https://bundui-images.netlify.app/products/04.jpeg",
      price: "$28",
      category: "Clothing",
    },
    {
      name: "Red Hat",
      href: "#",
      image: "https://bundui-images.netlify.app/products/04.jpeg",
      price: "$28",
      category: "Clothing",
    },
    {
      name: "Red Hat",
      href: "#",
      image: "https://bundui-images.netlify.app/products/04.jpeg",
      price: "$28",
      category: "Clothing",
    },
    {
      name: "Red Hat",
      href: "#",
      image: "https://bundui-images.netlify.app/products/04.jpeg",
      price: "$28",
      category: "Clothing",
    },
  ];

  return (
    <section className="mt-10">
      <div className="container">
        <h2 className="mb-[10px] lg:mb-[15px] text-lg lg:text-2xl font-bold">
          Features Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {featuresproduct.map((item) => (
            <Product />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featuresproduct;
