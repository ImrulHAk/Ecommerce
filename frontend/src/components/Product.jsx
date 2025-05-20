import axios from "axios";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { TbCurrencyTaka } from "react-icons/tb";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function Product({ productinfo }) {
  let { id } = useParams();
  const data = useSelector((state) => state.authSlice.value);
  const navigate = useNavigate()

  const handleAddtocart = (id) => {
    if (data && data.data) {
      const baseurl = import.meta.env.VITE_BASE_URL
      axios.post(`${baseurl}/cart/addtocart`, {
        productid: id,
        // quantity,
        userid: data.data._id,
      },
        {
          headers: {
            token: data.token
          }
        }).then((res) => {
          toast.success('Product add to cart');
        }).catch((err) => {
          toast.error('Add to cart failed');
          console.log(err)
        })
    } else {
      navigate("/login")
    }
  }
  return (
    <div className="group relative space-y-4 shadow-md dark:shadow-gray-700 rounded-md p-2">
      <Toaster />
      <Link>
        <figure className="group-hover:opacity-90">
          <img
            className="w-full rounded-lg aspect-square"
            src={productinfo && productinfo.image[0]}
            alt={productinfo && productinfo.title}
          />
        </figure>
      </Link>
      <div className=" mt-3 flex lg:flex-row flex-col justify-between gap-y-1.5">
        <div>
          <h3 className="text-sm lg:text-lg">
            <Link to={`/singleproduct/${productinfo && productinfo._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {productinfo && productinfo.title.slice(0, 15)}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {productinfo && productinfo.category.title}
          </p>
          <div className=" mt-1 flex items-center gap-3">
            <p className="flex items-center text-md lg:text-lg font-semibold">
              <TbCurrencyTaka /> {productinfo && productinfo.discountprice}
            </p>
            <del className=" flex items-center text-sm text-gray-500 font-medium ">
              <TbCurrencyTaka /> {productinfo && productinfo.sellingprice}
            </del>
          </div>
        </div>
      </div>
      <div onClick={() => handleAddtocart(productinfo._id)} className="flex gap-4">
        <Button variant="outline" className="w-full !z-50 cursor-pointer">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </div>
    </div>
  );
}
