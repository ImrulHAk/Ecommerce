import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";

const product = {
  name: "Red Hat",
  href: "#",
  image: "https://bundui-images.netlify.app/products/04.jpeg",
  price: "$28",
  category: "Clothing",
};

export default function Product({ productinfo }) {
  return (
    <div className="group relative space-y-4 shadow-md dark:shadow-gray-700 rounded-md p-2">
      <figure className="group-hover:opacity-90">
        <img
          className="w-full rounded-lg aspect-square"
          src={productinfo.thumbnail}
          alt={productinfo.title}
        />
      </figure>
      <div className=" justify-between">
        <div>
          <h3 className="text-sm lg:text-lg">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {productinfo.title}
            </a>
          </h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <p className="text-sm lg:text-lg font-semibold">${productinfo.price}</p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="w-full">
          <PlusIcon className="size-4 me-1" /> Add to Card
        </Button>
      </div>
    </div>
  );
}
