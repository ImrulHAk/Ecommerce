import React from "react";

// const SingleProduct = () => {
//   return (
//     <div>
//       <section className="pt-30 pb-20 bg-white dark:bg-gray-900 antialiased">
//         <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
//           <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
//             <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
//               <img
//                 className="w-full dark:hidden"
//                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
//                 alt=""
//               />
//               <img
//                 className="w-full hidden dark:block"
//                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
//                 alt=""
//               />
//             </div>
//             <div className="mt-6 sm:mt-8 lg:mt-0">
//               <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
//                 Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB
//                 SSD, Mac OS, Pink
//               </h1>
//               <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
//                 <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
//                   $1,249.99
//                 </p>
//                 <div className="flex items-center gap-2 mt-2 sm:mt-0">
//                   <div className="flex items-center gap-1">
//                     <svg
//                       className="w-4 h-4 text-yellow-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={24}
//                       height={24}
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-yellow-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={24}
//                       height={24}
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-yellow-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={24}
//                       height={24}
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-yellow-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={24}
//                       height={24}
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                     <svg
//                       className="w-4 h-4 text-yellow-300"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={24}
//                       height={24}
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
//                     </svg>
//                   </div>
//                   <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
//                     (5.0)
//                   </p>
//                   <a
//                     href="#"
//                     className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
//                   >
//                     345 Reviews
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
//                 <a
//                   href="#"
//                   title=""
//                   className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                   role="button"
//                 >
//                   <svg
//                     className="w-5 h-5 -ms-2 me-2"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={24}
//                     height={24}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
//                     />
//                   </svg>
//                   Add to favorites
//                 </a>
//                 <a
//                   href="#"
//                   title=""
//                   className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
//                   role="button"
//                 >
//                   <svg
//                     className="w-5 h-5 -ms-2 me-2"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width={24}
//                     height={24}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
//                     />
//                   </svg>
//                   Add to cart
//                 </a>
//               </div>
//               <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
//               <p className="mb-6 text-gray-500 dark:text-gray-400">
//                 Studio quality three mic array for crystal clear calls and voice
//                 recordings. Six-speaker sound system for a remarkably robust and
//                 high-quality audio experience. Up to 256GB of ultrafast SSD
//                 storage.
//               </p>
//               <p className="text-gray-500 dark:text-gray-400">
//                 Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
//                 Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse
//                 with Magic Keyboard or Magic Keyboard with Touch ID.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

const SingleProduct = () => {
  const product = {
    name: "Casual Shoes",
    category: "Sports",
    price: 100,
    offerPrice: 80,
    rating: 4,
    images: [
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
    ],
    description: [
      "High-quality material",
      "Comfortable for everyday use",
      "Available in different sizes",
    ],
  };

  const [thumbnail, setThumbnail] = React.useState(product.images[0]);

  return (
    product && (
      <div className="pt-30">
        <section className="container">
          <div className="max-w-6xl w-full px-6">
            <p>
              <span>Home</span> /<span> Products</span> /
              <span> {product.category}</span> /
              <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
              <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setThumbnail(image)}
                      className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>

                <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                  <img src={thumbnail} alt="Selected product" />
                </div>
              </div>

              <div className="text-sm w-full md:w-1/2">
                <h1 className="text-3xl font-medium">{product.name}</h1>

                <div className="flex items-center gap-0.5 mt-1">
                  {Array(5)
                    .fill("")
                    .map((_, i) =>
                      product.rating > i ? (
                        <svg
                          key={i}
                          width="14"
                          height="13"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                            fill="#615fff"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="13"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                            fill="#615fff"
                            fill-opacity="0.35"
                          />
                        </svg>
                      )
                    )}
                  <p className="text-base ml-2">({product.rating})</p>
                </div>

                <div className="mt-6">
                  <p className="text-gray-500/70 line-through">
                    MRP: ${product.price}
                  </p>
                  <p className="text-2xl font-medium">
                    MRP: ${product.offerPrice}
                  </p>
                  <span className="text-gray-500/70">
                    (inclusive of all taxes)
                  </span>
                </div>

                <p className="text-base font-medium mt-6">About Product</p>
                <ul className="list-disc ml-4 text-gray-500/70">
                  {product.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>

                <div className="flex items-center mt-10 gap-4 text-base">
                  <button className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                    Add to Cart
                  </button>
                  <button className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default SingleProduct;
