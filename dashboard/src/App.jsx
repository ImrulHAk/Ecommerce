import React, { useEffect, useState } from 'react'
import ProtectedRoute from './Layout/ProtectedRoute'
import axios from 'axios'

const App = () => {
  let baseurl = import.meta.env.VITE_API_BASE_URL
  const [orders, serOrders] = useState([])
  const [productInfo, setProductInfo] = useState([])

  useEffect(() => {
    function getallorders() {
      axios.get(`${baseurl}/order/getallorder`).then((res) => {
        serOrders(res.data.data)
        setProductInfo(res.data.data.cartlist)
      }).catch((err) => {
        console.log(err)
      })
    }
    getallorders()
  }, [])

  console.log(orders)
  return (
    <div className="lg:w-full">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Orders</h2>
        <div className="flex flex-col items-center w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">User Name</th>
                <th className="px-4 py-3 font-semibold truncate">Address</th>
                <th className="px-4 py-3 font-semibold truncate">Phone Number</th>
                <th className="px-4 py-3 font-semibold truncate">Product Image</th>
                <th className="px-4 py-3 font-semibold truncate">Product Title</th>
                <th className="px-4 py-3 font-semibold truncate">Product Color</th>
                <th className="px-4 py-3 font-semibold truncate">Quantity</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Total Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">Payment Status</th>
                <th className="px-4 py-3 font-semibold truncate">Payment Method</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {orders?.map((item, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="px-4 py-3">{item.fullname}</td>
                  <td className="px-4 py-3">{item.address}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  {item?.cartlist?.map((cartitem) => (
                    <>
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <div className="border border-gray-300 rounded p-2">
                          <img
                            src={
                              Array.isArray(cartitem.productid.image)
                                ? cartitem.productid.image[0]
                                : cartitem.productid.image
                            }
                            alt="Product"
                            className="w-16"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span>{`${cartitem.productid.title}`}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span>{`${cartitem.productid.color}`}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span>{`${cartitem.quantity}`}</span>
                      </td>
                    </>
                  ))}
                  <td className="px-4 py-3 max-sm:hidden">
                    {item.totalPrice} Tk
                  </td>
                  <td className="px-4 py-3">{item.paymentstatus}</td>
                  <td className="px-4 py-3">{item.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
