import React, { useEffect, useState } from 'react'
import ProtectedRoute from './Layout/ProtectedRoute'
import axios from 'axios'

const App = () => {
  let baseurl = import.meta.env.VITE_API_BASE_URL
  const [orders, serOrders] = useState([])

  useEffect(() => {
    function getallorders() {
      axios
        .get(`${baseurl}/order/getallorder`)
        .then((res) => {
          serOrders(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getallorders()
  }, [])

  return (
    <div className="lg:w-full">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Orders</h2>
        <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white border-1 border-gray-500/30">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">User Name</th>
                <th className="px-4 py-3 font-semibold truncate">Address</th>
                <th className="px-4 py-3 font-semibold truncate">Phone Number</th>
                <th className="px-4 py-3 font-semibold truncate">Product Image</th>
                <th className="px-4 py-3 font-semibold truncate">Product Title</th>
                <th className="px-4 py-3 font-semibold truncate">Quantity</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Total Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">Payment Method</th>
                <th className="px-4 py-3 font-semibold truncate">Payment Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {orders?.map((item, index) =>
                item.cartlist?.map((cartitem, idx) => (
                  <tr key={`${index}-${idx}`} className="border-t-1 border-gray-500/30">
                    {idx === 0 && (
                      <>
                        <td className="px-4 py-3" rowSpan={item.cartlist.length}>
                          {item.fullname}
                        </td>
                        <td className="px-4 py-3" rowSpan={item.cartlist.length}>
                          {item.address}
                        </td>
                        <td className="px-4 py-3" rowSpan={item.cartlist.length}>
                          {item.phone}
                        </td>
                      </>
                    )}

                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center justify-center space-x-3 truncate border-l-1 border-gray-500/30">
                      <div className="border border-gray-300 rounded p-2">
                        <img
                          src={
                            Array.isArray(cartitem.productid.image)
                              ? cartitem.productid.image[0]
                              : cartitem.productid.image
                          }
                          alt="Product"
                          className="w-10"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 ">{cartitem.productid.title}</td>
                    <td className="px-4 py-3 text-center border-r-1 border-gray-500/30">{cartitem.quantity}</td>

                    {idx === 0 && (
                      <>
                        <td className="px-4 py-3 text-center" rowSpan={item.cartlist.length}>
                          {item.totalPrice} Tk
                        </td>
                        <td className="px-4 py-3 text-center" rowSpan={item.cartlist.length}>
                          {item.paymentMethod}
                        </td>
                        <td className="px-4 py-3 text-center" rowSpan={item.cartlist.length}>
                          {item.paymentstatus}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
