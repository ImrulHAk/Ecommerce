import React, { useState } from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userslice";

const Registration = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignup = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8899/auth/signup", {
      name: fullname,
      email,
      password
    }).then((res) => {
      localStorage.setItem("userdata", JSON.stringify(res.data.data))
      dispatch(userLoginInfo(userLoginInfo(res.data.data)))
      toast.success('Registration successfull', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        Bounce
      });
      setTimeout(() => {
        navigate('/otp');
      }, 2000);
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <section className="container flex items-center justify-center min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <form onSubmit={handleSignup} className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          Registration
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please sign up to continue</p>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <MdOutlineDriveFileRenameOutline className="text-gray-500 text-xl" />
          <input
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required=""
          />
        </div>
        <div className="flex items-center w-full mt-3 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width={16}
            height={11}
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required=""
          />
        </div>
        <div className="flex items-center mt-3 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width={13}
            height={17}
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required=""
          />
        </div>
        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Sign Up
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account?{" "}
          <Link className="text-indigo-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Registration;
