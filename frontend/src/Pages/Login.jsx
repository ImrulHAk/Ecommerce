import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userslice";
import { toast, ToastContainer, Bounce } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseurl = import.meta.env.VITE_BASE_URL

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post(`${baseurl}/auth/login`, {
      email,
      password
    })
      .then((res) => {
        localStorage.setItem("userdata", JSON.stringify(res.data));
        dispatch(userLoginInfo(res.data));
        toast.success("Login successful", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Invalid Login info", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce
        });
        console.error(err);
      });
  };

  return (
    <section className="container flex items-center justify-center min-h-screen">
      <ToastContainer />
      <form onSubmit={handleLogin} className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-center mt-3 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="mt-5 text-left text-indigo-500">
          <a className="text-sm" href="#">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Login
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account?{" "}
          <Link className="text-indigo-500" to="/registration">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
