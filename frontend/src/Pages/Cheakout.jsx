import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TbCurrencyTaka } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Cheakout = () => {
  const data = useSelector((state) => state.authSlice?.value?.data);
  const [cartlist, setCartList] = useState([]);
  const [divisionlist, setDivisionlist] = useState([])
  const [selectdivision, setSelectdivision] = useState("")
  const [deliverycharge, setDeliverycharge] = useState('')
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_BASE_URL


  useEffect(() => {
    if (!data) {
      navigate('/login')
      return;
    }

    function getCartlist() {
      axios
        .get(`${baseurl}/cart/usercartlist/${data._id}`)
        .then((res) => {
          setCartList(res.data.data)
        }).catch((err) => {
          toast.error(err);
          console.log(err)
        })
    }
    getCartlist();
  }, [cartlist]);

  useEffect(() => {
    function getdivision() {
      axios.get("https://bdapi.vercel.app/api/v.1/division").then((res) => {
        setDivisionlist(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getdivision();
  }, []);

  const handledivision = (value) => {
    setSelectdivision(value)
    if (value == 6) {
      setDeliverycharge(60)
    } else {
      setDeliverycharge(120)
    }
  }

  const discountprice = cartlist.reduce(function (total, item) {
    return total + Math.round(item.productid.discountprice * item.quantity)
  }, 0)
  const tax = discountprice >= 20000 ? <p>5%</p> : <p>0%</p>;
  const taxAmount = discountprice >= 20000 ? discountprice * 0.05 : 0;
  return (
    <section className=" container">
      <div className="bg-white dark:bg-[#0A0A0A] pb-20 pt-40">
        <div className="md:max-w-5xl max-w-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-md:order-1">
              <h2 className="text-3xl font-bold dark:text-white text-slate-900">
                Make a payment
              </h2>
              <p className="text-slate-900 dark:text-white text-sm mt-4">
                Complete your transaction swiftly and securely with our
                easy-to-use payment process.
              </p>
              <form className="mt-12 max-w-lg">
                <div className="grid gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="px-4 py-3.5 bg-gray-100 dark:bg-gray-900 dark:text-white text-slate-900  w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent dark:focus:bg-gray-800 outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 mt-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      className="px-4 py-3.5 bg-gray-100 dark:bg-gray-900 dark:text-white text-slate-900 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent dark:focus:bg-gray-800 outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 mt-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Phone Number"
                      className="px-4 py-3.5 bg-gray-100 dark:bg-gray-900 dark:text-white text-slate-900 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent dark:focus:bg-gray-800 outline-none"
                    />
                  </div>
                  <div className="grid gap-4">
                    <Select onValueChange={handledivision} value={selectdivision}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisionlist.map((type) => (
                          <SelectItem key={type.name} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {
                  deliverycharge ? (
                    <div className="flex items-center gap-5">
                      <button
                        type="button"
                        className="mt-8 w-40 py-3 text-[15px] font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide cursor-pointer"
                      >
                        Cash on Delivery
                      </button>
                      <button
                        type="button"
                        className="mt-8 w-40 py-3 text-[15px] font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide cursor-pointer"
                      >
                        Online Payment
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-5">
                      <button
                        disabled
                        type="button"
                        className="mt-8 w-40 py-3 text-[15px] font-medium bg-gray-400 text-white rounded-md tracking-wide cursor-not-allowed"
                      >
                        Cash on Delivery
                      </button>
                      <button
                        disabled
                        type="button"
                        className="mt-8 w-40 py-3 text-[15px] font-medium bg-gray-400 text-white rounded-md tracking-wide cursor-not-allowed"
                      >
                        Online Payment
                      </button>
                    </div>
                  )
                }
                <p className="text-red-500  text-sm mt-4">
                  Cash on delivery is applicable for a minimum of 2000 Taka
                </p>
              </form>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-md">
              <h2 className="text-3xl font-bold dark:text-white text-slate-900">Price List</h2>
              <ul className="text-slate-900 dark:text-white font-medium mt-12 space-y-4">
                {cartlist.map((item) => (
                  <li className="flex flex-wrap gap-4 text-sm">
                    {item.productid.title.slice(0, 10)} ... X {item.quantity}
                    <span className="flex items-center justify-center ml-auto font-medium"><TbCurrencyTaka className="text-lg" />{item.productid.discountprice * item.quantity}</span>
                  </li>
                ))}
                <li className="flex flex-wrap gap-4 text-sm border-t-2 border-gray-500 pt-2 mt-6">
                  Tax <span className="ml-auto font-medium">{tax}</span>
                </li>
                {deliverycharge &&
                  <li className="flex flex-wrap gap-4 text-sm">
                    Delivery Charge <span className="flex items-center justify-center ml-auto font-medium"><TbCurrencyTaka className="text-lg" />{deliverycharge}</span>
                  </li>
                }
                <li className="flex flex-wrap gap-4 text-sm font-semibold border-t-2 border-gray-500 pt-2 mt-10">
                  Total <span className="flex items-center justify-center ml-auto"><TbCurrencyTaka className="text-lg" />{discountprice + taxAmount + deliverycharge}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cheakout;
