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
  return (
    <section className="mt-10 mb-30">
      <div className="container ">
        <h2 className="mb-[15px] text-2xl font-bold">Categories</h2>
        <div className=" grid grid-cols-5">
          <Card className=" w-[250px] text-center">
            <CardContent>
              <img
                className="mx-auto"
                src="https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif"
                alt="img"
              />
            </CardContent>
            <CardTitle>Laptop</CardTitle>
          </Card>
          <Card className=" w-[250px] text-center">
            <CardContent>
              <img
                className="mx-auto"
                src="https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif"
                alt="img"
              />
            </CardContent>
            <CardTitle>Laptop</CardTitle>
          </Card>
          <Card className=" w-[250px] text-center">
            <CardContent>
              <img
                className="mx-auto"
                src="https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif"
                alt="img"
              />
            </CardContent>
            <CardTitle>Laptop</CardTitle>
          </Card>
          <Card className=" w-[250px] text-center">
            <CardContent>
              <img
                className="mx-auto"
                src="https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif"
                alt="img"
              />
            </CardContent>
            <CardTitle>Laptop</CardTitle>
          </Card>
          <Card className=" w-[250px] text-center">
            <CardContent>
              <img
                className="mx-auto"
                src="https://img.drz.lazcdn.com/static/bd/p/2e90b92217a7516a05891405f0a4d0ed.png_400x400q75.avif"
                alt="img"
              />
            </CardContent>
            <CardTitle>Laptop</CardTitle>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Categories;
