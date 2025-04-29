import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { InnerImageZoom } from "react-inner-image-zoom";
import "inner-image-zoom/lib/styles.min.css";
import { TbCurrencyTaka } from "react-icons/tb";

const SingleProduct = ({ }) => {
  let { id } = useParams();
  const [SingleProduct, setSingleProduct] = useState({});
  const [productimage, setProductimage] = useState([]);
  const [selectedImage, setSelectedimage] = useState(0)

  useEffect(() => {
    function getSingleProduct() {
      axios
        .get(`http://localhost:8899/product/singleproduct/${id}`)
        .then((res) => {
          setSingleProduct(res.data.data);
          setProductimage(res.data.data.image);
          console.log(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getSingleProduct();
  }, []);

  const handleSelectedImage=(id)=>{
    setSelectedimage(id)
  }

  return (
    <div>
      <section className="pt-40 pb-30 bg-white dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <InnerImageZoom
                className="w-[350px]"
                src={productimage[selectedImage]}
                zoomSrc={productimage[selectedImage]}
                imgAttributes={{
                  srcSet: productimage[selectedImage],
                }}
                sources={[
                  {
                    srcSet: productimage[selectedImage],
                  },
                ]}
              />
              <div className="flex gap-3 mt-3">
                {productimage.map((imgsrc, index) => (
                  <img
                    onClick={()=>handleSelectedImage(index)}
                    className="w-[80px] h-[80px]"
                    src={imgsrc}
                    alt="image"
                  />
                ))}
              </div>

              {/* <InnerImageZoom
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                zoomSrc="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imgAttributes={{
                  srcSet: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                sources={[
                  {
                    srcSet: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    media: "(min-width: 500px)",
                  },
                ]}
              /> */}
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {SingleProduct.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className=" flex items-center text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  <TbCurrencyTaka /> {SingleProduct.discountprice}
                </p>
                <del className=" flex items-center text-sm font-medium text-gray-500">
                  <TbCurrencyTaka /> {SingleProduct.sellingprice}
                </del>
              </div>
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <Link
                  to="/cart"
                  title=""
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  role="button"
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </Link>
              </div>
              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {SingleProduct.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
