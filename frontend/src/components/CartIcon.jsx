import React from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const CartIcon = () => {
    const data = useSelector((state) => state.authSlice?.value?.data);

    return (
        <>
            {
                data &&
                <Link to='/cart'>
                    <div className='bg-gray-600 fixed right-0 top-2/4 translate-x-[-50%] cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-xl '>
                        <FaCartPlus className='text-white text-2xl' />
                    </div>
                </Link>
            }
        </>
    )
}

export default CartIcon