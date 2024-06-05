"use client"

import { useState } from 'react';
import Link from 'next/link';
import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const page = () => {

    const [details, setDetails] = useState({
        accountType: "Student",
        email: "",
        firstName:"",
        lastName:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (e) => {
        e.preventDefault();
        setDetails({ ...details, [e.target.name]: e.target.value });
    }


    return (
        <>
            <h3 className=" w-full text-[0.9rem] mt-2 font-medium">Don't Have An Account? <Link href={"/login"} className="text-[#008080]">Sign In</Link></h3>

            <form className='mt-2'>
                <div className=" w-[90%] md:w-[65%] rounded-md h-[2.5rem] flex justify-center items-center text-center border font-medium border-[#008080] bg-[#008080]/10 px-1">
                    <span className={`inline-block w-[50%] rounded-md p-[2px] cursor-pointer ${details.accountType === "Student" ? "bg-[#008080] text-white" : ""}`} onClick={() => { setDetails({ ...details, accountType: "Student" }) }}>Student</span>
                    <span className={`inline-block w-[50%] rounded-md p-[2px] cursor-pointer ${details.accountType === "Instructor" ? "bg-[#008080] text-white" : ""}`} onClick={() => { setDetails({ ...details, accountType: "Instructor" }) }}>Instructor</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    <div className="flex flex-col py-1">
                        <label className="text-[0.8rem] text-[#708090]">First Name*</label>
                        <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                            <span className='text-[#FF7F50] text-[1.5rem]'><MdOutlineMail /></span>
                            <input name="firstName" type="text" value={details.firstName} onChange={handleChange} className="outline-none w-full " />
                        </div>
                    </div>

                    <div className="flex flex-col py-1">
                        <label className="text-[0.8rem] text-[#708090]">Last Name*</label>
                        <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                            <span className='text-[#FF7F50] text-[1.5rem]'><MdOutlineMail /></span>
                            <input name="lastName" type="text" value={details.lastName} onChange={handleChange} className="outline-none w-full" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col py-1">
                    <label className="text-[0.8rem] text-[#708090]">Email Address*</label>
                    <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                        <span className='text-[#FF7F50] text-[1.5rem]'><MdOutlineMail /></span>
                        <input name="email" type="email" value={details.email} onChange={handleChange} className="outline-none w-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col py-1 ">
                        <label className="text-[0.8rem] text-[#708090]">Create Password*</label>
                        <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                            <span className='text-[#FF7F50] text-[1.5rem]'><RiLockPasswordLine /></span>
                            <input name="password" type="password" value={details.password} onChange={handleChange} className="outline-none w-full" />
                        </div>
                        {/* <span className="underline text-[10px] text-[#708090] inline-block w-full float-end">Forgot Password?</span> */}
                    </div>

                    <div className="flex flex-col py-1 ">
                        <label className="text-[0.8rem] text-[#708090]"> Confirm Password*</label>
                        <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                            <span className='text-[#FF7F50] text-[1.5rem]'><RiLockPasswordLine /></span>
                            <input name="confirmPassword" type="password" value={details.confirmPassword} onChange={handleChange} className="outline-none w-full" />
                        </div>
                        {/* <span className="underline text-[10px] text-[#708090] inline-block w-full float-end">Forgot Password?</span> */}
                    </div>

                </div>

                <button type="submit" className="w-full bg-[#008080] mt-5  text-white py-[0.4rem] rounded-md">Sign Up</button>
            </form>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-[#708090]">or sign up with</span>
                <div className="flex gap-2">
                    {/* <Image className="cursor-not-allowed" src={"./images/gmail.svg"} width={20} height={10} />
                    <Image className="cursor-not-allowed" src={"./images/outlook.svg"} width={18} height={10} /> */}
                </div>
            </div>
        </>
    )
}

export default page;
