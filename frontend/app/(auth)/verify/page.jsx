"use client"

import OtpInput from '@/components/OtpInput';
import Link from 'next/link';
import React from 'react'

const Page = () => {

    const onOtpSubmit = async(otp)=>{

    }

    return (
        <>
            <h2 className="text-[1.2rem] md:text-[1.5rem] lg:text-[1.7rem] font-bold">Verify Email</h2>
            <div className="flex gap-1 h-[2px] w-full">
                <span className="inline-block w-[40px] h-[1.8px] rounded-xl bg-[#008080]"></span>
                <span className="inline-block w-[10px] h-[1.8px] rounded-xl bg-[#008080]"></span>
            </div>

            <p className="mt-3 text-[#AFB2BF] text-[0.8rem] md:text-[1rem]">A verification code has been sent to your email. Enter the code below.</p>

            <div className="mt-5 flex gap-4 lg:gap-4">
                <OtpInput onOtpSubmit={onOtpSubmit} />
            </div>

            <button onClick={onOtpSubmit} className="w-full bg-[#008080] mt-8  text-white py-[0.4rem] rounded-md">Verify and Register</button>

            <div className="mt-2 flex justify-between text-[14px]">
                <Link href={"/login"} className="text-[#708090]">Back to Login</Link>

                <p className="text-[#008080] ">Resend It</p>
            </div>

        </>
    )
}

export default Page;
