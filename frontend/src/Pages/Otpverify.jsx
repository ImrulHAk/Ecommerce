import React, { useState } from 'react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from 'axios'


const Otpverify = () => {
    const data = useSelector((state) => state.authSlice.value?.payload);
    const [otp, setOtp] = useState(null)
    const navigate = useNavigate()
    const baseurl = import.meta.env.VITE_BASE_URL

    const handleOtpsubmit = () => {
        if (!data || !data.email) {
            console.error("Email is missing in Redux state");
            return;
        }

        axios.post(`${baseurl}/auth/verifyotp`, {
            email: data.email,
            otp: otp,
        }).then((res) => {
            navigate('/login');
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className='container flex h-screen items-center justify-center'>
            <div className="flex flex-col items-center md:max-w-[425px] w-[400px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
                <p className="mt-2 text-sm text-gray-900/90 text-center">
                    Enter the 6-digit code sent to your email ID.
                </p>
                <div className='text-gray-500 mt-6'>
                    
                    {/* <input onChange={((e) => setOtp(e.target.value))} className='border mt-1 mb-2 border-gray-500 outline-none rounded py-2.5 px-3' type="text" /> */}

                    <InputOTP onChange={(value) => setOtp(value)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                        <InputOTPGroup className='flex gap-2'>
                            {[...Array(6)].map((_, i) => (
                                <InputOTPSlot key={i} className="border border-gray-500 text-md" index={i} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <button
                    type="button"
                    onClick={handleOtpsubmit}
                    className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity"
                >
                    Verify Email
                </button>
            </div>

        </div>
    )
}

export default Otpverify