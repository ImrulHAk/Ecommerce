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
            src={productinfo ? productinfo.thumbnail : product.image}
            alt={productinfo ? productinfo.title : product.name}
          />
        </figure>
      </Link>
      <div className=" flex lg:flex-row flex-col justify-between gap-y-1.5">
        <div>
          <h3 className="text-sm lg:text-lg">
            <Link to={`/singleproduct/${productinfo && productinfo.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {productinfo ? productinfo.title.slice(0, 15) : product.name}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <p className="text-sm lg:text-lg font-semibold">
          ${productinfo ? productinfo.price : product.price}
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </div>
    </div>
  );
}
