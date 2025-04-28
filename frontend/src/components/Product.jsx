import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";
 

const product = {
  name: "Red Hat",
  image: "https://bundui-images.netlify.app/products/04.jpeg",
  price: "$28",
  category: "Clothing",
};

export default function Product({ productinfo }) {
  return (
    <div className="group relative space-y-4 shadow-md dark:shadow-gray-700 rounded-md p-2">
      <Link>
        <figure className="group-hover:opacity-90">
          <img
            className="w-full rounded-lg aspect-square"
            src={productinfo ? productinfo.image[0] : product.image}
            alt={productinfo ? productinfo.title : product.name}
          />
        </figure>
      </Link>
      <div className=" flex lg:flex-row flex-col justify-between gap-y-1.5">
        <div>
          <h3 className="text-sm lg:text-lg">
            <Link to={`/singleproduct/${productinfo && productinfo._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {productinfo ? productinfo.title.slice(0, 15) : product.name}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className=" flex items-center gap-3">
          <p className="text-md lg:text-lg font-semibold">
            <TbCurrencyTaka /> {productinfo ? productinfo.discountprice : product.discountprice}
          </p>
          <del className="text-sm text-gray-500 font-medium ">
            <TbCurrencyTaka /> {productinfo ? productinfo.sellingprice : product.sellingprice}
          </del>
        </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </div>
    </div>
  );
}
