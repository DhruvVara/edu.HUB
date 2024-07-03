"use client"

import React, { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BiHide, BiShow } from "react-icons/bi";

const Page = () => {

    const [details, setDetails] = useState({
        password: "",
        confirmPassword: ""
    })

    const [passwordHide, setPasswordHide] = useState(true)

    const handlePassToggle = () => {

    }

    const handleChange = () => {


    }

    return (
        <>
            <h2 className="text-[1.7rem] font-bold">Choose New Password</h2>

            <div className="flex gap-1 h-[2px] mt-[3px] w-full">
                <span className="inline-block w-[40px] h-[1.8px] rounded-xl bg-[#FF7F50]"></span>
                <span className="inline-block w-[10px] h-[1.8px] rounded-xl bg-[#FF7F50]"></span>
            </div>
            <h3 className=" w-full text-[0.9rem] mt-2 font-medium text-[#a19f9f]">Almost done. Enter your new password and you are all set.</h3>

            <form className='mt-[2%] flex flex-col gap-2'>
                <div className="flex flex-col py-1 ">
                    <label className="text-[0.8rem] text-[#708090]">Create Password*</label>
                    <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                        <span className='text-[#FF7F50] text-[1.3rem]'><RiLockPasswordLine /></span>
                        <input name="password" type="password" value={details.password} onChange={handleChange} className="outline-none w-full" />
                        <span className='text-[grey] text-[1.3rem] pr-2 cursor-pointer' name="password" onClick={handlePassToggle}>{passwordHide ? <BiHide /> : <BiShow />}</span>
                    </div>
                </div>

                <div className="flex flex-col py-1 ">
                    <label className="text-[0.8rem] text-[#708090]"> Confirm Password*</label>
                    <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                        <span className='text-[#FF7F50] text-[1.3rem]'><RiLockPasswordLine /></span>
                        <input name="confirmPassword" type="password" value={details.confirmPassword} onChange={handleChange} className="outline-none w-full" />
                        <span className='text-[grey] text-[1.3rem] pr-2 cursor-pointer' name="confirmPassword" onClick={handlePassToggle}>{passwordHide ? <BiHide /> : <BiShow />}</span>
                    </div>
                </div>
                <button  className="w-full bg-[#008080] mt-3 text-white py-[0.4rem] rounded-md">Reset Password</button>
            </form>
        </>
    )
}

export default Page;
