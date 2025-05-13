import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const CartIcon = () => {
    const data = useSelector((state) => state.authSlice?.value?.data);
    const [cartlist, setCartList] = useState([])

    useEffect(() => {
        const baseurl = import.meta.env.VITE_BASE_URL
        function getCartlist() {
            axios
                .get(`${baseurl}/cart/usercartlist/${data?._id}`)
                .then((res) => {
                    setCartList(res.data.data)
                }).catch((err) => {
                    toast.error(err);
                    console.log(err)
                })
        }
        getCartlist();
    }, [])

    return (
        <>
            {
                data &&
                <Link to='/cart'>
                    <div className='bg-gray-600 fixed right-0 top-2/4 translate-x-[-50%] cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-xl '>
                        <FaCartPlus className='text-white text-2xl' />
                        {
                            cartlist.length > 0 &&
                            <h2 className='flex justify-center items-center absolute top-[-8px] right-[-8px] text-md text-white bg-red-500 rounded-full w-[25px] h-[25px] '>{cartlist.length}{""}</h2>
                        }
                    </div>
                </Link>
            }
        </>
    )
}

export default CartIcon