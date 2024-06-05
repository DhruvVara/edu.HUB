'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from "react-icons/io5";


const links = [{ name: "home", link: "/", class: "hidden xl:block" }, { name: "courses", link: "/courses" }, { name: "About Us", link: "/aboutus", class: "hidden xl:block" }, { name: "contact", link: "/contact" }]


const Header = () => {

    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <nav className='w-full flex justify-between items-center px-[3%] py-3 bg-white '>

            <div className='md:hidden text-[30px]'><IoMenuOutline /> </div>

            <img src='./images/edu_logo.svg' className='h-[38px] md:h-[50px]' />

            <div className=' hidden md:flex border border-[#708090] w-[30%] lg:w-[35%] xl:w-[40%] bg-white rounded-full px-3 py-[1px] h-[40px]'>
                <IoSearchOutline style={{ height: "100%", borderRadius: "50%", color: "#708090" }} />
                <input name='search' value={search} onChange={handleChange} placeholder='search' className='w-full outline-none pl-2' />
            </div>

            <div className='hidden md:flex gap-8 text-[#708090]'>
                {links.map((lnk) => {
                    return (

                        <Link href={lnk.link} key={lnk.name} className={`cursor-pointer capitalize ${lnk.class}`}>{lnk.name}</Link>
                    )
                })}
            </div>

            <div className='text-[#708090] text-[23px] flex items-center  justify-center gap-4'>
                <button className='md:hidden'><IoSearchOutline /></button>
                <Link href={"/cart"}><IoCartOutline style={{ cursor: "pointer" }} /></Link>
                <Link href={"/login"} className='hidden md:block px-[8px] py-[5px] cursor-pointer text-[15px] text-black rounded-sm font-semibold border border-black'>Log in</Link>
                <Link href={"/signup"} className='hidden md:block px-[8px] py-[5px] text-[15px] text-white cursor-pointer rounded-sm font-semibold border bg-black border-black'>Sign Up</Link>
            </div>


        </nav>
    )
}

export default Header;
