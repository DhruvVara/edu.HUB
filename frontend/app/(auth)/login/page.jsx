'use client'

import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const page = () => {
    const router = useRouter();

    const [details, setDetails] = useState({
        accountType: "Student",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { accountType, email, password } = details;
        if (!email | !password) {
            alert("All fields are mandatory");
            return;
        }

        const response = await axios.post("http://localhost:5000/api/auth/login", {
            accountType, email, password
        }, {
            headers: {
                "content-type": "application/json"
            }
        })

        const { message, success, token } = response.data;
        if (!success) {
            alert(message);
            return;
        }

        sessionStorage.setItem("token", token);
        router.push("/");
        setDetails({ accountType: "", email: "", password: "" });
    }

    return (
        <>
            {/* <img src='./images/edu_logo.svg' className='h-[4rem]' />
            <h2 className="text-[1.7rem] font-bold">Welcome Back</h2>

            <div className="flex gap-1 h-[2px] mt-[3px] w-full">
                <span className="inline-block w-[40px] h-[1.8px] rounded-xl bg-[#FF7F50]"></span>
                <span className="inline-block w-[10px] h-[1.8px] rounded-xl bg-[#FF7F50]"></span>
            </div> */}

            <h3 className=" w-full text-[0.9rem] mt-2 font-medium">Don't Have An Account? <Link href={"/signup"} className="text-[#008080]">Sign Up</Link></h3>


            <form onSubmit={handleSubmit} className="mt-2">
                <div className=" w-[65%] rounded-md h-[2.5rem] flex justify-center items-center text-center border font-medium border-[#008080] bg-[#008080]/10 px-1">
                    <span className={`inline-block w-[50%] rounded-md p-[2px] cursor-pointer ${details.accountType === "Student" ? "bg-[#008080] text-white" : ""}`} onClick={() => { setDetails({ ...details, accountType: "Student" }) }}>Student</span>
                    <span className={`inline-block w-[50%] rounded-md p-[2px] cursor-pointer ${details.accountType === "Instructor" ? "bg-[#008080] text-white" : ""}`} onClick={() => { setDetails({ ...details, accountType: "Instructor" }) }}>Instructor</span>
                </div>
                <div className="flex flex-col py-1 mt-2">
                    <label className="text-[0.8rem] text-[#708090]">Email Address*</label>
                    <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">
                        <span className='text-[#FF7F50] text-[1.5rem]'><MdOutlineMail /></span>
                        <input name="email" type="email" value={details.email} onChange={handleChange} className="outline-none w-full" />
                    </div>
                </div>

                <div className="flex flex-col py-1 ">
                    <label className="text-[0.8rem] text-[#708090]">Password*</label>
                    <div className="w-full flex gap-3 mt-2 bg-[#FFFFFF] rounded-md py-[7px] pl-2">

                        <span className='text-[#FF7F50] text-[1.5rem]'><RiLockPasswordLine /></span>

                        <input name="password" type="password" value={details.password} onChange={handleChange} className="outline-none w-full" />
                    </div>
                    <span className="underline text-[10px] text-[#708090] inline-block w-full float-end">Forgot Password?</span>
                </div>

                <button type="submit" className="w-full bg-[#008080] mt-5  text-white py-[0.4rem] rounded-md">Login</button>
            </form>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-[#708090]">or sign in with</span>
                <div className="flex gap-2">
                    {/* <Image className="cursor-not-allowed" src={"./images/gmail.svg"} width={20} height={10} /> */}
                    {/* <Image className="cursor-not-allowed" src={"./images/outlook.svg"} width={18} height={10} /> */}
                </div>
            </div>
        </>
    )
}

export default page;
