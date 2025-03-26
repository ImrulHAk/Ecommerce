import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Categories = () => {

  const allCategories = [
    {
      name: "Laptop",
      image:"https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif"
    },
    {
      name: "Mobile",
      image:"https://img.drz.lazcdn.com/static/bd/p/45155316145b8a3c470eec879287505c.jpg_400x400q75.avif"
    },
    {
      name: "AirPods",
      image:"https://img.drz.lazcdn.com/static/bd/p/66566444ed41e0d8ee68e5b84eb15ac6.jpg_400x400q75.avif"
    },
    {
      name: "Perfume",
      image:"https://img.drz.lazcdn.com/static/bd/p/02c59e007d26033ac73c137f8b0bf4a5.jpg_400x400q75.avif"
    },
    {
      name: "Watch",
      image:"https://img.drz.lazcdn.com/static/bd/p/80f4324a5a119b7ece07430e3fe2d3d2.jpg_400x400q75.avif"
    }
  ]

  return (
    <section className="mt-10">
      <div className="container ">
        <h2 className="mb-[10px] lg:mb-[15px] text-lg lg:text-2xl font-bold">Categories</h2>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {allCategories.map((item)=>(

          <Card className=" xl:w-[250px] text-center">
            <CardContent>
              <img
                className="mx-auto"
                src={item.image}
                alt="img"
              />
            </CardContent>
            <CardTitle>{item.name}</CardTitle>
          </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
